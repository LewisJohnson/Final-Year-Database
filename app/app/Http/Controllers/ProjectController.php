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
use Stevebauman\Purify\Facades\Purify;
use SussexProjects\Http\Requests\ProjectForm;
use SussexProjects\Mail\SupervisorEditedProposedProject;
use SussexProjects\Project;
use SussexProjects\ProjectTopic;
use SussexProjects\Supervisor;
use SussexProjects\Topic;
use SussexProjects\Transaction;

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
	public static $descriptionPurifyConfig = ['Core.CollectErrors' => true,
											  'Attr.ID.HTML5' => true,
											  'HTML.TargetBlank' => true,
											  'HTML.ForbiddenElements' => 'h1,h2,h3,h4,h5,h6,script,html,body'
	];

	public function __construct(){
		$this->middleware('auth');
		$this->paginationCount = 25;
	}

	/**
	 * Display a listing of the resource.
	 * SELECT CONDITIONS
	 * - Select if supervisor take_students is true
	 * - Select if on-offer
	 * - Select if NOT archived
	 * - select if NOT student proposed
	 *
	 * @return \Illuminate\View\View
	 */
	public function index(Request $request){
		/* SELECT CONDITIONS
			Select if supervisor take_students is true
			Select if on-offer
			Select if NOT archived
			select if NOT student proposed
		*/
		$supervisorTable = new Supervisor();
		$projectTable = new Project();
		$projects = Project::where('status', 'on-offer')
			->whereNotNull('supervisor_id')
			->join($supervisorTable->getTable(). ' as supervisor', 'supervisor_id', '=', 'supervisor.id')
			->where('supervisor.take_students_'.Session::get('education_level')["shortName"], true)
			->select($projectTable->getTable().'.*', 'supervisor.take_students_'.Session::get('education_level')["shortName"])
			->paginate($this->paginationCount);

		if($request->query("page")){
			return view('projects.partials.pagination')->with('projects', $projects)->with('view', 'index');
		}

		return view('projects.index')->with('projects', $projects)->with('view', 'index');

	}

	/**
	 * Display the specified resource.
	 *
	 * @param \Illuminate\Http\Request $request
	 * @param  UUID                    $uuid
	 *
	 * @return \Illuminate\View\View
	 */
	public function show(Project $project){
		$view = "SupervisorProject";
		$studentName = "a student";

		if($project->status === "student-proposed"){
			$view = "StudentProject";
		}

		if(request()->query("preview") == true){
			return view('projects.partials.project-preview')->with('project', $project)->with('view', $view);
		}

		return view('projects.project')->with('project', $project)->with('view', $view);
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
			$topic = Topic::where('name', request('topic_name'))->first();
			$project = Project::findOrFail(request('project_id'));

			// If topic isn't in the relevant topic database, create a new one.
			if($topic == null){
				$topic = new Topic;
				$topic->name = request('topic_name');
				$topic->save();
			}

			// Validate data
			$projectTopic = new ProjectTopic;

			// the project has no other topics, so make it's first topic the primary topic
			$projectTopic->primary = count($project->topics) == 0;
			$projectTopic->topic_id = $topic->id;
			$projectTopic->project_id = $project->id;

			$projectTopic->save();

			return Topic::findOrFail($topic->id);
		});

		return response()->json(array('successful' => true, 'topic' => $result
		));
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
			$topic = Topic::findOrFail(request('topic_id'));
			$project = Project::findOrFail(request('project_id'));

			ProjectTopic::where('project_id', $project->id)->where('topic_id', $topic->id)->delete();
		});

		return response()->json(array('successful' => true));
	}

	/**
	 * Updates the projects primary topic
	 *
	 * @param  \Illuminate\Http\Request $request Contains new primary project ID
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function updatePrimaryTopic(Request $request){
		DB::transaction(function() use ($request){
			$topic = Topic::findOrFail(request('topic_id'));
			$project = Project::findOrFail(request('project_id'));

			// Clear primary
			ProjectTopic::where('project_id', $project->id)->update(['primary' => 0]);

			// Set new primary project
			ProjectTopic::where('project_id', $project->id)->where('topic_id', $topic->id)->update(['primary' => 1]);
		});

		return response()->json(array('successful' => true));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create(){
		return view('projects.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function store(ProjectForm $request){
		$result = DB::transaction(function() use ($request){
			$project = new Project;
			$transaction = new Transaction;
			$clean_html = Purify::clean(request('description'), ProjectController::$descriptionPurifyConfig);

			$project->fill(array('title' => request('title'),
								 'description' => $clean_html,
								 'status' => request('status'),
								 'skills' => request('skills')
			));

			$project->supervisor_id = Auth::user()->supervisor->id;
			$project->save();

			$transaction->fill(array('type' => 'project', 'action' => 'created',
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
	 * @param  UUID $uuid
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function edit(Project $project){
		if($project->isOwnedByUser()){
			return view('projects.edit')->with('project', $project);
		}

		return redirect()->action('ProjectController@show', $project);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int $id
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update(ProjectForm $input, Project $project){
		if(!$project->isOwnedByUser() || Auth::user()->isStudent()){
			return response()->json(array('successful' => false));
		}

		DB::Transaction(function() use ($input, $project){
			$transaction = new Transaction;
			$clean_html = Purify::clean(request('description'), ProjectController::$descriptionPurifyConfig);

			// So student proposals can't be overridden
			if($project->status == "student-proposed"){
				$input->status = "student-proposed";
			}

			$project->update(['title' => $input->title,
							  'description' => $clean_html,
							  'status' => $input->status,
							  'skills' => $input->skills
			]);

			if($project->status == "student-proposed"){
				$transaction->fill(array('type' => 'project',
										 'action' => 'updated',
										 'project' => $project->id,
										 'student' => Auth::user()->student->id,
										 'transaction_date' => new Carbon
				));
			} else {
				$transaction->fill(array('type' => 'project',
										 'action' => 'updated',
										 'project' => $project->id,
										 'supervisor' => Auth::user()->supervisor->id,
										 'transaction_date' => new Carbon
				));
			}

			$transaction->save();
		});

		if($project->status == "student-proposed"){
			try{
				Mail::to($student->user->email)->send(new SupervisorEditedProposedProject(Auth::user()->supervisor, $project->student, $project));
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
	 * @param  int $id
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Project $project){
		if(!$project->isOwnedByUser() || Auth::user()->isStudent()){
			return response()->json(array('successful' => false));
		}

		DB::Transaction(function() use ($project){
			$transaction = new Transaction;
			$transaction->fill(array('type' => 'project', 'action' => 'deleted',
									 'project_id' => $id,
									 'supervisor_id' => Auth::user()->supervisor->id,
									 'transaction_date' => new Carbon
			));

			$transaction->save();
			$project->delete();
		});

		return response()->json(array('successful' => true));
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function showTopics(){
		$topics = Topic::all();

		return view('projects.topics')->with('topics', $topics);
	}

	public function byTopic(Topic $topic){
		return view('projects.index')->with('projects', $topic->getProjectsOnOffer())->with('topic', $topic)->with('view', 'topic');
	}

	/**
	 * Displays all supervisors with projects on offer.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function showSupervisors(){
		$supervisor = Supervisor::all();

		return view('projects.supervisors')->with('supervisors', $supervisor);
	}

	/**
	 * Removes a topic to a project.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function projectNameAlreadyExists(Request $request){
		$sameTitleCount = Project::select('title')->where('title', $request->project_title)->where('status', 'on-offer')->count();

		$sameTitle = $sameTitleCount > 0;

		return response()->json(array('hasSameTitle' => $sameTitle));
	}

	/**
	 * Searches through projects.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\View\View
	 */
	public function search(Request $request){

		/* SELECT CONDITIONS
			Select if supervisor take_students is true
			Select if on-offer
			Select if NOT archived
			select if NOT student proposed
		*/

		$searchTerm = $request->get("searchTerm");
		$filters = $request->get("filter");
		$selectedFilters = "";
		$filteredAtLeastOnce = false;
		$filteredByTopics = false;

		if(is_null($request->get("searchTerm")) || is_null($request->get("filter"))){
			session()->flash("message", "Sorry, something went wrong with that request.");
			session()->flash('message_type', 'error');

			return redirect()->action('ProjectController@index', $request);
		}

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

		session()->flash('search_filters', $selectedFilters);

		$sessionDbPrefix = Session::get('department')."_projects_".Session::get('education_level')["shortName"];

		$projects = Project::select($sessionDbPrefix.'.*', Session::get('department').'_supervisors.take_students_'.Session::get('education_level')["shortName"].'')->join(Session::get('department').'_supervisors', Session::get('department').'_projects_'.Session::get('education_level')["shortName"].'.supervisor_id', '=', Session::get('department').'_supervisors.id')->where(Session::get('department').'_supervisors.take_students_'.Session::get('education_level')["shortName"], true);

		$projects->where("status", "on-offer");

		// Title filter
		if(in_array("title", $filters)){
			$filteredAtLeastOnce = true;

			if(count($filters) == 1){
				$projects->where($sessionDbPrefix."."."title", "LIKE", '%'.$searchTerm.'%');
			} else {
				$projects->orWhere($sessionDbPrefix."."."title", "LIKE", '%'.$searchTerm.'%');
			}
		}

		// Skills filter
		if(in_array("skills", $filters)){
			$filteredAtLeastOnce = true;

			if(count($filters) == 1){
				$projects->where("skills", "LIKE", '%'.$searchTerm.'%');
			} else {
				$projects->orWhere("skills", "LIKE", '%'.$searchTerm.'%');
			}
		}

		// Description filter
		if(in_array("description", $filters)){
			$filteredAtLeastOnce = true;

			if(count($filters) == 1){
				$projects->where("description", "LIKE", '%'.$searchTerm.'%');
			} else {
				$projects->orWhere("description", "LIKE", ' %'.$searchTerm.'% ');
			}
		}

		$projects = $projects->get();
		if(in_array("topics", $filters)){
			$filteredAtLeastOnce = true;
			$filteredByTopics = true;

			$projects = $projects->filter(function($project, $key) use ($searchTerm){
				foreach($project->topics as $key => $topic){
					if(strcasecmp($topic->name, $searchTerm) == 0){
						return true;
					}
				}

				return false;
			});
		}

		if(!$filteredAtLeastOnce || count($projects) == 0){
			session()->flash("message", "We couldn't find anything for \"".$searchTerm."\".");
			session()->flash('message_type', 'warning');

			return redirect()->action('ProjectController@index');
		}

		if(count($projects) == 1){
			if($filteredByTopics){
				$project = $projects->first();
			} else {
				$project = $projects[0];
			}
			session()->flash('message', "We only found one project, it's this one.");

			return view('projects.project')->with('view', 'SupervisorProject')->with('project', $project);
		}

		if(count($projects) > 1){
			return view('projects.index')->with('projects', $projects)->with('view', 'search')->with('searchTerm', $searchTerm);
		}
	}
}
