<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Flash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use SussexProjects\TopicUg;
use SussexProjects\TopicMasters;
use SussexProjects\Project;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectTopicUg;
use SussexProjects\ProjectTopicMasters;
use SussexProjects\ProjectMasters;
use SussexProjects\StudentUg;
use SussexProjects\StudentMasters;
use SussexProjects\TransactionUg;
use SussexProjects\TransactionMasters;
use SussexProjects\Supervisor;
use SussexProjects\Jobs\ProcessDeleteProject;

class ProjectController extends Controller{

	public function __construct(){
		$this->middleware('auth');
		$this->paginationCount = 25;
		$this->restoreTimeInMinutes = 1;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request){
		/* SELECT CONDITIONS
			Select if supervisor take_students is true
			Select if on-offer
			Select if NOT archived
			select if NOT student proposed
		*/

		if(Session::get("db_type") == "ug"){
			$projects = ProjectUg::
				select('projects_ug.*', 'supervisors.take_students_ug')
				->join('supervisors', 'projects_ug.supervisor_id', '=', 'supervisors.id')
				->where('supervisors.take_students_ug', true);
		} elseif(Session::get("db_type") == "masters") {
			$projects = ProjectMasters::
				select('projects_masters.*', 'supervisors.take_students_masters')
				->join('supervisors', 'projects_masters.supervisor_id', '=', 'supervisors.id')
				->where('supervisors.take_students_masters', true);
		}

		$projects->whereNotNull('supervisor_id')
			->where('status', 'on-offer')
			->where('student_proposed_project', 0);

		if($request->query("page")){
			return view('projects.partials.full-project-table-row')
				->with('projects', $projects->paginate($this->paginationCount))
				->with('view', 'index');
		}

		return view('projects.index')
			->with('projects', $projects->paginate($this->paginationCount))
			->with('view', 'index');

	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show(Request $request, $id) {

		$view = "SupervisorProject";
		$student_name = "a student";

		if(Session::get("db_type") == "ug"){
			$project = ProjectUg::find($id);
		} elseif(Session::get("db_type") == "masters") {
			$project = ProjectMasters::find($id);
		}

		if($project->student_proposed_project){
			$view = "StudentProject";
			if($project->student->share_project || Auth::user()->isSupervisor()){
				$student_name = $project->student->user->getFullName();
			}
		}

		if($request->query("preview") == "true"){
			return view('projects.partials.project-preview')
				->with('project', $project)
				->with('student_name', $student_name)
				->with('view', $view);
		}

		return view('projects.project')
			->with('project', $project)
			->with('student_name', $student_name)
			->with('view', $view);
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
	 * Adds a topic to a project.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return string topic name
	 */
	public function addTopic(Request $request){

		$result = DB::transaction(function() use ($request) {
			if(Session::get("db_type") == "ug"){
				$topic = TopicUg::where('name', request('topic_name'))->first();
				$project = ProjectUg::findOrFail(request('project_id'));
			} else {
				$topic = TopicMasters::where('name', request('topic_name'))->first();
				$project = ProjectMasters::findOrFail(request('project_id'));
			}

			// If topic isn't in the relevant topic database, create a new one.
			if(count($topic) == 0){
				$topic = Session::get("db_type") == "ug" ? new TopicUg : new TopicMasters;
				$topic->name = request('topic_name');
				$topic->save();
			}

			// Validate data
			$projectTopic = Session::get("db_type") == "ug" ? new ProjectTopicUg : new ProjectTopicMasters;

			// the project has no other projects, so make it's first topic the primary topic
			$projectTopic->primary = count($project->topics) == 0;
			$projectTopic->topic_id = $topic->id;
			$projectTopic->project_id = $project->id;
			$projectTopic->save();

			if(Session::get("db_type") == "ug"){
				return TopicUg::findOrFail($topic->id)->toJson();
			} else {
				return TopicMasters::findOrFail($topic->id)->toJson();
			}
		});

		return $result;
	}

	/**
	 * Removes a topic from a project.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return string topic name
	 */
	public function removeTopic(Request $request){

		$result = DB::transaction(function() use ($request) {
			if(Session::get("db_type") == "ug"){
				$topic = TopicUg::findOrFail(request('topic_id'));
				$project = ProjectUg::findOrFail(request('project_id'));

				ProjectTopicUg::where('project_id', $project->id)
					->where('topic_id', $topic->id)
					->delete();
			} else {
				$topic = TopicMasters::findOrFail(request('topic_id'));
				$project = ProjectMasters::findOrFail(request('project_id'));

				ProjectTopicMasters::where('project_id', $project->id)
					->where('topic_id', $topic->id)
					->delete();
			}
		});

		return $result;
	}

	public function updatePrimaryTopic(Request $request){

		$result = DB::transaction(function() use ($request) {
			if(Session::get("db_type") == "ug"){
				$topic = TopicUg::findOrFail(request('topic_id'));
				$project = ProjectUg::findOrFail(request('project_id'));

				// Clear primary
				ProjectTopicUg::where('project_id', $project->id)->update(['primary' => 0]);

				// Set new primary project
				ProjectTopicUg::where('project_id', $project->id)
					->where('topic_id', $topic->id)
					->update(['primary' => 1]);

			} else {
				$topic = TopicMasters::where('id', request('topic_id'))->first();
				$project = ProjectMasters::where('id', request('project_id'))->first();

				ProjectTopicMasters::
					where('project_id', $project->id)
					->where('topic_id', $topic->id)
					->delete();
			}
		});

		return $result;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request) {
		// Validate data
		// Move to validation form
		$this->validate(request(), [
			'title'       => 'required|max:255',
			'description' => 'required|max:16777215',
			'skills' => 'required|max:255',
			'status' => 'required',
		]);

		$result = DB::transaction(function() use ($request) {
			// Creat project
			if(Session::get("db_type") == "ug"){
				$project = new ProjectUg;
				$transaction = new TransactionUg;
			} elseif(Session::get("db_type") == "masters") {
				$project = new ProjectMasters;
				$transaction = new TransactionMasters;
			}

			$project->fill(array(
				'title' => request('title'),
				'description' => request('description'),
				'status' => request('status'),
				'skills' => request('skills')
			));

			$project->author_programme = 'Computer Science';
			$project->supervisor_id = Auth::user()->supervisor->id;
			$project->save();

			$transaction->fill(array(
				'transaction_type' =>'created',
				'project_id' => $project->id,
				'supervisor_id' => Auth::user()->supervisor->id,
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
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id){
		$project = Session::get("db_type") == "ug" ? ProjectUg::findOrFail($id) : ProjectMasters::findOrFail($id);
		if($project->isOwnedByUser()){
			return view('projects.edit')
			->with('project', $project);
		} else {
			return redirect()->action('ProjectController@show', $project);
		}
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update($id) {
		// todo: add form validation
		$result = DB::Transaction(function() use ($id){
			if(Session::get("db_type") == "ug"){
				$project = ProjectUg::findOrFail($id);
				$transaction = new TransactionUg;
			} elseif(Session::get("db_type") == "masters") {
				$project = ProjectMasters::findOrFail($id);
				$transaction = new TransactionMasters;
			}
			$project->update(request(['title', 'description', 'skills', 'status']));
			$transaction->fill(array(
				'transaction_type' =>'updated',
				'project_id' => $project->id,
				'supervisor_id' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();
			session()->flash('message', '"'.$project->title.'" has been updated.');
			session()->flash('message_type', 'success');
			return redirect()->action('ProjectController@show', $project);
		});

		return $result;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id) {

		$softDeletedproject = DB::Transaction(function() use ($id){
			$deleteTime = Carbon::now()->addMinutes($this->restoreTimeInMinutes);

			if(Session::get("db_type") == "ug"){
				$project = ProjectUg::findOrFail($id);
				// $transaction = new TransactionUg;
			} else {
				$project = ProjectMasters::findOrFail($id);
				// $transaction = new TransactionMasters;
			}

			// $transaction->fill(array(
			// 	'transaction_type' =>'deleted',
			// 	'project_id' => $id,
			// 	'supervisor_id' => Auth::user()->supervisor->id,
			// 	'transaction_date' => new Carbon
			// ));

			// ProcessDeleteProject::dispatch($project, $transaction)->delay($deleteTime);
			ProcessDeleteProject::dispatch($project, null)->delay($deleteTime);

			// This is a soft delete
			$project->destroy_at = $deleteTime;
			$project->save();
			$project->delete();
			return $project;
		});

		return view('supervisors.partials.restore-project-row')->with('project', $softDeletedproject);
	}

	/**
	 * Restore the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function restore($id) {

		$restoredProject = DB::Transaction(function() use ($id){
			if(Session::get("db_type") == "ug"){
				$project = ProjectUg::withTrashed()->where('id', $id)->first();
			} else {
				$project = ProjectMasters::withTrashed()->where('id', $id)->first();
			}

			$project->restore();
			return $project;
		});

		return view('supervisors.partials.project-row')->with('project', $restoredProject);
	}


	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function showTopics(){
		if(Session::get("db_type") == "ug"){
			$topics = TopicUg::all();
		} elseif(Session::get("db_type") == "masters") {
			$topics = TopicMasters::all();
		}

		return view('projects.topics')->with('topics', $topics);
	}

	public function byTopic($id) {
		if(Session::get("db_type") == "ug"){
			$topic = TopicUg::findOrFail($id);

		} elseif(Session::get("db_type") == "masters") {
			$topic = TopicMasters::findOrFail($id);
		}

		return view('projects.index')
			->with('projects', $topic->projects->where('status', 'on-offer'))
			->with('topic', $topic)
			->with('view', 'topic');
	}

	/**
	 * Display the projects with by supervisors.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function bySupervisor($id) {
		$supervisor = Supervisor::findOrFail($id);

		if(Session::get("db_type") == "ug"){
			$projects = ProjectUg::where('supervisor_id', $supervisor->id)->get();
		} elseif(Session::get("db_type") == "masters") {
			$projects = ProjectMasters::where('supervisor_id', $supervisor->id)->get();
		}
		return view('projects.index')
			->with('projects', $projects)
			->with('supervisor_name', $supervisor->user->getFullName())
			->with('view', 'supervisor');
	}

	public function transactions($id){
		if(Session::get("db_type") == "ug"){
			$transactions = TransactionUg::where('project_id', $id)->orderBy('transaction_date', 'desc')->get();
		} elseif(Session::get("db_type") == "masters") {
			$transactions = TransactionMasters::where('project_id', $id)->orderBy('transaction_date', 'desc')->get();
		}

		return view('admin.transactions')->with('transactions', $transactions);
	}

	/**
	 * Displays all supervisors with projects on offer.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function showSupervisors() {
		$supervisor = Supervisor::all();
		return view('projects.supervisors')->with('supervisors', $supervisor);
	}

	public function search(Request $request) {

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
			return redirect('/projects');
		}

		foreach ($filters as $selected) {
			if ($selected !== end($filters)){
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

		if(Session::get("db_type") == "ug"){
			$sessionDbPrefix = "projects_ug.";
			$projects = ProjectUg::select('projects_ug.*', 'supervisors.take_students_ug')
								->join('supervisors', 'projects_ug.supervisor_id', '=', 'supervisors.id')
								->where('supervisors.take_students_ug', true);
		} elseif(Session::get("db_type") == "masters") {
			$sessionDbPrefix = "projects_masters.";
			$projects = ProjectMasters::select('projects_masters.*', 'supervisors.take_students_masters')
									->join('supervisors', 'projects_masters.supervisor_id', '=', 'supervisors.id')
									->where('supervisors.take_students_masters', true);
		}

		if(in_array("title", $filters)){
			$filteredAtLeastOnce = true;

			if(count($filters) == 1){
				$projects->where($sessionDbPrefix."title", "LIKE", '%'.$searchTerm.'%');
			} else {
				$projects->orWhere($sessionDbPrefix."title", "LIKE", '%'.$searchTerm.'%');
			}
		}

		if(in_array("skills", $filters)){
			$filteredAtLeastOnce = true;

			if(count($filters) == 1){
				$projects->where("skills", "LIKE", '%'.$searchTerm.'%');
			} else {
				$projects->orWhere("skills", "LIKE", '%'.$searchTerm.'%');
			}
		}

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

			$projects = $projects->filter(function($loopProject, $key) use ($searchTerm) {
				foreach ($loopProject->topics as $key => $topic) {
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
			return redirect('/projects');
		}

		if (count($projects) == 1) {
			if($filteredByTopics){
				$project = $projects->first();
			} else {
				$project = $projects[0];
			}
			session()->flash('message', "We only found one project, it's this one.");

			return view('projects.project')
				->with('view', 'SupervisorProject')
				->with('project', $project);

		}

		if (count($projects) > 1) {
			return view('projects.index')
				->with('projects', $projects)
				->with('view', 'search')
				->with('searchTerm', $searchTerm);
		}
	}
}
