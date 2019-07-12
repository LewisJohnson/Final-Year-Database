<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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

		$staffUsers = User::where('privileges', 'LIKE', '%staff%')
				->orderBy('last_name', 'asc')
				->get();
		$externalMarkers = User::where('privileges', 'LIKE', '%external_marker%')
				->orderBy('last_name', 'asc')
				->get();

		$noPrivilegesUsers = User::whereNull('privileges')
				->orderBy('last_name', 'asc')
				->get();

		return view('admin.login-as')
			->with('supervisors', $supervisors)
			->with('staffUsers', $staffUsers)
			->with('students', $students)
			->with('externalMarkers', $externalMarkers)
			->with('noPrivilegesUsers', $noPrivilegesUsers);
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
	 * PROJECTS:
	 * - Adds This student was undertaken by [STUDENT NAME]” to project description.
	 * - Set all projects status to archived.
	 * - Remove student-proposed projects which haven't been accepted.
	 * 
	 * STUDENTS:
	 * - Remove students without projects
	 * - Remove students with a project and finalised project evaluation.
	 * 
	 * OTHER:
	 * - Empty the transaction tables.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function archive(Request $request){

		if(!empty($request->project_year)){
			if($request->project_year != Mode::getProjectYear()){
				$this::prevYearArchive($request->project_year);
			}
		}

		DB::transaction(function(){
			$projects = Project::all();
			$studentsToDelete = Student::all();

			// Archive all projects
			foreach($projects as $project){
				if($project->getAcceptedStudent() != null){
					$project->description = $project->description." (++ In ".Mode::getFriendlyProjectYear()." this project was viewed ".$project->view_count." times and undertaken by ".$project->getAcceptedStudent()->user->getFullName()." ++)";
				} else {
					$project->description = $project->description." (++ In ".Mode::getFriendlyProjectYear()." this project was viewed ".$project->view_count." times. ++)";
				}
				
				// Removed 
				if($project->getAcceptedStudent() == null && $project->status == 'student-proposed'){
					$project->delete();
				}

				$project->status = 'archived';
				$project->save();
			}

			// Empty the students table
			foreach ($studentsToDelete as $student) {
				if(empty($student->project)){
					User::destroy($student->id);
				} else if(empty($student->project->evaluation)){
					User::destroy($student->id);
				} else if($student->project->evaluation->is_finalised){
					User::destroy($student->id);
				}
			}

			// Empty the transaction table
			$transaction = new Transaction();
			DB::table($transaction->getTable())->delete();
		});

		return response()->json(array('successful' => true));
	}

	public function prevYearArchive($year){

		DB::transaction(function() use ($year){
			$projects = Project::all();
			
			$userTable = (new User())->getTable();
			$studentTable = (new Student())->getTable();

			$studentsToDelete = Student::select($studentTable.'.*')
				->join($userTable.' as user', 'user.id', '=', $studentTable.'.id')
				->where('user.active_year', $year)
				->orderBy('last_name', 'asc')
				->get();

			// Empty the students table
			foreach ($studentsToDelete as $student) {
				User::destroy($student->id);
			}

			Mode::where('project_year', $year)->delete();
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
				->where('user.active_year', Mode::getProjectYear())
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

		if(ProjectController::getAcceptedProjectCount() > (Supervisor::getAllSupervisorsQuery()
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
			while(ProjectController::getAcceptedProjectWithoutSecondMarker() != null){
				// Get the project
				$projectToAssign = ProjectController::getAcceptedProjectWithoutSecondMarker();

				// Recalculate scores
				$supervisorsWithLazyScore = $this->getSupervisorsWithLazyScore(false, $maxStudentsPerSupervisor, $projectToAssign->supervisor_id);
				
				// Get the laziest supervisor
				$laziestSupervisor = $supervisorsWithLazyScore->sortByDesc('lazy_score')->first();

				$projectToAssign->marker_id = $laziestSupervisor->id;
				$projectToAssign->save();

				$transaction = new Transaction;
				$transaction->fill(array(
					'type' => 'marker',
					'action' => 'marker-assigned',
					'project' => $projectToAssign->id,
					'student' => $projectToAssign->getAcceptedStudent()->id,
					'supervisor' => $projectToAssign->supervisor_id,
					'marker' => $projectToAssign->marker_id,
					'admin' => Auth::user()->id,
					'transaction_date' => new Carbon
				));

				$transaction->save();
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
		foreach($supervisors as $key => $supervisor){

			if($supervisor->id == $supervisorToIgnoreId){
				unset($supervisors[$key]);
			}

			if($isSetupView) {
				$supervisor->second_supervising_count = 0;
			} else {
				$supervisor->second_supervising_count = count($supervisor->getSecondMarkingProjects());
			}

			$supervisor->accepted_student_count = count($supervisor->getAcceptedStudents());
		}

		if(count($supervisors) > 1){
			$supervisors = $supervisors->filter(function ($supervisor) use ($maxStudentsPerSupervisor) {	
				return $supervisor->second_supervising_count < $maxStudentsPerSupervisor;
			});
		}

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
	public function automaticSecondMarkerPreview(){
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
		$projects = Project::whereNotNull('marker_id')
				->where('status', '<>' , 'archived')
				->get();

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
		$projects = Project::whereNotNull('marker_id')->get();
		$results = array();

		foreach($projects as $project){
			$ar = array();
			
			// This should never happen but you never know
			if($project->getAcceptedStudent() != null){
				$ar["fName"] = $project->getAcceptedStudent()->user->first_name;
				$ar["lName"] = $project->getAcceptedStudent()->user->last_name;
			} else {
				$ar["fName"] = '-';
				$ar["lName"] = '-';
			}

			$ar["projectTitle"] = $project->title;
			$ar["supervisorName"] = $project->supervisor->user->getFullName();
			$ar["markerName"] = $project->marker->user->getFullName();

			array_push($results, $ar);
		}

		$filepath = "../storage/app/SecondMarkerData.csv";
		$file = fopen($filepath, 'w');

		fputcsv($file, array(
			'First Name', 'Last Name', 'Project Title', 'Supervisor', 'Second Marker'
		));

		foreach($results as $result){
			fputcsv($file, $result);
		}

		fclose($file);

		header('Content-Description: File Transfer');
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename=SecondMarkerData.csv');
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($filepath));

		ob_clean();
		flush();
		readfile($filepath);
		unlink($filepath);

		return;
	}

		/**
	 * The student propose a project view (Form).
	 *
	 * @return \Illuminate\View\View|\Illuminate\Http\Response
	 */
	public function exportStudentSummary(Request $request){
		if(!empty($request->project_year)){
			$userTable = (new User())->getTable();
			$studentTable = (new Student())->getTable();

			$students = Student::join($userTable.' as user', 'user.id', '=', $studentTable.'.id')
				->select($studentTable.'.*')
				->where('user.active_year', $request->project_year)
				->orderBy('user.last_name', 'asc')
				->get();
		} else {
			$students = Student::getAllStudentsQuery()->get();
		}

		$results = array();
		foreach($students as $student){
			$ar = array();
			
			$ar["regNo"] = $student->registration_number;
			$ar["username"] = $student->user->username;
			$ar["programme"] = $student->user->programme_relationship->name;
			$ar["fName"] = $student->user->first_name;
			$ar["lName"] = $student->user->last_name;

			if(!empty($student->project)){
				$ar["projectTitle"] = $student->project->title;

				if(!empty($student->project->supervisor)){
					$ar["supervisorName"] = $student->project->supervisor->user->getFullName();
				} else {
					$ar["supervisorName"] = '-';
				}

				if(!empty($student->project->marker)){
					$ar["markerName"] = $student->project->marker->user->getFullName();
				} else {
					$ar["markerName"] = '-';
				}

				if(!empty($student->project->evaluation) && $student->project->evaluation->is_finalised){
					$eval = $student->project->evaluation;

					if($eval->hasPosterPresentationQuestion()){
						$ar["posterMark"] = $eval->getPosterPresentationQuestion()->finalValue;
					} else {
						$ar["posterMark"] = '-';
					}

					if($eval->hasOralPresentationQuestion()){
						$ar["presentationMark"] = $eval->getOralPresentationQuestion()->finalValue;
					} else {
						$ar["presentationMark"] = '-';
					}

					if($eval->hasDissertationQuestion()){
						$ar["dissertationMark"] = $eval->getDissertationQuestion()->finalValue;
					} else {
						$ar["dissertationMark"] = '-';
					}

				} else {
					$ar["posterMark"] = '-';
					$ar["presentationMark"] = '-';
					$ar["dissertationMark"] = '-';
				}
			} else {
				$ar["projectTitle"] = '-';
				$ar["supervisorName"] = '-';
				$ar["markerName"] = '-';
				$ar["posterMark"] = '-';
				$ar["presentationMark"] = '-';
				$ar["dissertationMark"] = '-';
			}

			array_push($results, $ar);
		}

		if(!empty($request->project_year)){
			$fileName = "StudentData-".$request->project_year.".csv";
		} else {
			$fileName = "StudentData-".Mode::getProjectYear().".csv";
		}

		$filepath = "../storage/app/".$fileName;

		$file = fopen($filepath, 'w');

		fputcsv($file, array(
			'Registration Number', 'Username', 'Programme',
			'First Name', 'Last Name',
			'Project Title', 'Supervisor', 'Second Marker',
			'Agreed Poster Mark', 'Agreed Presentation Mark', 'Agreed Dissertation Mark'
		));

		foreach($results as $result){
			fputcsv($file, $result);
		}

		fclose($file);

		header('Content-Description: File Transfer');
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename='.$fileName);
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($filepath));

		ob_clean();
		flush();
		readfile($filepath);
		unlink($filepath);

		return;
	}
}
