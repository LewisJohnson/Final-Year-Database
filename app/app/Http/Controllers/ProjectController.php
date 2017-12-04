<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use SussexProjects\ProjectTopicUg;
use SussexProjects\ProjectTopicMasters;
use SussexProjects\Project;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectMasters;
use SussexProjects\TopicUg;
use SussexProjects\TopicMasters;
use SussexProjects\TransactionUg;
use SussexProjects\TransactionMasters;
use SussexProjects\Supervisor;
use Flash;
use Illuminate\Support\Facades\Log;
use Session;
use DB;

class ProjectController extends Controller{

	public function __construct(){ 
		$this->middleware('auth'); 
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(){
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

		} else {
			$projects = ProjectMasters::
			select('projects_masters.*', 'supervisors.take_students_masters')
			->join('supervisors.take_students_masters', 'projects_ug.supervisor_id', '=', 'supervisors.id')
			->where('supervisors.take_students_masters', true);
		}

		$projects->
			whereNotNull('supervisor_id')
			->where('status', 'on-offer')
			->where('student_proposed_project', 0);

		return view('projects.index')
		->with('projects', $projects->get())
		->with('view', 'index');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id) {
		$project = Session::get("db_type") == "ug" ? ProjectUg::where('id', $id)->first() : ProjectMasters::where('id', $id)->first();

		$view = "SupervisorProject";
		$student_name = "a student";

		if($project->student_proposed_project){
			$view = "StudentProject";

			//todo: Show name if user is supervisor or admin
			if($project->student->share_project){
				$student_name = $project->student->user->getFullName();
			}
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
		//todo: make sure user is authorized to perform this action
		$result = DB::transaction(function ($request) use ($request) {
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
		//todo: make sure user is authorized to perform this action

		$result = DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				$topic = TopicUg::find(request('topic_id'));
				$project = ProjectUg::find(request('project_id'));

				ProjectTopicUg::where('project_id', $project->id)
					->where('topic_id', $topic->id)
					->delete();
			} else {
				$topic = TopicMasters::find(request('topic_id'));
				$project = ProjectMasters::find(request('project_id'));

				ProjectTopicMasters::where('project_id', $project->id)
					->where('topic_id', $topic->id)
					->delete();
			}
		});

		return $result;
	}

	public function updatePrimaryTopic(Request $request){
		//todo: make sure user is authorized to perform this action

		$result = DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				$topic = TopicUg::find(request('topic_id'));
				$project = ProjectUg::find(request('project_id'));

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

		if(Auth::user()->supervisor == null){
			Log::error('Someone who is not a supervsior tried to create a project.');
		}

		$result = DB::transaction(function ($request) use ($request) {
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
				'skills' => request('skills'),
				'start_date' => new Carbon
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
		$project = Session::get("db_type") == "ug" ? ProjectUg::where('id', $id)->first() : ProjectMasters::where('id', $id)->first();
		return view('projects.edit', compact('project'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update($id) {
		// todo: add form validation
		// create transaction
		$result = DB::Transaction(function($id) use ($id){
			if(Session::get("db_type") == "ug"){
				$project = ProjectUg::findOrFail($id);
				$transaction = new TransactionUg;
			} elseif(Session::get("db_type") == "masters") {
				$project = ProjectMasters::findOrFail($id);
				$transaction = new TransactionMasters;
			}

			$project->update(request(['title', 'description', 'skills']));
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
		$result = DB::Transaction(function($id) use ($id){
			if(Session::get("db_type") == "ug"){
				$transaction = new TransactionUg;
				$project = ProjectUg::findOrFail($id);
				$title = $project->title;
				ProjectUg::destroy($id);
			} else {
				$project = ProjectMasters::findOrFail($id);
				$transaction = new TransactionMasters;
				$title = $project->title;
				ProjectMasters::destroy($id);
			}
			
			$transaction->fill(array(
				'transaction_type' =>'deleted',
				'project_id' => $id,
				'supervisor_id' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();
			session()->flash('message', '"'.$title.'" has been deleted.');
			session()->flash('message_type', 'danger');
		});

		return $result;
	}

	/**
	 * Display the projects with by supervisors.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function byTopic($id) {
		if(Session::get("db_type") == "ug"){
			$topic = TopicUg::where('id', $id)->first();
			$projects = ProjectUg::
				join('project_topics_ug', 'project_topics_ug.project_id', '=', 'projects_ug.id')
				->where('project_topics_ug.topic_id', '=', $id)
				->where('projects_ug.status', '=', 'on-offer')
				->get();
		} elseif(Session::get("db_type") == "masters") {
			$topic = TopicMasters::where('id', $id)->first();
			$projects = ProjectMasters::
				join('project_topics_masters', 'project_topics_masters.project_id', '=', 'projects_masters.id')
				->where('project_topics_masters.topic_id', '=', $id)
				->where('projects_masters.status', '=', 'on-offer')
				->get();
		}
		return view('projects.index')
			->with('projects', $projects)
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
		$supervisor = Supervisor::where('id', $id)->first();

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

	/**
	 * Displays all supervisors with projects on offer.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function supervisors() {
		$supervisor = Supervisor::all();
		return view('projects.supervisors')->with('supervisors', $supervisor);
	}

	public function search(Request $request) {
		$searchterm = request("searchTerm");
		// $sBySuprv = isset($_GET['supervisor']) ? true : false;
		// $sByTopic = isset($_GET['topic']) ? true : false;

		if(Session::get("db_type") == "ug"){
			$project_db = "projects_ug.";
			$projects = ProjectUg::
			select('projects_ug.*', 'supervisors.take_students_ug')
			->join('supervisors', 'projects_ug.supervisor_id', '=', 'supervisors.id')
			->where('supervisors.take_students_ug', true);
		} elseif(Session::get("db_type") == "masters") {
			$project_db = "projects_masters.";
			$projects = ProjectMasters::
			select('projects_masters.*', 'supervisors.take_students_masters')
			->join('supervisors.take_students_masters', 'projects_ug.supervisor_id', '=', 'supervisors.id')
			->where('supervisors.take_students_masters', true);
		}

		if(isset($_POST['title'])){
			$projects->where($project_db."title", "LIKE", '%'.$searchterm.'%');
		}

		if(isset($_POST['skills'])){
			$projects->orWhere("skills", "LIKE", '%'.$searchterm.'%');
		}

		if(isset($_POST['description'])){
			$projects->orWhere("description", "LIKE", '%'.$searchterm.'%');
		}

		// if($supervisor){
		// 	// $query->orWhere("supervisor", "LIKE",'%'.$searchterm.'%');
		// }

		// Send Query to DB
		$projects = $projects->get();

		if (count($projects) === 1) {
			$project = $projects[0];
			session()->flash('message', 'We only found this project.');

			return view('projects.project')
				->with('project', $project);

		} else if (count($projects) > 1) {
			return view('projects.index')
				->with('projects', $projects)
				->with('view', 'search')
				->with('searchTerm', $searchterm);

		} else {
			session()->flash('message', 'We couldn\'t find anything for "' . $searchterm . '".');
			return $this->index();
		}
	}
}
