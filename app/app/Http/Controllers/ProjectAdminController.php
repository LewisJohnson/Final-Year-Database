<?php
/**
 * Copyright (C) University of Sussex 2018.
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
		$request->validate(['studentFile' => 'required',]);

		if(strtolower($request->file('studentFile')->getClientOriginalExtension()) != "csv"){
			return response()->json(array('successful' => false,
										  'message' => 'Invalid file format. Please upload a CSV file.'
			));
		}

		if(mb_detect_encoding($request->file('studentFile'), 'UTF-8', true) != 'UTF-8'){
			return response()->json(array('successful' => false,
										  'message' => 'Invalid file encoding.'
			));
		}

		if($request->file('studentFile')->isValid()){
			$userUpload = $request->file('studentFile');

			// Move uploaded file to temp dir
			$file = file($userUpload->getRealPath());

			// Map CSV data into array
			$csv = array_map('str_getcsv', $file);

			if($request->query('test') == 1){
				return $this->testImportStudents($csv);
			} else {
				// Import to prod tables

				// Remove CSV header and tail
				for($i = 1; $i < count($csv) - 1; $i++){
					$user = new User;
					$student = new Student;

					$user->fill(array('privileges' => 'student',
									  'first_name' => $csv[$i][2],
									  'last_name' => $csv[$i][1],
									  'username' => $csv[$i][4],
									  'password' => bcrypt("password"),
									  'programme' => $csv[$i][3],
									  'email' => $csv[$i][4]."@sussex.ac.uk"
					));
					$user->save();

					$student->fill(array('id' => $user->id,
										 'registration_number' => $csv[$i][0]
					));

					$student->save();
				}

				$users = User::where('privileges', 'student')->get();
				$students = Student::all();
				$view = view('admin.partials.import-student-table')->with('users', $users)->with('students', $students)->render();

				return response()->json(array('successful' => true,
											  'message' => $view
				));
			}
		}

		return response()->json(array('successful' => false,
									  'message' => 'Invalid file.'
		));
	}

	/**
	 * The import students view.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function testImportStudents($csv){
		// Empty test tables
		DB::table('test_users')->truncate();
		DB::table('test_students')->truncate();

		// Remove CSV header and tail
		for($i = 1; $i < count($csv) - 1; $i++){
			$id = $i;
			DB::table('test_users')->insert(array('id' => $id,
												  'first_name' => $csv[$i][2],
												  'last_name' => $csv[$i][1],
												  'username' => $csv[$i][4],
												  'password' => bcrypt("password"),
												  'programme' => $csv[$i][3],
												  'email' => $csv[$i][4]."@sussex.ac.uk"
			));

			DB::table('test_students')->insert(array('id' => $id,
													 'registration_number' => $csv[$i][0]
			));
		}

		$users = DB::table('test_users')->select('*')->get();
		$students = DB::table('test_students')->select('*')->get();
		$view = view('admin.partials.import-student-table')->with('users', $users)->with('students', $students)->render();

		return response()->json(array('successful' => true, 'message' => $view
		));
	}

	/**
	 * Amend parameters view (mode)
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function amendParametersView(Request $request){
		return view('admin.parameters');
	}

	/**
	 * Amend parameters view (mode)
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function amendParameters(Request $request){
		$mode = Mode::all()->first();

		if(isset($request->project_selection)){
			$mode->project_selection = $request->project_selection;
		}

		if(isset($request->supervisor_accept)){
			$mode->supervisor_accept = $request->supervisor_accept;
		}

		if(isset($request->project_year)){
			$mode->project_year = $request->project_year;
		}

		$mode->save();

		session()->flash('message', 'Parameters have been updated successfully.');
		session()->flash('message_type', 'success');

		return redirect()->action('HomeController@index');
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

		return view('admin.arrangements')->with('supervisors', $supervisors);
	}

	/**
	 * The amend supervisor arrangements view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function amendSupervisorArrangements(Request $request){
		$supervisors = Supervisor::all();

		foreach($supervisors as $supervisor){
			$project_load = $request[$supervisor->id."_project_load"];
			$take_students = $request[$supervisor->id."_take_students"];
			$supervisor->setProjectLoad($project_load);
			$supervisor->setTakingStudents(isset($take_students) ? 1 : 0);
		}

		session()->flash('message', 'Supervisor arrangements have been updated successfully');
		session()->flash('message_type', 'success');

		return view('admin.arrangements')->with('supervisors', $supervisors);
	}

	/**
	 * The amend topics view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function amendTopicsView(Request $request){
		$topics = Topic::all();

		return view('admin.amend-topics')->with('topics', $topics);
	}

	/**
	 * The amend topics view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function amendProgrammesView(Request $request){
		$programmes = Programme::all();

		return view('admin.amend-programmes')->with('programmes', $programmes);
	}

	/**
	 * The log-in as another user view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function loginAsView(Request $request){
		$students = Student::all();
		$supervisors = Supervisor::all();
		$staffUsers = User::Where('privileges', 'staff')->get();

		$students = $students->sortBy(function($student, $key){
			return $student->user->last_name;
		});

		$supervisors = $supervisors->sortBy(function($supervisor, $key){
			return $supervisor->user->last_name;
		});

		$staffUsers = $staffUsers->sortBy(function($staff, $key){
			return $staff->last_name;
		});

		return view('admin.login-as')->with('supervisors', $supervisors)->with('staff', $staffUsers)->with('students', $students);
	}

	/**
	 * Log-in the currently authenticated user as another user.
	 *
	 * @param string $id User ID
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function loginAs($id){
		if(Session::get('sudo-mode') == null || Session::get('sudo-mode') == false){
			session()->flash('message', 'Something went wrong');
			session()->flash('message_type', 'error');

			return false;
		}

		$user = User::findOrFail($id);

		if($user->isSystemAdmin() || $user->isProjectAdmin()){
			session()->flash('message', 'You may not log in as an administrator');
			session()->flash('message_type', 'error');

			return false;
		}

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
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function archiveView(Request $request){
		return view('admin.archive');
	}

	/**
	 * Runs the end of year archive script
	 * - Adds This student was undertaken by [STUDENT NAME]” to project description.
	 * - Set all projects status to archived.
	 * - Empty the student tables.
	 * - Empty the transaction tables.
	 * - Remove all students from the user table.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function archive(Request $request){
		DB::transaction(function(){
			$projects = Project::all();
			$students = User::where('privileges', 'student')->get();
			foreach($projects as $project){
				if($project->getAcceptedStudent() != null){
					$project->description = $project->description."(++ This project was undertaken by ".$project->getAcceptedStudent()->user->getFullName()." in ".Mode::getProjectYear()." ++)";
				}
				$project->student_id = null;

				if($project->status == 'student-proposed'){
					$project->delete();
				}

				$project->status = 'archived';
				$project->save();
			}

			foreach($students as $student){
				$student->delete();
			}

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
	 * @return \Illuminate\Http\Response
	 */
	public function manualSecondMarkerView(Request $request){
		$supervisors = Supervisor::all();
		$students = Student::all();

		$sorted = $students->sortBy(function($student, $key) use ($request){
			if($request->query("sort") === "firstname"){
				return $student->user->first_name;
			} elseif($request->query("sort") === "lastname") {
				return $student->user->last_name;
			}
		});

		return view('admin.assign-marker-manual')->with('supervisors', $supervisors)->with('students', $sorted);
	}

	/**
	 * The automatic (Algorithmic) assign second marker view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function computeSecondMarkerView(Request $request){
		return view('admin.assign-marker-automatic');
	}

	/**
	 * The actual action of assigning second markers to students.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response A HTML report of assigned markers
	 */
	public function calculateSecondMarkers(Request $request){
		DB::table(Student::getTable())->update(array('marker_id' => null));

		$assignmentSetup = $this->setupAutomaticSecondMarkerAssignment();

		// Assignment derived from slack
		foreach($assignmentSetup["supervisors"] as $key => $supervisor){
			if($supervisor->target_load == 0){
				break;
			}

			$studentsAssignedToThisSupervisor = 0;
			while($studentsAssignedToThisSupervisor < $assignmentSetup["slack"]){
				$studentToAssign = StudentController::getStudentWithoutSecondMarker();

				if(is_null($studentToAssign)){
					return response()->json(array('successful' => false,
												  'message' => '<h2>Error</h2>Failed to find a student without a second marker already assigned.'
					));
				} else {
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
			if($studentToAssign == null){
				break;
			}

			// foreach($assignmentSetup["supervisors"] as $key => $supervisor) {
			// 	if($supervisor->target_load == 0){ break; }
			// }
			// todo: this;
			$studentToAssign->marker_id = 1;
			$studentToAssign->save();
		}

		return $this->assignSecondMarkerReportTable();
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

		foreach($supervisors as $key => $supervisor){
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
			return response()->json(array('successful' => false,
										  'message' => '<h2>Calculation Error</h2>There are more projects than the supervisor load total.<br><b>Please increase the total supervisor load by at least '.($projectCount - $supervisorLoadTotal).'</b>.'
			));
		}

		return ['slack' => $slack, 'supervisors' => $supervisors];
	}

	/**
	 * An overview of each supervisor and which students they are second supervisor to.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function assignSecondMarkerReportTable(Request $request){
		$assignmentSetup = $this->setupAutomaticSecondMarkerAssignment();

		$view = view('admin.partials.assignment-report-table')->with('supervisors', $assignmentSetup["supervisors"]);

		return response()->json(array(
			'successful' => true,
			'html' => $view->render()
		));
	}

	/**
	 * An overview of each automatically assigned second supervisor.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function assignSecondMarkerAutomaticTable(Request $request){
		$assignmentSetup = $this->setupAutomaticSecondMarkerAssignment();
		$view = view('admin.partials.automatic-marker-assignment-table')->with('supervisors', $assignmentSetup["supervisors"])->with('slack', $assignmentSetup["slack"]);

		return response()->json(array('successful' => true,
									  'html' => $view->render()
		));
	}

	/**
	 * The swap second marker view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function swapSecondMarkerView(Request $request){
		$students = Student::where('project_status', 'accepted')->get();

		return view('admin.swap-marker')->with('students', $students);
	}

	/**
	 * Swap student A and student B's second markers.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function swapSecondMarker(Request $request){
		$studentA = Student::findOrFail($request->studentA);
		$studentB = Student::findOrFail($request->studentB);

		$MarkerA = $studentA->marker->id;
		$MarkerB = $studentB->marker->id;

		$studentA->marker_id = $MarkerB;
		$studentB->marker_id = $MarkerA;

		$studentA->save();
		$studentB->save();

		return response()->json(array('successful' => true));
	}

	/**
	 * The amend supervisor arrangements view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function exportSecondMarkerDataView(Request $request){
		return view('admin.export-marker');
	}

	/**
	 * The amend supervisor arrangements view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function exportSecondMarkerData(Request $request){
		$students = Student::all();
		$output = array();

		foreach($students as $student){
			$ar = array();
			$ar["studentName"] = $student->user->getFullName();
			$ar["projectTitle"] = $student->project->title;
			$ar["supervisorName"] = $student->project->supervisor->user->getFullName();
			if($student->marker){
				$ar["markerName"] = $student->marker->user->getFullName();
			} else {
				$ar["markerName"] = "None";
			}
			array_push($output, $ar);
		}

		if($request->type == "json"){
			$filename = "SecondMarkerData.json";
			$handle = fopen($filename, 'w+');
			file_put_contents($filename, json_encode($output));
			fclose($handle);

			$headers = array('Content-Type' => 'text/json',);

			return response()->download($filename, 'SecondMarkerData.json', $headers);
		}

		if($request->type == "csv"){
			$filename = "SecondMarkerData.csv";
			$handle = fopen($filename, 'w+');
			fputcsv($handle, array('Student Name', 'Project Title',
								   'Supervisor', 'Second Marker'
			));

			foreach($output as $out){
				fputcsv($handle, $out);
			}

			fclose($handle);

			$headers = array('Content-Type' => 'text/csv',);

			return response()->download($filename, 'SecondMarkerData.csv', $headers);
		}
	}
}
