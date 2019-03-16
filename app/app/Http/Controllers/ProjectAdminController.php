<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use SussexProjects\Mode;
use SussexProjects\Programme;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\Topic;
use SussexProjects\Transaction;
use SussexProjects\User;

/**
 * The admin controller.
 * Methods in this controller are used for project and system administrators.
 *
 * @see SussexProjects\User
 */
class ProjectAdminController extends Controller{

	public function __construct(){
		parent::__construct();
		$this->middleware('auth');
	}

	/**
	 * Administrator hub view.
	 * This is mainly used for mobile.
	 *
	 * @return \Illuminate\View\View
	 */
	public function index(){
		return view('admin.index');
	}


	/**
	 * The amend supervisor arrangements view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function amendSupervisorArrangementsView(){
		$supervisors = Supervisor::getAllSupervisorsQuery()->get();

		return view('admin.arrangements')->with('supervisors', $supervisors);
	}

	/**
	 * Amends supervisor arrangements.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\View\View
	 */
	public function amendSupervisorArrangements(Request $request){
		$supervisors = Supervisor::getAllSupervisorsQuery()->get();

		foreach($supervisors as $supervisor){
			$project_load = $request[$supervisor->id."_project_load"];
			$take_students = $request[$supervisor->id."_take_students"];

			if($project_load != null){
				$supervisor->setProjectLoad($project_load);
			} else {
				$supervisor->setProjectLoad(0);
			}
			$supervisor->setTakingStudents(isset($take_students) ? 1 : 0);
		}

		session()->flash('message', 'Supervisor arrangements have been updated successfully');
		session()->flash('message_type', 'success');

		return view('admin.arrangements')->with('supervisors', $supervisors);
	}

	/**
	 * The amend topics view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function amendTopicsView(){
		$topics = Topic::all();

		return view('admin.amend-topics')->with('topics', $topics);
	}

	/**
	 * The amend programmes view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function amendProgrammesView(){
		$programmes = Programme::all();

		return view('admin.amend-programmes')->with('programmes', $programmes);
	}

	/**
	 * The log-in as another user view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function loginAsView(){
		$student = new Student;
		$user = new User;

		$supervisors = Supervisor::getAllSupervisorsQuery()
					->get();

		$students = Student::select($student->getTable().'.*')
				->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
				->orderBy('last_name', 'asc')
				->get();

		$staffUsers = User::where('privileges', 'staff')
				->orderBy('last_name', 'asc')
				->get();

		return view('admin.login-as')
			->with('supervisors', $supervisors)
			->with('staffUsers', $staffUsers)
			->with('students', $students);
	}

	/**
	 * Log-in the currently authenticated user as another user.
	 *
	 * @param string $id User ID
	 *
	 * @return \Illuminate\View\View
	 */
	public function loginAs($id){
		$userToLoginAs = User::findOrFail($id);

		if($userToLoginAs->isSystemAdmin() || $userToLoginAs->isProjectAdmin()){
			session()->flash('message', 'You may not log in as an administrator.');
			session()->flash('message_type', 'error');

			return redirect()->action('ProjectAdminController@loginAsView');
		}

		Auth::login($userToLoginAs);

		// Redirect
		session()->flash('message', 'You have logged in as '.$userToLoginAs->getFullName());
		session()->flash('message_type', 'success');
		Session::put('logged_in_as', true);

		return redirect()->action('HomeController@index');
	}

	/**
	 * The end of year archive view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function archiveView(){
		$mostPopularProject = Project::whereNull('student_id')
			->limit(1)
			->orderBy('view_count', 'desc')
			->first();

		return view('admin.archive')->with('mostPopularProject', $mostPopularProject);
	}

	/**
	 * Runs the end of year archive script
	 * - Adds This student was undertaken by [STUDENT NAME]” to project description.
	 * - Set all projects status to archived.
	 * - Empty the student tables.
	 * - Empty the transaction tables.
	 * - Remove all students from the user table.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function archive(){
		DB::transaction(function(){
			$projects = Project::all();
			$studentsToDelete = Student::all();

			// Archive all projects
			foreach($projects as $project){
				if($project->getAcceptedStudent() != null){
					$project->description = $project->description." (++ In ".Mode::getProjectYear()." this project was viewed ".$project->view_count." times and undertaken by ".$project->getAcceptedStudent()->user->getFullName()." ++)";
				} else {
					$project->description = $project->description." (++ In ".Mode::getProjectYear()." this project was viewed ".$project->view_count." times. ++)";
				}
				
				if($project->status == 'student-proposed'){
					$project->delete();
				}

				$project->status = 'archived';
				$project->save();
			}

			// Empty the students table
			foreach ($studentsToDelete as $student) {
				User::destroy($student->id);
			}

			// Empty the transaction table
			$transaction = new Transaction();
			DB::table($transaction->getTable())->delete();
		});

		return response()->json(array('successful' => true));
	}

	/**
	 * The manual assign second marker view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\View\View
	 */
	public function manualSecondMarkerView(Request $request){
		$student = new Student;
		$user = new User;

		$supervisors = Supervisor::getAllSupervisorsQuery()->get();
		$students = Student::select($student->getTable().'.*')
				->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
				->orderBy('last_name', 'asc')
				->get();

		return view('admin.assign-marker-manual')
			->with('supervisors', $supervisors)
			->with('students', $students);
	}

	/**
	 * The automatic (Algorithmic) assign second marker view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function computeSecondMarkerView(){
		return view('admin.assign-marker-automatic');
	}

	/**
	 * The actual action of assigning second markers to students.
	 *
	 * @return \Illuminate\Http\Response A HTML report of assigned markers
	 */
	public function calculateSecondMarkers(Request $request){
		$maxStudentsPerSupervisor = PHP_INT_MAX;

		if(!empty($request->max_students_per_supervisor)){
			$maxStudentsPerSupervisor = max(1, $request->max_students_per_supervisor);
		}

		if(Student::count() > (Supervisor::getAllSupervisorsQuery()
				->where('project_load_'.Session::get('education_level')["shortName"], '>', 0)
				->count() * $maxStudentsPerSupervisor)){
			
			return response()->json(array(
				'successful' => false,
				'message' => "Please increase the maximum students per supervisor."
			));
		}


		DB::transaction(function () use ($maxStudentsPerSupervisor) {
			$projectTable = new Project;

			// Reset every project's second marker
			DB::table($projectTable->getTable())->update(array(
				'marker_id' => null
			));

			// Assign students taking lazy score in to consideration
			while(ProjectController::getAccetpedProjectWithoutSecondMarker() != null){
				// Get the project
				$projectToAssign = ProjectController::getAccetpedProjectWithoutSecondMarker();

				// Recalculate scores
				$supervisorsWithLazyScore = $this->getSupervisorsWithLazyScore(false, $maxStudentsPerSupervisor, $projectToAssign->id);
				
				// Get the laziest supervisor
				$laziestSupervisor = $supervisorsWithLazyScore->sortByDesc('lazy_score')->first();

				$projectToAssign->marker_id = $laziestSupervisor->id;
				$projectToAssign->save();
			}
		});

		return redirect()->action('ProjectAdminController@secondMarkerReport');
	}

	/**
	 * Returns all the supervisors with a lazy score associated to them.
	 *
	 * @return \app\app\Supervisor
	 */
	private function getSupervisorsWithLazyScore($isSetupView, $maxStudentsPerSupervisor, $supervisorToIgnoreId){
		$supervisors = Supervisor::getAllSupervisorsQuery()
				->where('project_load_'.Session::get('education_level')["shortName"], '>', 0)
				->get();

		// Set up the numbers
		foreach($supervisors as $supervisor){
			if($isSetupView) {
				$supervisor->second_supervising_count = 0;
			} else if($supervisor == $supervisorToIgnoreId) {
				$supervisor->second_supervising_count = PHP_INT_MAX;
			} else {
				$supervisor->second_supervising_count = count($supervisor->getSecondMarkingProjects());
			}

			$supervisor->accepted_student_count = count($supervisor->getAcceptedStudents());
		}

		$supervisors = $supervisors->filter(function ($supervisor) use ($maxStudentsPerSupervisor) {	
			return $supervisor->second_supervising_count < $maxStudentsPerSupervisor;
		});

		foreach($supervisors as $supervisor){

			$loadMinusStudentCount = $supervisors->sum('project_load_'.Session::get('education_level')["shortName"]) - Student::count();
			$slack = floor($loadMinusStudentCount / max(1 ,$supervisors->where('second_supervising_count', 0)->count()));

			$supervisor->project_load = $supervisor->getProjectLoad();
			$supervisor->target_load = ($supervisor->project_load * 2) - $supervisor->accepted_student_count;

			// Determine lazy score
			$supervisor->lazy_score = $supervisor->target_load - $supervisor->second_supervising_count - $slack;
		}

		return $supervisors;
	}

	/**
	 * An overview of each supervisor and which students they are second marker to.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function secondMarkerReport(){
		$supervisors = Supervisor::getAllSupervisorsQuery()->get();

		$view = view('admin.partials.second-supervisor-assignment-report-table')
			->with('supervisors', $supervisors);

		return response()->json(array(
			'successful' => true,
			'html' => json_encode($view->render())
		));
	}

	/**
	 * An overview of each automatically assigned second marker.
	 *
	 * @return \Illuminate\Http\Response

	 */
	public function assignSecondMarkerAutomaticTable(){
		$supervisorsWithLazyScore = $this->getSupervisorsWithLazyScore(true, PHP_INT_MAX, "");
		$view = view('admin.partials.automatic-marker-assignment-table')
			->with('supervisors', $supervisorsWithLazyScore);

		return response()->json(array(
			'successful' => true,
			'html' => $view->render()
		));
	}

	/**
	 * The swap second marker view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function swapSecondMarkerView(){
		$projects = Project::whereNotNull('marker_id')->get();

		return view('admin.swap-marker')->with('projects', $projects);
	}

	/**
	 * Swap project A's and project B's second markers.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function swapSecondMarker(Request $request){
		try {
			$projectA = Project::findOrFail($request->projectA);
			$projectB = Project::findOrFail($request->projectB);
		} catch(ModelNotFoundException $e) {
			return response()->json(array('successful' => false));
		}

		$MarkerA = $projectA->marker_id;
		$MarkerB = $projectB->marker_id;

		$projectA->marker_id = $MarkerB;
		$projectB->marker_id = $MarkerA;

		$projectA->save();
		$projectB->save();

		return response()->json(array('successful' => true));
	}

	/**
	 * The export second marker data view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function exportSecondMarkerDataView(){
		return view('admin.export-marker');
	}

	/**
	 * Exports the second marker data to either JSON or CSV.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response The second marker data.
	 */
	public function exportSecondMarkerData(Request $request){
		if(!($request->type == "json" || $request->type == "csv")) {
			abort(400);
		}

		$projects = Project::whereNotNull('marker_id')->get();
		$results = array();

		foreach($projects as $project){
			$ar = array();
			
			$ar["projectTitle"] = $project->title;

			// This should never happen but you never know
			if($project->student != null){
				$ar["studentName"] = $project->student->user->getFullName();
			} else {
				$ar["studentName"] = "-";
			}

			$ar["supervisorName"] = $project->supervisor->user->getFullName();
			$ar["markerName"] = $project->marker->user->getFullName();

			array_push($results, $ar);
		}

		$tempFileName = tempnam(sys_get_temp_dir(), 'SecondMarkerData');
		$file = fopen($tempFileName, 'w');

		if($request->type == "json"){
			fwrite($file, json_encode($results, JSON_PRETTY_PRINT));
		} else if($request->type == "csv") {
			fputcsv($file, array(
				'Project Title', 'Student', 'Supervisor', 'Second Marker'
			));

			foreach($results as $result){
				fputcsv($file, $result);
			}
		}

		fclose($file);

		header('Content-Description: File Transfer');

		if($request->type == "json"){
			header('Content-Type: application/json');
		} else {
			header('Content-Type: text/csv');
		}

		header('Content-Disposition: attachment; filename=SecondMarkerData.'.$request->type.'');
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($tempFileName));

		ob_clean();
		flush();
		readfile($tempFileName);
		unlink($tempFileName);

		return;
	}
}
