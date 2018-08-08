<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Flash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Illuminate\Database\QueryException;
use Stevebauman\Purify\Facades\Purify;
use SussexProjects\Http\Requests\ProjectForm;
use SussexProjects\Mail\SupervisorEditedProposedProject;
use SussexProjects\Project;
use SussexProjects\ProjectTopic;
use SussexProjects\Supervisor;
use SussexProjects\Topic;
use SussexProjects\Transaction;
use SussexProjects\User;


/**
 * The project controller.
 * Handles all functions related to projects.
 */
class ProjectController extends Controller{

	/**
	 * The HTML purifier configuration used for the project description.
	 *
	 * @see http://htmlpurifier.org/live/configdoc/plain.html HTML purifier configuration documentation.
	 * @see https://github.com/ezyang/htmlpurifier The Laravel implementation of HTML purifier.
	 * @var string[] ~HTML purifier configuration
	 */
	public $htmlPurifyConfig;

	public function __construct(){
		parent::__construct();
		$this->paginationCount = 25;

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
	 * @param Request $request
	 *
	 * @return \Illuminate\View\View
	 */
	public function index(Request $request){
		$supervisorTable = new Supervisor();
		$userTable = new User();
		$projectTable = new Project();
		$projects = Project::whereNotNull('supervisor_id');

		if(Auth::check()){
			if(!Auth::user()->isSupervisor()){
				$projects->where('status', 'on-offer');
			}
		}

		if(ldap_guest()){
			$projects->where('status', 'on-offer');
		}

		$projects
			->join($supervisorTable->getTable().' as supervisor', 'supervisor_id', '=', 'supervisor.id')
			->join($userTable->getTable().' as user', 'user.id', '=', 'supervisor.id')
			->where('user.privileges', 'LIKE', '%supervisor%')
			->where('supervisor.take_students_'.Session::get('education_level')["shortName"], true)
			->select($projectTable->getTable().'.*', 'supervisor.take_students_'.Session::get('education_level')["shortName"])
			->orderBy('title', 'asc')
			->paginate($this->paginationCount);

		if($request->query("page")){
			return view('projects.partials.pagination')
				->with('projects', $projects->get())->with('view', 'index');
		}
		return view('projects.index')->with('projects', $projects->get())
			->with('view', 'index');
	}

	/**
	 * Displays the specified project.
	 *
	 * @param Project $project
	 *
	 * @return \Illuminate\View\View
	 */
	public function show(Project $project){
		$view = "SupervisorProject";

		if($project->status === "student-proposed"){
			$view = "StudentProject";
		}

		if(request()->query("preview") == true){
			return view('projects.partials.project-preview')
				->with('project', $project)->with('view', $view);
		}

		return view('projects.project')->with('project', $project)
			->with('view', $view);
	}

	/**
	 * Adds a topic to a project.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return string The newly added topic's name
	 */
	public function addTopic(Request $request){
		$result = DB::transaction(function() use ($request){
			$topic = Topic::where('name', $request->topic_name)->first();
			$project = Project::findOrFail($request->project_id);

			// If topic isn't in the relevant topic database, create a new one.
			if($topic == null){
				$topic = new Topic;
				$topic->name = $request->topic_name;
				$topic->save();
			}

			// Validate data
			$projectTopic = new ProjectTopic;

			// the project has no other topics, so make it's first topic the primary topic
			$projectTopic->primary = count($project->topics) == 0;
			$projectTopic->topic_id = $topic->id;
			$projectTopic->project_id = $project->id;

			try{
				$projectTopic->save();
			} catch (QueryException $e){
				return false;
			}

			return Topic::findOrFail($topic->id);
		});

		if(!$result){
			return response()->json(array(
					'successful' => false,
					'message' => 'Topic "'.$request->topic_name.'" already belongs to the project.'
				));
		} else {
			return response()->json(array(
				'successful' => true,
				'topic' => $result
			));
		}
	}

	/**
	 * Removes a topic to a project.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function removeTopic(Request $request){
		DB::transaction(function() use ($request){
			$topic = Topic::findOrFail($request->topic_id);
			$project = Project::findOrFail($request->project_id);

			ProjectTopic::where('project_id', $project->id)
				->where('topic_id', $topic->id)->delete();
		});
		
		return response()->json(array('successful' => true));
	}

	/**
	 * Updates a projects primary topic
	 *
	 * @param  \Illuminate\Http\Request $request Contains new primary project ID
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function updatePrimaryTopic(Request $request){
		DB::transaction(function() use ($request){
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
	public function create(){
		return view('projects.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param ProjectForm $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function store(ProjectForm $request){
		// Not included in ProjectForm because of update 
		$this->validate(request(), [
			'status' => 'required'
		]);

		$result = DB::transaction(function() use ($request){
			$project = new Project;
			$transaction = new Transaction;
			$cleanHtml = Purify::clean($request->description, $this->htmlPurifyConfig);

			$project->fill(array(
				'title' => $request->title,
				'description' => $cleanHtml,
				'status' => $request->status,
				'skills' => $request->skills
			));

			$project->supervisor_id = Auth::user()->supervisor->id;
			$project->save();

			if(!empty($request->topics)){
				foreach ($request->topics as $createTopicName) {
					$topic = Topic::where('name', $createTopicName)->first();

					// If topic isn't in the relevant topic database, create a new one.
					if($topic == null){
						$topic = new Topic;
						$topic->name = $createTopicName;
						$topic->save();
					}

					// Validate data
					$projectTopic = new ProjectTopic;

					// the project has no other topics, so make it's first topic the primary topic
					$projectTopic->primary = count($project->topics) == 0;
					$projectTopic->topic_id = $topic->id;
					$projectTopic->project_id = $project->id;

					$projectTopic->save();
				}
			}

			$transaction->fill(array(
				'type' => 'project',
				'action' => 'created',
				'project' => $project->id,
				'supervisor' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();

			// Redirect
			session()->flash('message', '"'.$project->title.'" has been created.');
			session()->flash('message_type', 'success');

			return redirect()->action('ProjectController@show', $project);
		});

		return $result;
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param Project $project
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function edit(Project $project){
		if($project->isOwnedByUser() || $project->isUserSupervisorOfProject()){
			return view('projects.edit')->with('project', $project);
		}

		return redirect()->action('ProjectController@show', $project);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param ProjectForm $input
	 * @param Project     $project
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update(ProjectForm $input, Project $project){
		if(!($project->isOwnedByUser() || $project->isUserSupervisorOfProject())){
			session()->flash('message', 'You are not allowed to edit "'.$project->title.'".');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectController@show', $project);
		}

		DB::Transaction(function() use ($input, $project){
			$transaction = new Transaction;
			$cleanHtml = Purify::clean($input->description, $this->htmlPurifyConfig);

			// So student proposals can't be overridden
			if($project->status == "student-proposed"){
				$status = "student-proposed";
			} else {
				$status = $input->status;
			}

			$project->update([
				'title' => $input->title,
				'description' => $cleanHtml,
				'status' => $status,
				'skills' => $input->skills
			]);

			if($project->status == "student-proposed"){
				$transaction->fill(array(
					'type' => 'project',
					'action' => 'updated',
					'project' => $project->id,
					'student' => Auth::user()->student->id,
					'transaction_date' => new Carbon
				));
			} else {
				$transaction->fill(array(
					'type' => 'project',
					'action' => 'updated',
					'project' => $project->id,
					'supervisor' => Auth::user()->supervisor->id,
					'transaction_date' => new Carbon
				));
			}

			$transaction->save();
		});

		if($project->status == "student-proposed" && Auth::user()->isSupervisor()){
			try{
				Mail::to($project->student->user->email)
					->send(new SupervisorEditedProposedProject(Auth::user()->supervisor, $project->student, $project));
			} catch (\Exception $e){

			}
		}

		session()->flash('message', '"'.$project->title.'" has been updated.');
		session()->flash('message_type', 'success');

		return redirect()->action('ProjectController@show', $project);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param Project $project
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Project $project){
		if(!$project->isOwnedByUser()){
			return response()->json(array('successful' => false));
		}

		if(count($project->getStudentsWithProjectSelected()) > 0){
			return response()->json(array('successful' => false, 'message' => 'Students have this project selected.'));
		}

		if($project->getAcceptedStudent() != null){
			return response()->json(array('successful' => false, 'message' => 'A student has been accepted for this project.'));
		}

		if(Auth::user()->isStudent()){
			if($project->supervisor_id != null){
				return response()->json(array('successful' => false, 'message' => 'You must undo your proposal before deleting this project.'));
			}
		}

		DB::Transaction(function() use ($project){
			$transaction = new Transaction;

			if($project->status == "student-proposed"){
				$transaction->fill(array(
					'type' => 'project',
					'action' => 'deleted',
					'project' => $project->id,
					'student' => Auth::user()->student->id,
					'transaction_date' => new Carbon
				));
			} else {
				$transaction->fill(array(
					'type' => 'project',
					'action' => 'deleted',
					'project' => $project->id,
					'supervisor' => Auth::user()->supervisor->id,
					'transaction_date' => new Carbon
				));
			}

			$transaction->save();
			$project->delete();
		});
		if($project->status == "student-proposed"){
			return response()->json(array('successful' => true, 'url' => action('HomeController@index')));
		} else {
			return response()->json(array('successful' => true, 'url' => action('UserController@projects', Auth::user())));
		}
	}

	/**
	 * Displays all topics with the number of projects associated with it.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function showTopics(){
		$topics = Topic::all();

		return view('projects.topics')->with('topics', $topics);
	}

	/**
	 * Displays all projects with the parameter topic.
	 * 
	 * @param Topic $topic
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function byTopic(Topic $topic){
		return view('projects.index')
			->with('projects', $topic->getProjectsOnOffer())
			->with('topic', $topic)->with('view', 'topic');
	}

	/**
	 * Displays all supervisors with projects on offer.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function showSupervisors(){
		$supervisors = Supervisor::getAllSupervisorsQuery()->get();

		return view('projects.supervisors')->with('supervisors', $supervisors);
	}

	/**
	 * Checks to see if a project name is already in-use by on a on-offer project. 
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function projectNameAlreadyExists(Request $request){
		$sameTitleCount = Project::select('title')
			->where('title', $request->project_title)
			->where('id', '<>', $request->project_id)
			->where('status', 'on-offer')->count();

		$similiarTitleCount = 0;
		if(strlen($request->project_title) > 10){
			$similiarTitleCount = Project::select('title')
				->where('title', 'LIKE', $request->project_title.'%')
				->where('id', '<>', $request->project_id)
				->where('status', 'on-offer')->count();
		}

		return response()->json(array(
			'hasSameTitle' => $sameTitleCount > 0,
			'hasSimiliarTitle' => $similiarTitleCount > 0
		));
	}

	/**
	 * Checks to see if a project name is already in-use by on a on-offer project. 
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function projectDescriptionPreview(Request $request){
		if(strlen($request->description) < 1){
			$returnString = "<p style='padding:2rem;text-align:center;'>Nothing to see here yet...</p>";
		} else {
			$returnString = Purify::clean($request->description, $this->htmlPurifyConfig);
		}

		return response()->json(array('message' => $returnString ));
	}

	/**
	 * Searches through projects.
	 *
	 * SELECT CONDITIONS
	 *		Select if supervisor take_students is true
	 *		Select if on-offer
	 *		Select if NOT archived
	 *		select if NOT student proposed
	 * 
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\View\View
	 */
	public function search(Request $request){
		$searchTerm = $request->get("searchTerm");
		$filters = $request->get("filter");
		$selectedFilters = "";
		$filteredAtLeastOnce = false;
		$filteredByTopics = false;

		if(is_null($request->get("searchTerm")) || is_null($request->get("filter"))){
			session()->flash("message", "Please enter a search term.");
			session()->flash('message_type', 'error');

			return redirect()->action('ProjectController@index');
		}

		if(strlen($request->get("searchTerm")) < 3){
			session()->flash("message", "Please enter a longer search term.");
			session()->flash('message_type', 'error');

			return redirect()->action('ProjectController@index');
		}

		// Create a string of the filters used (Only used to give the user feedback).
		foreach($filters as $selected){
			if($selected !== end($filters)){
				$selectedFilters .= $selected;
				$selectedFilters .= ", ";
			} else {
				$selectedFilters = substr($selectedFilters, 0, -2);
				if(count($filters) > 1){
					$selectedFilters .= " and ";
				}

				$selectedFilters .= $selected;
			}
		}

		// So we can display which filters were selected.
		session()->flash('search_filters', $selectedFilters);

		$sessionDbPrefix = Session::get('department')."_projects_".Session::get('education_level')["shortName"];

		$projects = Project::select($sessionDbPrefix.'.*', Session::get('department').'_supervisors.take_students_'.Session::get('education_level')["shortName"].'')
			->join(Session::get('department').'_supervisors', Session::get('department').'_projects_'.Session::get('education_level')["shortName"].'.supervisor_id', '=', Session::get('department').'_supervisors.id')
			->where(Session::get('department').'_supervisors.take_students_'.Session::get('education_level')["shortName"], true);

		if(Auth::check()){
			if(!Auth::user()->isSupervisor()){
				$projects->where("status", "on-offer");
			}
		}
		
		if(ldap_guest()){
			$projects->where("status", "on-offer");
		}

		// Title filter
		if(in_array("title", $filters)){
			if(count($filters) == 1 || !$filteredAtLeastOnce){
				$projects->where($sessionDbPrefix."."."title", "LIKE", '%'.$searchTerm.'%');
			} else {
				$projects->orWhere($sessionDbPrefix."."."title", "LIKE", '%'.$searchTerm.'%');
			}

			$filteredAtLeastOnce = true;
		}

		// Skills filter
		if(in_array("skills", $filters)){
			if(count($filters) == 1 || !$filteredAtLeastOnce){
				$projects->where("skills", "LIKE", '%'.$searchTerm.'%');
			} else {
				$projects->orWhere("skills", "LIKE", '%'.$searchTerm.'%');
			}

			$filteredAtLeastOnce = true;
		}

		// Description filter
		if(in_array("description", $filters)){
			if(count($filters) == 1 || !$filteredAtLeastOnce){
				$projects->where("description", "LIKE", '%'.$searchTerm.'%');
			} else {
				$projects->orWhere("description", "LIKE", ' %'.$searchTerm.'% ');
			}

			$filteredAtLeastOnce = true;
		}

		$projects = $projects->get();

		if(in_array("topics", $filters)){
			$filteredAtLeastOnce = true;
			$filteredByTopics = true;

			$projects = $projects->filter(function($project) use ($searchTerm){
				foreach($project->topics as $key => $topic){
					if(strcasecmp($topic->name, $searchTerm) == 0){
						return true;
					}
				}

				return false;
			});
		}

		// There was no projects to be found
		if(!$filteredAtLeastOnce || count($projects) == 0){
			session()->flash("message", 'We couldn\'t find anything for "'.$searchTerm.'" .');
			session()->flash('message_type', 'warning');

			return redirect()->action('ProjectController@index');
		}

		// Only 1 project was found by the search, so show this project.
		if(count($projects) == 1){
			if($filteredByTopics){
				$project = $projects->first();
			} else {
				$project = $projects[0];
			}
			session()->flash('message', "We only found one project, it's this one.");

			return view('projects.project')->with('view', 'SupervisorProject')
				->with('project', $project);
		}

		// Returns all the projects found by the search.
		if(count($projects) > 1){
			return view('projects.index')
				->with('projects', $projects)
				->with('view', 'search')
				->with('searchTerm', $searchTerm);
		}

		// Fallback
		return redirect()->action('ProjectController@index');
	}
}