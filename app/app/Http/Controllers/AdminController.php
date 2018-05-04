<?php
/**
	* Copyright (C) University of Sussex 2018.
	* Unauthorized copying of this file, via any medium is strictly prohibited
	* Written by Lewis Johnson <lj234@sussex.com>
	*/

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use SussexProjects\Student;
use SussexProjects\Project;
use SussexProjects\Supervisor;
use SussexProjects\Topic;
use SussexProjects\Transaction;
use SussexProjects\Mode;
use SussexProjects\Feedback;
use SussexProjects\User;
use SussexProjects\UserAgentString;

/**
	* The admin controller.
	*
	* Methods in this controller are used for project and system administrators.
	* 
	* @see SussexProjects\User
*/
class AdminController extends Controller{

	public function __construct(){
		$this->middleware('auth');
	}

	/**
		* Administrator hub view.
		*
		* @return \Illuminate\Http\Response
	*/
	public function index(){
		return view('admin.index');
	}

	/**
		* User feedback view.
		*
		* @return \Illuminate\Http\Response
	*/
	public function feedback(){
		return view('admin.feedback')
		->with('feedback', Feedback::all());
	}

	/**
		* Import students view.
		*
		* @return \Illuminate\Http\Response
	*/
	public function importStudentsView(){
		return view('admin.import');
	}

	/**
		* The import students view.
		*
		* @return \Illuminate\Http\Response
	*/
	public function importStudents(Request $request){
		if($request->file('studentFile') === null){
			return response()->json(array('successful' => false, 'message' => 'Please select a file.'));
		}


		if ($request->file('studentFile')->isValid()) {
			$userUpload = $request->file('studentFile');
			$file = file($userUpload->getRealPath());

			if($request->query('test') == 1){
				return $this->testImportStudents($file);
			} else {
				// Import to prod tables
				// Map CSV data into array
				$csv = array_map('str_getcsv', $file);

				// Remove CSV header and tail
				for ($i= 1; $i < count($csv) - 1; $i++) {
					$user = new User;
					$student = new Student;

					$user->fill(array(
						'privileges' => 'student',
						'first_name' => $csv[$i][2],
						'last_name' => $csv[$i][1],
						'username' => $csv[$i][4],
						'password' => bcrypt("password"),
						'programme' => $csv[$i][3],
						'email' => $csv[$i][4]."@sussex.ac.uk"
					));
					$user->save();

					$student->fill(array(
						'id' => $user->id,
						'registration_number' => $csv[$i][0]
					));

					$student->save();
				}

				$users = User::where('privileges', 'student')->get();
				$students = Student::all();

				return view('admin.partials.import-student-table')->with('users', $users)->with('students', $students);
			}
		}

		return response()->json(array('successful' => false, 'message' => 'Invalid file.'));
	}


	/**
		* The import students view.
		*
		* @return \Illuminate\Http\Response
	*/
	public function testImportStudents($file){
		// Map CSV data into array
		$csv = array_map('str_getcsv', $file);

		// Empty test tables
		DB::table('test_users')->truncate();
		DB::table('test_students')->truncate();

		// Remove CSV header and tail
		for ($i= 1; $i < count($csv) - 1; $i++) {
			$id = $i;
			DB::table('test_users')->insert(
				array('id' => $id,
					'first_name' => $csv[$i][2],
					'last_name' => $csv[$i][1],
					'username' => $csv[$i][4],
					'password' => bcrypt("password"),
					'programme' => $csv[$i][3],
					'email' => $csv[$i][4]."@sussex.ac.uk"
				)
			);

			DB::table('test_students')->insert(
				array('id' => $id,
					'registration_number' => $csv[$i][0]
				)
			);
		}

		$users = DB::table('test_users')->select('*')->get();
		$students = DB::table('test_students')->select('*')->get();

		return view('admin.partials.import-student-table')
		->with('users', $users)
		->with('students', $students);
	}
	/**
		* System administrator dashboard view.
		*
		* @return \Illuminate\Http\Response
	*/
	public function dashboard(){
		return view('admin.system.dashboard');
	}

	/**
		* User agent string view.
		*
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function userAgentView(Request $request){
		if ($request->query("unique") == "1") {
			$userAgents = UserAgentString::where('first_visit', 1);
		} else {
			$userAgents = UserAgentString::where('first_visit', 0);
		}

		if ($request->query("page")) {
			return view('system.partials.user-agent-row')
				->with('userAgents', $userAgents->paginate($this->paginationCount));
		} else {
			return view('system.user-agent')
				->with('userAgents', $userAgents->paginate($this->paginationCount));
		}
	}

	/**
		* Amend parameters view (mode)
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function amendParametersView(Request $request){
		return view('admin.parameters');
	}

	/**
		* Amend parameters view (mode)
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function amendParameters(Request $request){
		$mode = Mode::all()->first();

		if (isset($request->start_date)) {
			$mode->start_date = $request->start_date;
		}

		if (isset($request->project_year)) {
			$mode->project_year = $request->project_year;
		}

		$mode->save();

		session()->flash('message', 'Parameters have been updated successfully.');
		session()->flash('message_type', 'success');

		return redirect()->action('HomeController@index');
	}

	public function configure(Request $request){
		foreach ($request->all() as $key => $value) {
			if (substr($key, -4, 4) != "json") {
				// This is to convert strings to PHP booleans
				if($value === "true"){ $value = true; }
				if($value === "false"){ $value = false; }

				get_config_json($request[$key . "-json"], $value);
			}
		}
		return redirect(url('admin/dashboard'));
	}

	/**
		* The amend supervisor arrangements view.
		*	
		* @param \Illuminate\Http\Request $request
		* 
		* @return \Illuminate\Http\Response
	*/
	public function amendSupervisorArrangementsView(Request $request){
		$supervisors = Supervisor::all();
		return view('admin.arrangements')
			->with('supervisors', $supervisors);
	}

	/**
		* The amend supervisor arrangements view.
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function amendSupervisorArrangements(Request $request){
		if (isset($request->project_load)) {
			$request->validate([
				'project_load' => 'numeric',
			]);
		};

		foreach ($request->all() as $key => $value) {
			if (strpos($key, 'supervisor-') === 0) {
				$id = substr($key, 11); 
				$supervisor = Supervisor::findOrFail($id);

				if (isset($request->project_load)) {
					$supervisor->setProjectLoad($request->project_load);
				}

				$supervisor->setTakingStudents(isset($request->take_students) ? 1 : 0);
			}
		}
		$supervisors = Supervisor::all();
		return view('admin.arrangements')
			->with('supervisors', $supervisors);
	}

	/**
		* The amend topics view.
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function amendTopicsView(Request $request){
		$topics = Topic::all();
		return view('admin.amend-topics')
			->with('topics', $topics);
	}

	/**
		* The log-in as another user view.
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function loginAsView(Request $request){
		$students = Student::all();
		$supervisors = Supervisor::all();
		$staffUsers = User::Where('privileges', 'staff')->get();

		$students = $students->sortBy(function ($student, $key) {
			return $student->user->last_name;
		});

		$supervisors = $supervisors->sortBy(function ($supervisor, $key) {
			return $supervisor->user->last_name;
		});

		$staffUsers = $staffUsers->sortBy(function ($staff, $key) {
			return $staff->last_name;
		});

		return view('admin.login-as')
		// ->with('supervisors', $supervisors->sortBy('title'))
		->with('supervisors', $supervisors)
			->with('staff', $staffUsers)
			->with('students', $students);
	}

	/**
		* Log-in the currently authenticated user as another user.
		*	
		* @param string $id User ID
		* @return \Illuminate\Http\Response
	*/
	public function loginAs($id){
		// todo: check if they are allowed
		$user = User::findOrFail($id);
		Auth::login($user);

		// Redirect
		session()->flash('message', 'You have logged in as '.$user->getFullName());
		session()->flash('message_type', 'success');

		return redirect()->action('HomeController@index');
	}

	/**
		* The end of year archive view.
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function archiveView(Request $request){
		return view('admin.archive');
	}

	/**
		* Runs the end of year archive script
		*	
		* - Adds This student was undertaken by [STUDENT NAME]” to project description.
		* - Set all projects status to archived.
		* - Empty the student tables.
		* - Empty the transaction tables.
		* - Remove all students from the user table.
		* 
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function archive(Request $request){
		DB::transaction(function() {
			$projects = Project::all();

			foreach ($projects as $key => $project) {
				if($project->getAcceptedStudent() != null){
					$project->description = $project->description."(This project was undertaken by ".$project->getAcceptedStudent()->user->getFullName().")";
				}

				$project->status = 'archived';
				$project->save();
			}

			$student = new Student();
			DB::table($student->getTable())->delete();
		});

		return response()->json(array('successful' => true));
	}

	/**
		* The manual assign second marker view.
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function assignMarkerManualView(Request $request){
		$supervisors = Supervisor::all();
		$students = Student::all();

		$sorted = $students->sortBy(function ($student, $key) use ($request) {
			if ($request->query("sort") === "firstname") {
				return $student->user->first_name;
			} elseif ($request->query("sort") === "lastname") {
				return $student->user->last_name;
			}
		});

		return view('admin.assign-marker-manual')
			->with('supervisors', $supervisors)
			->with('students', $sorted);
	}

	/**
		* The automatic (Algorithmic) assign second marker view.
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function assignMarkerAutomaticView(Request $request){
		return view('admin.assign-marker-automatic');
	}

	/**
		* Returns all the needed parameters for the automatic second marker assignment algorithm.
		*	
		* @return object[] slack, supervisors
	*/
	public function setupAutomaticSecondMarkerAssignment(){
		$supervisors = Supervisor::all();
		$supervisorLoadTotal = 0;
		$maxTargetLoad = 0;
		$slack = 0;
		$studentCount = Student::count();
		$projectCount = Project::count();

		foreach ($supervisors as $key => $supervisor) {
			$supervisor->accepted_student_count = count($supervisor->getAcceptedStudents());
			$supervisor->project_load = $supervisor['project_load_'.Session::get('education_level')["shortName"]];
			$supervisor->target_load = ($supervisor['project_load_'.Session::get('education_level')["shortName"]] * 2) - $supervisor->accepted_student_count;

			$supervisorLoadTotal += $supervisor->project_load;

			// No negative values
			if($supervisor->target_load < 0){
				$supervisor->target_load = 0;
			}

			// Determine who has max target load
			if($supervisor->target_load >= $maxTargetLoad){
					$maxTargetLoad = $supervisor->target_load;
			}

			// Determine lazy score
			if($supervisor->target_load > 0){
				$supervisor->lazy_score = ($maxTargetLoad / $supervisor->target_load);
			} else {
				$supervisor->lazy_score = 0;
			}
		}

		$slack = $maxTargetLoad / $studentCount;

		if($projectCount > $supervisorLoadTotal){
			return response()->json(array('successful' => false, 'message' => '<h2>Calculation Error</h2>There are more projects than the supervisor load total.<br><b>Please increase the total supervisor load by at least '.($projectCount - $supervisorLoadTotal).'</b>.'));
		}

		return ['slack' => $slack, 'supervisors' => $supervisors];
	}

	/**
		* The actual action of assigning second markers to students.
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response A HTML report of assigned markers 
	*/
	public function calculateSecondMarkers(Request $request){
		DB::table(Student::getTable())->update(array('marker_id' => null));
		
		$assignmentSetup = $this->setupAutomaticSecondMarkerAssignment();

		// Assignment derived from slack
		foreach ($assignmentSetup["supervisors"] as $key => $supervisor) {
			if($supervisor->target_load == 0){ break; }

			$studentsAssignedToThisSupervisor = 0;
			while($studentsAssignedToThisSupervisor < $assignmentSetup["slack"]){
				$studentToAssign = StudentController::getStudentWithoutSecondMarker();

				if(is_null($studentToAssign)){
					return response()->json(array('successful' => false, 'message' => '<h2>Error</h2>Failed to find a student without a second marker already assigned.'));
				}else{
					$studentToAssign->marker_id = $supervisor->id;
					$studentToAssign->save();
					$studentsAssignedToThisSupervisor++;
				}
			}
		}

		// Assign remaining students taking lazy score in to consideration
		// Assignment derived from slack
		while(StudentController::getStudentWithoutSecondMarker()){
			$studentToAssign = StudentController::getStudentWithoutSecondMarker();
			$laziestSupervisor = null;

			// No more students left to assign
			if($studentToAssign == null){ break; }

			// foreach ($assignmentSetup["supervisors"] as $key => $supervisor) {
			// 	if($supervisor->target_load == 0){ break; }
			// }
			// todo: this;
			$studentToAssign->marker_id = 1;
			$studentToAssign->save();
		}

		return $this->assignMarkerReportTable();
	}

	/**
		* An overview of each automatically assigned second supervisor.
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function assignMarkerAutomaticTable(Request $request){
		$assignmentSetup = $this->setupAutomaticSecondMarkerAssignment();
		$view = view('admin.partials.automatic-second-marker-assignment-table')
			->with('supervisors', $assignmentSetup["supervisors"])
			->with('slack', $assignmentSetup["slack"]);
		return response()->json(array('successful' => true, 'html' => $view->render()));
	}


	/**
		* An overview of each supervisor and which students they are second supervisor to.
		*	
		* @param \Illuminate\Http\Request $request
		* @return \Illuminate\Http\Response
	*/
	public function assignMarkerReportTable(Request $request){
		$assignmentSetup = $this->setupAutomaticSecondMarkerAssignment();

		$view = view('admin.partials.assignment-report-table')
			->with('supervisors', $assignmentSetup["supervisors"]);

		return response()->json(array('successful' => true, 'html' => $view->render()));
	}
}
