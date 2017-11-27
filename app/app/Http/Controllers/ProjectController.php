<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use SussexProjects\ProjectTopicsUg;
use SussexProjects\ProjectTopicsMasters;
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
		// Hide if supervisor take students = 0
		// hide if not on offer
		// hide if archived

		//Check supervisor cookie if(cookie = "master side") only get master projects
		// if(Auth::user()->isUgSupervisor()){
		//     $projects = Project::all();
		//     // Project::whereNotNull('supervisor_id');
		//     // ->where('student_proposed_project', 0)
		//     // ->where('status', 'on-offer');
		// } else if {

		// }else if {
			
		// }else if {
			
		// }
		if(Session::get("db_type") == "ug"){
			$projects = ProjectUg::all();
		} else {
			$projects = ProjectMasters::all();
		}

		return view('projects.index')
		->with('projects', $projects)
		->with('view', 'index');
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

		DB::transaction(function ($request) use ($request) {
			// Creat project
			if(Session::get("db_type") == "ug"){
				$project = new ProjectUg;
				$transaction = new TransactionUg;
			} else {
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
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id) {
		$project = Session::get("db_type") == "ug" ? ProjectUg::where('id', $id)->first() : ProjectMasters::where('id', $id)->first();
		return view('projects.project', compact('project'));
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
		try {
			DB::Transaction(function($id) use ($id){
				if(Session::get("db_type") == "ug"){
					$project = ProjectUg::findOrFail($id);
					$transaction = new TransactionUg;
				} else {
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
		} catch(ModelNotFoundException $err){
			session()->flash('message', 'The project could not be created at this time.');
			session()->flash('message_type', 'danger');
			return redirect('/');
		}
	}
	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id) {
		try {
			DB::Transaction(function($id) use ($id){
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
				return 'true';
			});
		} catch(ModelNotFoundException $err){
			session()->flash('message', 'The project could not be deleted at this time.');
			session()->flash('message_type', 'danger');
		}

		return 'false';
	}

	public function byTopic($id) {
		if(Session::get("db_type") == "ug"){
			$topic = TopicUg::where('id', $id)->first();
			$projects = ProjectUg::
				join('project_topics_ug', 'project_topics_ug.project_id', '=', 'projects_ug.id')
				->where('project_topics_ug.topic_id', '=', $id)
				->where('projects_ug.status', '=', 'on-offer')
				->get();
		} else {
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
		} else {
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

	public function search() {
		$searchterm = Input::get('searchTerm');
		$sByTitle = isset($_GET['title']) ? true : false;
		$sByDesc = isset($_GET['description']) ? true : false;
		$sBySuprv = isset($_GET['supervisor']) ? true : false;
		$sByTopic = isset($_GET['topic']) ? true : false;

		// Get data
		$projects = Project::Search($searchterm, $sByTitle, $sByDesc, $sBySuprv, $sByTopic);

		
		// Redirect if we have results
		if (count($projects) === 1) {
			$project = $projects[0];
			session()->flash('message', 'We only found this project.');
			return view('projects.project');

		} else if (count($projects) > 1) {
			return view('projects.index')
			->with('results', $projects)->with('searchTerm', $searchterm);

		} else {
			session()->flash('message', 'We couldn\'t find anything for "' . $searchterm . '".');
			$projects = Project::all();
			return view('projects.index', compact('projects'));
		}
	}
}
