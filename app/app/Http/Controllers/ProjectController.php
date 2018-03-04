<?php
namespace SussexProjects\Http\Controllers;

use Stevebauman\Purify\Facades\Purify;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Flash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use SussexProjects\Project;
use SussexProjects\Topic;
use SussexProjects\ProjectTopic;
use SussexProjects\Student;
use SussexProjects\Transaction;
use SussexProjects\Supervisor;

/**
 * The project controller.
 *
 * Handles all functions related to projects.
 * 
*/
class ProjectController extends Controller{

	/**
	 * The HTML purifier configuration used for the project description.
	 *
	 * @see http://htmlpurifier.org/live/configdoc/plain.html HTML purifier configuration documentation.
	 * @see https://github.com/ezyang/htmlpurifier The Laravel implementation of HTML purifier.
	 * @var string[] ~HTML purifier configuration
	*/
	private $descriptionPurifyConfig = [
		'Core.CollectErrors' => true,
		'Attr.ID.HTML5' => true,
		'HTML.TargetBlank' => true,
		'HTML.ForbiddenElements' => 'h1,h2,h3,h4,h5,h6'
	];

	public function __construct(){
		$this->middleware('auth');
		$this->paginationCount = 25;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * SELECT CONDITIONS
	 * - Select if supervisor take_students is true
	 * - Select if on-offer
	 * - Select if NOT archived
	 * - select if NOT student proposed
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

		$projects = Project::where('status', 'on-offer')
		->whereNotNull('supervisor_id')->get();
			
		$filteredProjects = $projects->filter(function($project, $key) {
			if(!$project->supervisor->takeStudents()){
				return false;
			}
			return true;
		});

		
		if($request->query("page")){
			return view('projects.partials.full-project-table-row')
				->with('projects', $filteredProjects->paginate($this->paginationCount))
				->with('view', 'index');
		}

		return view('projects.index')
			->with('projects', $filteredProjects)
			->with('view', 'index');

	}

	/**
	 * Display the specified resource.
	 *
	 * @param \Illuminate\Http\Request $request
	 * @param  GUID  $guid
	 * 
	 * @return \Illuminate\Http\Response The project view
	 */
	public function show(Request $request, $guid) {
		$view = "SupervisorProject";
		$studentName = "a student";
		$project = Project::find($guid);

		if($project->status === "student-proposed"){
			$view = "StudentProject";
			if($project->student->share_name || Auth::user()->isSupervisor()){
				$studentName = $project->student->user->getFullName();
			}
		}

		if($request->query("preview") === "true"){
			return view('projects.partials.project-preview')
				->with('project', $project)
				->with('student_name', $studentName)
				->with('view', $view);
		}

		return view('projects.project')
			->with('project', $project)
			->with('student_name', $studentName)
			->with('view', $view);
	}


	/**
	 * Adds a topic to a project.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return string The newly added topic's name
	 */
	public function addTopic(Request $request){

		$result = DB::transaction(function() use ($request) {
			$topic = Topic::where('name', request('topic_name'))->first();
			$project = Project::findOrFail(request('project_id'));

			// If topic isn't in the relevant topic database, create a new one.
			if(count($topic) == 0){
				$topic = new Topic;
				$topic->name = request('topic_name');
				$topic->save();
			}

			// Validate data
			$projectTopic = new ProjectTopic;

			// the project has no other projects, so make it's first topic the primary topic
			$projectTopic->primary = count($project->topics) == 0;
			$projectTopic->topic_id = $topic->id;
			$projectTopic->project_id = $project->id;
			$projectTopic->save();

			return Topic::findOrFail($topic->id)->toJson();
		});

		return $result;
	}

	/**
	 * Removes a topic to a project.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function removeTopic(Request $request){
		$result = DB::transaction(function() use ($request) {
			$topic = Topic::findOrFail(request('topic_id'));
			$project = Project::findOrFail(request('project_id'));

			ProjectTopic::where('project_id', $project->id)
				->where('topic_id', $topic->id)
				->delete();
		});

		return $result;
	}

	/**
	 * Updates the projects primary topic
	 *
	 * @param  \Illuminate\Http\Request $request Contains new primary project ID
	 * @return \Illuminate\Http\Response
	 */
	public function updatePrimaryTopic(Request $request){
		$result = DB::transaction(function() use ($request) {
			$topic = Topic::findOrFail(request('topic_id'));
			$project = Project::findOrFail(request('project_id'));

			// Clear primary
			ProjectTopic::where('project_id', $project->id)->update(['primary' => 0]);

			// Set new primary project
			ProjectTopic::where('project_id', $project->id)
				->where('topic_id', $topic->id)
				->update(['primary' => 1]);
		});

		return $result;
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

		$result = DB::transaction(function() use ($request) {
			$project = new Project;
			$transaction = new Transaction;

			$clean_html = Purify::clean(request('description'), $this->descriptionPurifyConfig);

			$project->fill(array(
				'title' => request('title'),
				'description' => $clean_html,
				'status' => request('status'),
				'skills' => request('skills')
			));

			$project->supervisor_id = Auth::user()->supervisor->id;
			$project->save();

			$transaction->fill(array(
				'type' =>'project',
				'action' =>'created',
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
	 * @param  GUID  $guid
	 * @return \Illuminate\Http\Response
	 */
	public function edit($guid){
		$project = Project::findOrFail($guid);

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
			$project = Project::findOrFail($id);
			$transaction = new Transaction;

			$clean_html = Purify::clean(request('description'), $this->descriptionPurifyConfig);

			$project->update([
				'title' => request('title'),
				'description' => $clean_html,
				'status' => request('status'),
				'skills' => request('skills')
			]);

			$transaction->fill(array(
				'type' =>'project',
				'action' =>'updated',
				'project' => $project->id,
				'supervisor' => Auth::user()->supervisor->id,
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

		DB::Transaction(function() use ($id){
			$project = Project::findOrFail($id);
			$transaction = new Transaction;

			$transaction->fill(array(
				'type' =>'project',
				'action' =>'deleted',
				'project_id' => $id,
				'supervisor_id' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));

			$project->delete();
		});

		return true;
	}


	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function showTopics(){
		$topics = Topic::all();
		return view('projects.topics')->with('topics', $topics);
	}

	public function byTopic($id) {
		$topic = Topic::findOrFail($id);

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
		$projects = Project::where('supervisor_id', $supervisor->id)->get();

		return view('projects.index')
			->with('projects', $projects)
			->with('supervisor_name', $supervisor->user->getFullName())
			->with('view', 'supervisor');
	}

	public function transactions($id){
		$transactions = Transaction::where('project_id', $id)->orderBy('transaction_date', 'desc')->get();
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

	/**
	 * Searches through projects.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response Mixed object types
	 */
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


		// Title filter
		if(in_array("title", $filters)){
			$filteredAtLeastOnce = true;

			if(count($filters) == 1){
				$projects->where($sessionDbPrefix."title", "LIKE", '%'.$searchTerm.'%');
			} else {
				$projects->orWhere($sessionDbPrefix."title", "LIKE", '%'.$searchTerm.'%');
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
