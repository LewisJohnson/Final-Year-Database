<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Flash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Stevebauman\Purify\Facades\Purify;
use SussexProjects\Http\Requests\ProjectForm;
use SussexProjects\Mail\SupervisorEditedProposedProject;
use SussexProjects\Mode;
use SussexProjects\Project;
use SussexProjects\ProjectTopic;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\Topic;
use SussexProjects\Transaction;
use SussexProjects\User;

/**
 * The project controller.
 * Handles all functions related to projects.
 */
class ProjectController extends Controller
{

	/**
	 * The HTML purifier configuration used for the project description.
	 *
	 * @var string[] ~HTML purifier configuration
	 * @see http://htmlpurifier.org/live/configdoc/plain.html HTML purifier configuration documentation.
	 * @see https://github.com/ezyang/htmlpurifier The Laravel implementation of HTML purifier.
	 */
	public $htmlPurifyConfig;

	public function __construct()
	{
		parent::__construct();
		$this->paginationCount = 50;

		$purifier = Purify::getPurifier();
		$config = $purifier->config;

		$config->set('Core.RemoveProcessingInstructions', true);
		$config->set('Attr.ID.HTML5', true);
		$config->set('AutoFormat.Linkify', true);
		$config->set('HTML.TargetBlank', true);
		$config->set('HTML.SafeObject', true);
		$config->set('HTML.SafeScripting', '');
		$config->set('HTML.ForbiddenElements', 'h1,h2,h3,h4,h5,h6,script,html,body');
		$config->set('Output.FlashCompat', true);
		$config->set('Cache.SerializerPath', base_path('storage/framework/cache'));

		$htmlPurifyConfig = $config;
	}

	/**
	 * Display a listing of the resource.
	 * SELECT CONDITIONS
	 * - Select if supervisor take_students is true
	 * - Select if is on-offer
	 * - Select if NOT archived
	 * - select if NOT student proposed
	 *
	 *
	 * @param  Request                 $request
	 * @return \Illuminate\View\View
	 */
	public function index(Request $request)
	{
		$supervisorTable = new Supervisor();
		$userTable = new User();
		$projectTable = new Project();

		$sortCol = "view_count";
		$sortDir = "asc";

		if (!empty($request->sortCol) && in_array($request->sortCol, $projectTable->sortable))
		{
			$sortCol = $request->sortCol;
		}

		if (!empty($request->sortDir) && ($sortDir == "asc" || $sortDir == "desc"))
		{
			$sortDir = $request->sortDir;
		}

		$projects =
		Project::whereNotNull('supervisor_id')
			->join($supervisorTable->getTable() . ' as supervisor', 'supervisor_id', '=', 'supervisor.id')
			->join($userTable->getTable() . ' as user', 'user.id', '=', 'supervisor.id')
			->when((Auth::check() && !Auth::user()->isSupervisor()) || ldap_guest(), function ($query)
		{
				return $query->where('status', 'on-offer');
			})
			->where('user.privileges', 'LIKE', '%supervisor%')
			->where('supervisor.take_students_' . get_el_short_name(), true)
			->select($projectTable->getTable() . '.*', 'supervisor.take_students_' . get_el_short_name())
			->orderBy($sortCol, $sortDir)
			->paginate($this->paginationCount);

		return view('projects.index')
			->with('projects', $projects)
			->with('view', 'index');
	}

	/**
	 * Displays the specified project.
	 *
	 *
	 * @param  Project                 $project
	 * @return \Illuminate\View\View
	 */
	public function show(Project $project)
	{

		//Updates project view count
		if (Auth::check())
		{
			if (Auth::user()->isStudent())
			{
				DB::transaction(function () use ($project)
				{
					// We don't want to update the updated_at timestamp.
					$project->timestamps = false;
					$project->view_count = ++$project->view_count;
					$project->save();

					// Re-enabled timestamps
					$project->timestamps = true;
				});
			}
		}

		$view = "SupervisorProject";

		if ($project->status === "student-proposed")
		{
			$view = "StudentProject";
		}

		if (request()->query("preview") == true)
		{
			return view('projects.partials.project-preview')
				->with('project', $project)
				->with('view', $view);
		}

		return view('projects.project')
			->with('project', $project)
			->with('view', $view);
	}

	/**
	 * Adds a topic to a project.
	 *
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return string                   The newly added topic's name
	 */
	public function addTopic(Request $request)
	{
		$result = DB::transaction(function () use ($request)
		{
			$topic = Topic::where('name', $request->topic_name)->first();
			$project = Project::findOrFail($request->project_id);

			// If topic isn't in the relevant topic database, create a new one.
			if ($topic == null)
			{
				if (strlen($request->topic_name) < 2)
				{
					return response()->json(array(
						'successful' => false,
						'message'    => 'Topic name must be longer than 1 character.',
					));
				}

				$topic = new Topic();
				$topic->name = $request->topic_name;
				$topic->save();

				$transaction = new Transaction();
				$transaction->fill(array(
					'type'             => 'topic',
					'action'           => 'created',
					'topic'            => $topic->name,
					'supervisor'       => Auth::user()->id,
					'transaction_date' => new Carbon(),
				));

				$transaction->save();
			}

			// Validate data
			$projectTopic = new ProjectTopic();

			// The project has no other topics, so make it's first topic the primary topic
			$projectTopic->primary = count($project->topics) == 0;
			$projectTopic->topic_id = $topic->id;
			$projectTopic->project_id = $project->id;

			try {
				$projectTopic->save();
			}
			catch (QueryException $e)
			{
				return response()->json(array(
					'successful' => false,
					'message'    => 'Topic "' . $request->topic_name . '" already belongs to the project.',
				));
			}

			return response()->json(array(
				'successful' => true,
				'topic'      => Topic::findOrFail($topic->id),
			));
		});

		return $result;
	}

	/**
	 * Removes a topic to a project.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function removeTopic(Request $request)
	{
		DB::transaction(function () use ($request)
		{
			$topic = Topic::findOrFail($request->topic_id);
			$project = Project::findOrFail($request->project_id);

			ProjectTopic::where('project_id', $project->id)
				->where('topic_id', $topic->id)
				->delete();
		});

		return response()->json(array('successful' => true));
	}

	/**
	 * Updates a projects primary topic
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request Contains new primary project ID
	 * @return \Illuminate\Http\Response
	 */
	public function updatePrimaryTopic(Request $request)
	{
		DB::transaction(function () use ($request)
		{
			$topic = Topic::findOrFail($request->topic_id);
			$project = Project::findOrFail($request->project_id);

			// Clear primary
			ProjectTopic::where('project_id', $project->id)
				->update(['primary' => 0]);

			// Set new primary project
			ProjectTopic::where('project_id', $project->id)
				->where('topic_id', $topic->id)
				->update(['primary' => 1]);
		});

		return response()->json(array('successful' => true));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\View\View
	 */
	public function create()
	{
		return view('projects.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 *
	 * @param  ProjectForm                 $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(ProjectForm $request)
	{
		// Not included in ProjectForm because of update
		$this->validate(request(), [
			'status' => 'required',
		]);

		if($request->skills == 'Temporary' || $request->skills == 'Temp')
		{
			session()->flash('message', 'Your project contains forbidden characteristics.');
			session()->flash('message_type', 'danger');

			return redirect()->action('ProjectController@create');
		}

		$result = DB::transaction(function () use ($request)
		{
			$project = new Project();
			$transaction = new Transaction();
			$cleanHtml = Purify::clean($request->description, $this->htmlPurifyConfig);

			$project->fill(array(
				'title'       => $request->title,
				'description' => $cleanHtml,
				'status'      => $request->status,
				'skills'      => $request->skills,
			));

			$project->supervisor_id = Auth::user()->supervisor->id;
			$project->save();

			if (!empty($request->topics))
			{
				foreach ($request->topics as $createTopicName)
				{
					$topic = Topic::where('name', $createTopicName)->first();

					// If topic isn't in the relevant topic database, create a new one.
					if ($topic == null)
					{
						$topic = new Topic();
						$topic->name = $createTopicName;
						$topic->save();

						$topicTransaction = new Transaction();

						$topicTransaction->fill(array(
							'type'             => 'topic',
							'action'           => 'created',
							'topic'            => $topic->name,
							'admin'            => Auth::user()->id,
							'transaction_date' => new Carbon(),
						));

						$topicTransaction->save();
					}

					// Validate data
					$projectTopic = new ProjectTopic();

					// the project has no other topics, so make it's first topic the primary topic
					$projectTopic->primary = count($project->topics) == 0;
					$projectTopic->topic_id = $topic->id;
					$projectTopic->project_id = $project->id;

					$projectTopic->save();
				}
			}

			$transaction->fill(array(
				'type'             => 'project',
				'action'           => 'created',
				'project'          => $project->id,
				'supervisor'       => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();

			// Redirect
			session()->flash('message', '"' . $project->title . '" has been created.');
			session()->flash('message_type', 'success');

			return redirect()->action('ProjectController@show', $project);
		});

		return $result;
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 *
	 * @param  Project                                                    $project
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function edit(Project $project)
	{
		if ($project->isOwnedByUser() || $project->isUserSupervisorOfProject())
		{
			return view('projects.edit')
				->with('project', $project);
		}

		return redirect()->action('ProjectController@show', $project);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 *
	 * @param  ProjectForm                 $input
	 * @param  Project                     $project
	 * @return \Illuminate\Http\Response
	 */
	public function update(ProjectForm $input, Project $project)
	{
		if (!($project->isOwnedByUser() || $project->isUserSupervisorOfProject()))
		{
			session()->flash('message', 'You are not allowed to edit "' . $project->title . '".');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectController@show', $project);
		}

		preg_match('/\(\+\+.*\+\+\)/umix', $input->description, $macthes);

		// Has the supervisor forgotten to remove the archive text?
		if (!empty($macthes))
		{
			if (empty($macthes[0]))
			{
				//This shouldn't happen
				session()->flash('message', 'Please remove the text between (++ ++)');
			}
			else
			{
				session()->flash('message', 'Please remove the text "' . $macthes[0] . '"');
			}
			session()->flash('message_type', 'warning');
			return redirect()->action('ProjectController@edit', $project);
		}

		DB::Transaction(function () use ($input, $project)
		{
			$transaction = new Transaction();
			$cleanHtml = Purify::clean($input->description, $this->htmlPurifyConfig);

			// You can't update the status of an accepted project
			if ($project->getAcceptedStudent() == null)
			{
				// So student proposals can't be overridden
				if ($project->status == "student-proposed")
				{
					$status = "student-proposed";
				}
				else
				{
					$status = $input->status;
				}

				$project->update([
					'title'       => $input->title,
					'description' => $cleanHtml,
					'status'      => $status,
					'skills'      => $input->skills,
				]);
			}
			else
			{
				$project->update([
					'title'       => $input->title,
					'description' => $cleanHtml,
					'skills'      => $input->skills,
				]);
			}

			// Supervisors can update student-proposed projects too
			if ($project->status == "student-proposed" && Auth::user()->isStudent())
			{
				$transaction->fill(array(
					'type'             => 'project',
					'action'           => 'updated',
					'project'          => $project->id,
					'student'          => Auth::user()->student->id,
					'transaction_date' => new Carbon(),
				));
			}
			else
			{
				$transaction->fill(array(
					'type'             => 'project',
					'action'           => 'updated',
					'project'          => $project->id,
					'supervisor'       => Auth::user()->supervisor->id,
					'transaction_date' => new Carbon(),
				));
			}

			$transaction->save();
		});

		if ($project->status == "student-proposed" && !Auth::user()->isStudent())
		{
			try {
				Mail::to($project->student->user->email)
					->send(new SupervisorEditedProposedProject(Auth::user()->supervisor, $project->student, $project));
			}
			catch (\Exception $e)
			{
			}
		}

		session()->flash('message', '"' . $project->title . '" has been updated.');
		session()->flash('message_type', 'success');

		return redirect()->action('ProjectController@show', $project);
	}

	/**
	 * Creates a copy of the specified resource.
	 *
	 *
	 * @param  Project                     $project
	 * @return \Illuminate\Http\Response
	 */
	public function copy(Project $project)
	{
		if (!($project->isOwnedByUser() || $project->isUserSupervisorOfProject()))
		{
			session()->flash('message', 'You are not allowed to copy of "' . $project->title . '".');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectController@show', $project);
		}

		if ($project->status == "student-proposed")
		{
			session()->flash('message', 'You are not allowed to create a copy of a student proposal.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectController@show', $project);
		}

		$newProject = DB::Transaction(function () use ($project)
		{
			$newProject = new Project();
			$transaction = new Transaction();

			$description = preg_replace('/\(\+\+(.)*\+\+\)/umix', '', $project->description);

			$newProject->fill(array(
				'title'       => $project->title . " (Copied)",
				'description' => $description,
				'status'      => 'withdrawn',
				'skills'      => $project->skills,
			));

			$newProject->supervisor_id = $project->supervisor_id;
			$newProject->save();

			$transaction->fill(array(
				'type'             => 'project',
				'action'           => 'copy',
				'project'          => $project->id . " -> " . $newProject->id,
				'supervisor'       => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();

			return $newProject;
		});

		session()->flash('message', '"' . $newProject->title . '" has been copied.');
		session()->flash('message_type', 'success');

		return redirect()->action('ProjectController@show', $newProject);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 *
	 * @param  Project                     $project
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Project $project)
	{
		if (!$project->isOwnedByUser())
		{
			return response()->json(array('successful' => false));
		}

		if (count($project->getStudentsWithProjectSelected()) > 0)
		{
			return response()->json(array('successful' => false, 'message' => '1 or more students have this project selected.'));
		}

		if ($project->getAcceptedStudent() != null)
		{
			return response()->json(array('successful' => false, 'message' => 'A student has been accepted for this project.'));
		}

		if (Auth::user()->isStudent())
		{
			if ($project->supervisor_id != null)
			{
				return response()->json(array('successful' => false, 'message' => 'You must undo your proposal before deleting this project.'));
			}
		}

		DB::Transaction(function () use ($project)
		{
			$transaction = new Transaction();

			if ($project->status == "student-proposed")
			{
				$transaction->fill(array(
					'type'             => 'project',
					'action'           => 'deleted',
					'project'          => $project->title,
					'student'          => Auth::user()->student->id,
					'transaction_date' => new Carbon(),
				));
			}
			else
			{
				$transaction->fill(array(
					'type'             => 'project',
					'action'           => 'deleted',
					'project'          => $project->title,
					'supervisor'       => Auth::user()->supervisor->id,
					'transaction_date' => new Carbon(),
				));
			}

			$transaction->save();
			$project->delete();
		});

		session()->flash("message", "Project has been deleted.");
		session()->flash('message_type', 'success');

		if ($project->status == "student-proposed")
		{
			return response()->json(array('successful' => true, 'url' => action('HomeController@index')));
		}
		else
		{
			return response()->json(array('successful' => true, 'url' => action('UserController@projects', Auth::user())));
		}
	}

	/**
	 * Displays all topics with the number of projects associated with it.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function showTopics()
	{
		$topics = Topic::all();

		foreach ($topics as $key => $topic)
		{
			$topic->project_count = $topic->getProjectsOnOfferCount();

			if ($topic->project_count < 1)
			{
				unset($topics[$key]);
			}
		}

		return view('projects.by-topic')
			->with('topics', $topics);
	}

	/**
	 * Displays all projects with the parameter topic.
	 *
	 *
	 * @param  Topic                                                      $topic
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function byTopic(Topic $topic, Request $request)
	{
		$supervisorTable = new Supervisor();
		$userTable = new User();
		$projectTable = new Project();
		$projectTopicTable = new ProjectTopic();

		$sortCol = "view_count";
		$sortDir = "asc";

		if (!empty($request->sortCol) && in_array($request->sortCol, $projectTable->sortable))
		{
			$sortCol = $request->sortCol;
		}

		if (!empty($request->sortDir) && ($sortDir == "asc" || $sortDir == "desc"))
		{
			$sortDir = $request->sortDir;
		}

		$projects =
		Project::whereNotNull('supervisor_id')
			->join($supervisorTable->getTable() . ' as supervisor', 'supervisor_id', '=', 'supervisor.id')
			->join($userTable->getTable() . ' as user', 'user.id', '=', 'supervisor.id')
			->rightJoin($projectTopicTable->getTable() . ' as projectTopic', 'projectTopic.project_id', '=', $projectTable->getTable() . '.id')
			->where('topic_id', $topic->id)
			->where('status', 'on-offer')
			->where('user.privileges', 'LIKE', '%supervisor%')
			->where('supervisor.take_students_' . get_el_short_name(), true)
			->select($projectTable->getTable() . '.*')
			->orderBy($sortCol, $sortDir)
			->paginate($this->paginationCount);

		return view('projects.index')
			->with('projects', $projects)
			->with('topic', $topic)
			->with('view', 'topic');
	}

	/**
	 * Displays all supervisors with projects on offer.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function showSupervisors()
	{
		$supervisors = Supervisor::getAllSupervisorsQuery()
			->where("take_students_" . get_el_short_name(), true)
			->get();

		return view('projects.by-supervisor')->with('supervisors', $supervisors);
	}

	/**
	 * Checks to see if a project name is already in-use by on a on-offer project.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function projectNameAlreadyExists(Request $request)
	{
		$sameTitleCount = Project::select('title')
			->where('title', $request->project_title)
			->where('id', '<>', $request->project_id)
			->where('status', 'on-offer')->count();

		$similiarTitleCount = 0;
		if (strlen($request->project_title) > 10)
		{
			$similiarTitleCount = Project::select('title')
				->where('title', 'LIKE', $request->project_title . '%')
				->where('id', '<>', $request->project_id)
				->where('status', 'on-offer')->count();
		}

		return response()->json(array(
			'hasSameTitle'     => $sameTitleCount > 0,
			'hasSimiliarTitle' => $similiarTitleCount > 0,
		));
	}

	/**
	 * Checks to see if a project name is already in-use by on a on-offer project.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function projectDescriptionPreview(Request $request)
	{
		if (strlen($request->description) < 1)
		{
			$returnString = "<p style='padding:2rem;text-align:center;'>Nothing to see here yet...</p>";
		}
		else
		{
			$returnString = Purify::clean($request->description, $this->htmlPurifyConfig);
		}

		return response()->json(array('message' => $returnString));
	}

	/**
	 * Searches through projects.
	 *
	 * SELECT CONDITIONS
	 * 		Select if supervisor take_students is true
	 * 		Select if on-offer
	 * 		Select if NOT archived
	 * 		select if NOT student proposed
	 *
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\View\View
	 */
	public function search(Request $request)
	{
		$searchTerm = $request->get("searchTerm");
		$filters = $request->get("filter");
		$selectedFilters = "";
		$filteredAtLeastOnce = false;
		$filteredByTopics = false;

		if (is_null($request->get("searchTerm")) || is_null($request->get("filter")))
		{
			session()->flash("message", "Please enter a search term.");
			session()->flash('message_type', 'error');

			return redirect()->action('ProjectController@index');
		}

		if (strlen($request->get("searchTerm")) < 3)
		{
			session()->flash("message", "Please enter a longer search term.");
			session()->flash('message_type', 'error');

			return redirect()->action('ProjectController@index');
		}

		// Create a string of the filters used (Only used to give the user feedback).
		foreach ($filters as $selected)
		{
			if ($selected !== end($filters))
			{
				$selectedFilters .= $selected;
				$selectedFilters .= ", ";
			}
			else
			{
				$selectedFilters = substr($selectedFilters, 0, -2);
				if (count($filters) > 1)
				{
					$selectedFilters .= " and ";
				}

				$selectedFilters .= $selected;
			}
		}

		// So we can display which filters were selected.
		session()->flash('search_filters', $selectedFilters);

		$sessionDbPrefix = Session::get('department') . "_projects_" . get_el_short_name();

		$projects = Project::select($sessionDbPrefix . '.*', Session::get('department') . '_supervisors.take_students_' . get_el_short_name() . '')
			->join(Session::get('department') . '_supervisors', Session::get('department') . '_projects_' . get_el_short_name() . '.supervisor_id', '=', Session::get('department') . '_supervisors.id')
			->where(Session::get('department') . '_supervisors.take_students_' . get_el_short_name(), true);

		if (Auth::check())
		{
			if (Auth::user()->isSupervisor())
			{
				$projects->where("status", "on-offer");
			}
		}

		if (ldap_guest())
		{
			$projects->where("status", "on-offer");
		}

		// Title filter
		if (in_array("title", $filters))
		{
			if (count($filters) == 1 || !$filteredAtLeastOnce)
			{
				$projects->where($sessionDbPrefix . "." . "title", "LIKE", '%' . $searchTerm . '%');
			}
			else
			{
				$projects->orWhere($sessionDbPrefix . "." . "title", "LIKE", '%' . $searchTerm . '%');
			}

			$filteredAtLeastOnce = true;
		}

		// Skills filter
		if (in_array("skills", $filters))
		{
			if (count($filters) == 1 || !$filteredAtLeastOnce)
			{
				$projects->where("skills", "LIKE", '%' . $searchTerm . '%');
			}
			else
			{
				$projects->orWhere("skills", "LIKE", '%' . $searchTerm . '%');
			}

			$filteredAtLeastOnce = true;
		}

		// Description filter
		if (in_array("description", $filters))
		{
			if (count($filters) == 1 || !$filteredAtLeastOnce)
			{
				$projects->where("description", "LIKE", '%' . $searchTerm . '%');
			}
			else
			{
				$projects->orWhere("description", "LIKE", ' %' . $searchTerm . '% ');
			}

			$filteredAtLeastOnce = true;
		}

		$projects = $projects->limit(50)->get();

		// There was no projects to be found
		if (!$filteredAtLeastOnce || count($projects) == 0)
		{
			session()->flash("message", 'We couldn\'t find anything for "' . $searchTerm . '" .');
			session()->flash('message_type', 'warning');

			return redirect()->action('ProjectController@index');
		}

		// Only 1 project was found by the search, so show this project.
		if (count($projects) == 1)
		{
			if ($filteredByTopics)
			{
				$project = $projects->first();
			}
			else
			{
				$project = $projects[0];
			}
			session()->flash('message', "We only found one project, it's this one.");

			return view('projects.project')
				->with('view', 'SupervisorProject')
				->with('project', $project);
		}

		// Returns all the projects found by the search.
		if (count($projects) > 1)
		{
			return view('projects.index')
				->with('projects', $projects)
				->with('view', 'search')
				->with('searchTerm', $searchTerm);
		}

		// Fallback
		return redirect()->action('ProjectController@index');
	}

	/**
	 * Returns the first accepted project without a second marker.
	 *
	 * @return Project The next accepted project without a second marker.
	 */
	public static function getAcceptedProjectWithoutSecondMarker()
	{
		$project = new Project();
		$student = new Student();
		$user = new User();

		return Project::join($student->getTable() . ' as student', $project->getTable() . '.id', '=', 'student.project_id')
			->join($user->getTable() . ' as user', 'user.id', '=', 'student.id')
			->where('user.active_year', Mode::getProjectYear())
			->where('student.project_status', 'accepted')
			->whereNull($project->getTable() . '.marker_id')
			->select($project->getTable() . '.*')
			->first();
	}

	public static function getAcceptedProjectWithoutSecondMarkerCount()
	{
		$project = new Project();
		$student = new Student();
		$user = new User();

		return Project::join($student->getTable() . ' as student', $project->getTable() . '.id', '=', 'student.project_id')
			->join($user->getTable() . ' as user', 'user.id', '=', 'student.id')
			->where('user.active_year', Mode::getProjectYear())
			->where('student.project_status', 'accepted')
			->whereNull($project->getTable() . '.marker_id')
			->select($project->getTable() . '.*')
			->count();
	}

	/**
	 * Returns the first accepted project without a second marker.
	 *
	 * @return Project The next accepted project without a second marker.
	 */
	public static function getAcceptedProjectCount()
	{
		$project = new Project();
		$student = new Student();

		// We shouldn't return 0 because division by zero could occur
		return max(1, Project::join($student->getTable() . ' as student', $project->getTable() . '.id', '=', 'student.project_id')
				->where('student.project_status', 'accepted')
				->count());
	}

	/**
	 * Updates the projects second marker.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function updateSecondMarker(Request $request)
	{
		if (!Auth::user()->isAdminOfEducationLevel() && !Auth::user()->isStaff())
		{
			session()->flash('message', 'Sorry, you are not allowed to perform this action.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$request->validate([
			'student_id'    => 'required',
			'marker_id' => 'required'
		]);

		DB::transaction(function () use ($request)
		{
			$project = Project::find($request->project_id);
			$student = Student::findOrFail($request->student_id);
			$marker = Supervisor::findOrFail($request->marker_id);
			$transaction = new Transaction();

			$transaction->fill(array(
				'type'             => 'marker',
				'action'           => 'marker-assigned',
				'project'          => $project->id,
				'student'          => $student->id,
				'supervisor'       => $project->supervisor_id,
				'marker'           => $marker->id,
				'admin'            => Auth::user()->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();

			$project->marker_id = $marker->id;
			$project->save();
		});

		return response()->json(array('successful' => true));
	}

	/**
	 * The project overview view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function overview()
	{
		if (!empty($request->project_year))
		{
			$userTable = (new User())->getTable();
			$studentTable = (new Student())->getTable();

			$students = Student::join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
				->select($studentTable . '.*')
				->where('user.active_year', $request->project_year)
				->orderBy('user.last_name', 'asc')
				->get();
		}
		else
		{
			$students = Student::getAllStudentsQuery()->get();
		}

		return view('admin.projects.overview')
			->with("students", $students);
	}
}