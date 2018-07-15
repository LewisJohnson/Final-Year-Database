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
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Stevebauman\Purify\Facades\Purify;
use SussexProjects\Http\Requests\ProjectForm;
use SussexProjects\Mail\StudentProposed;
use SussexProjects\Mail\StudentSelected;
use SussexProjects\Mail\StudentUnselected;
use SussexProjects\Mode;
use SussexProjects\User;
use SussexProjects\Project;
use SussexProjects\Programme;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\Transaction;

/**
 * The student controller.
 * Methods in this controller are used for project and system administrators.
 *
 * @see SussexProjects\Student
 */
class StudentController extends Controller{

	public function __construct(){
		parent::__construct();
		$this->middleware('auth');
	}

	/**
	 * Returns the first student in the DB without a second marker.
	 *
	 * @return Student
	 */
	public static function getStudentWithoutSecondMarker(){
		return $student = Student::whereNull('marker_id')->first();
	}

	/**
	 * Returns the first student in the DB without a second marker.
	 *
	 * @return bool
	 */
	public static function checkAllStudentsHaveSecondMarker(){
		if(Student::whereNull('marker_id')->first() == null){
			return true;
		}

		return false;
	}

	/**
	 * The student report view.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function report(){
		return view('students.report')->with('studentCount', Student::count());
	}

	/**
	 * Adds project to favourite projects.
	 *
	 * @return void * @internal param Request $request includes project to add
	 */
	public function addFavouriteProject(){
		$project = Project::findOrFail(request('project_id'));

		if(Cookie::get('favourite_projects') === "null" || Cookie::get('favourite_projects') == "a:0:{}" || empty(Cookie::get('favourite_projects'))){
			Cookie::queue('favourite_projects', serialize(array($project->id)), 525600);
		} else {
			$projectInCookie = false;
			$favProjects = unserialize(Cookie::get('favourite_projects'));

			if(($key = array_search($project->id, $favProjects)) !== false){
				$projectInCookie = true;
			}

			if(!$projectInCookie){
				$favProjects[] = $project->id;
				Cookie::queue('favourite_projects', serialize($favProjects), 525600);
			}
		}

		return;
	}

	/**
	 * Removes project to favourite projects.
	 *
	 * @return void * @internal param Request $request includes project to remove
	 */
	public function removeFavouriteProject(){
		$project = Project::findOrFail(request('project_id'));
		$favProjects = unserialize(Cookie::get('favourite_projects'));

		if(($key = array_search($project->id, $favProjects)) !== false){
			unset($favProjects[$key]);
		}

		Cookie::queue('favourite_projects', serialize($favProjects), 525600);

		return;
	}

	/**
	 * Updates the students share name to other students preference.
	 *
	 * @param \Illuminate\Http\Request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function shareName(Request $request){
		$student = Auth::user()->student;
		$student->share_name = isset($request->share_name);
		$student->save();

		return response()->json(array('share_name' => $student->share_name));
	}

	/**
	 * The student propose a project view (Form).
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function proposeProjectView(){
		$supervisors = Supervisor::all();

		$supervisors = $supervisors->sortBy(function($supervisor){
			return $supervisor->user->last_name;
		});

		if(Auth::user()->student->project_status == "none"){
			return view("students.propose-project")->with('supervisors', $supervisors);
		} else {
			return redirect()->action('HomeController@index');
		}
	}

	/**
	 * Adds student proposed project to the database
	 *
	 * @param Request|ProjectForm $request Student proposed project
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function proposeProject(ProjectForm $request){
		if(Mode::getProjectSelectionDate()->gt(Carbon::now())){
			session()->flash('message', 'You are not allowed to propose a project until '.Mode::getProjectSelectionDate().'.');
			session()->flash('message_type', 'danger');

			return redirect()->action('HomeController@index');
		}

		$student = Auth::user()->student;

		// Student has already selected a project
		if($student->project_id != null){
			session()->flash('message', 'You have already selected a project.');
			session()->flash('message_type', 'error');

			return redirect()->action('HomeController@index');
		}

		DB::transaction(function() use ($request, $student){
			$project = new Project;
			$projectController = new ProjectController;
			$clean_html = Purify::clean(request('description'), $projectController->descriptionPurifyConfig);

			$transaction = new Transaction;
			$supervisor = Supervisor::findOrFail(request('supervisor_id'));

			$project->supervisor_id = request('supervisor_id');
			$project->student_id = Auth::user()->student->id;

			$project->fill(array(
				'title' => request('title'), 'description' => $clean_html,
				'status' => "student-proposed", 'skills' => request('skills')
			));

			$transaction->fill(array(
				'type' => 'project',
				'action' => 'proposed',
				'project' => $project->id,
				'student' => Auth::user()->student->id,
				'supervisor' => $supervisor->id,
				'transaction_date' => new Carbon
			));

			$student->project_id = $project->id;
			$student->project_status = 'proposed';

			$project->save();
			$student->save();
			$transaction->save();

			session()->flash('message', 'You have proposed "'.$project->title.'" to '.$supervisor->user->getFullName());
			session()->flash('message_type', 'success');
		});

		// Send student proposed email
		if($student->project->supervisor->getAcceptingEmails()){
			try{
				// Send accepted email
				Mail::to($student->project->supervisor->user->email)
					->send(new StudentProposed($student->project->supervisor, Auth::user()->student));
			} catch (\Exception $e){

			}
		}

		return redirect()->action('HomeController@index');
	}

	/**
	 * Selects the requested project.
	 * The student will now have to wait to be approved or rejected.
	 *
	 * @param \Illuminate\Http\Request $request Included project ID
	 *
	 * @return \Illuminate\Http\Response Home page
	 */
	public function selectProject(Request $request){
		if(Mode::getProjectSelectionDate()->gt(Carbon::now())){
			session()->flash('message', 'You are not allowed to select a project until '.Mode::getProjectSelectionDate(true).'.');
			session()->flash('message_type', 'error');

			return redirect()->action('ProjectController@show', request('project_id'));
		}

		$student = Auth::user()->student;

		// Student has already selected a project
		if($student->project_id != null){
			session()->flash('message', 'You have already selected a project.');
			session()->flash('message_type', 'error');

			return redirect()->action('ProjectController@show', request('project_id'));
		}

		DB::transaction(function() use ($request, $student){
			$project = Project::findOrFail(request('project_id'));

			if($project->status != "on-offer"){
				session()->flash('message', 'Sorry, this project is no longer on offer.');
				session()->flash('message_type', 'error');

				return redirect()->action('ProjectController@show', request('project_id'));
			}

			$transaction = new Transaction;

			$student->project_id = $project->id;
			$student->project_status = 'selected';
			$student->save();

			$transaction->fill(array(
				'type' => 'project', 'action' => 'selected',
				'project' => request('project_id'),
				'student' => Auth::user()->student->id,
				'supervisor' => $project->supervisor->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();
			session()->flash('message', 'You have selected "'.$project->title.'".');
			session()->flash('message_type', 'success');

			return true;
		});

		if($student->project->supervisor->getAcceptingEmails()){
			try{
				// Send selected email
				if($student->project->supervisor->getAcceptingEmails()){
					Mail::to($student->project->supervisor->user->email)
						->send(new StudentSelected($student->project->supervisor, Auth::user()->student));
				}
			} catch (\Exception $e){

			}
		}

		return redirect()->action('HomeController@index');
	}

	/**
	 * Undoes selected project.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response JSON
	 */
	public function undoSelectedProject(Request $request){
		if(Auth::user()->student->project == null){
			return response()->json(array(
				'error' => true, 'message' => "Something went wrong."
			));
		}

		if(Auth::user()->student->project_status != 'selected' || Auth::user()->student->project_status != 'proposed'){
			return response()->json(array(
				'error' => true, 'message' => "Something went wrong."
			));
		}

		$student = Auth::user()->student;

		DB::transaction(function() use ($request, $student){
			$transaction = new Transaction;
			$transaction->fill(array(
				'type' => 'project',
				'action' =>'undo',
				'project' => $student->project->id,
				'student' => $student->id,
				'supervisor' => $student->project->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();

			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();
		});

		if($student->project->supervisor->getAcceptingEmails()){
			try{
				// Send selected email
				if($student->project->supervisor->getAcceptingEmails()){
					Mail::to($student->project->supervisor->user->email)
						->send(new StudentUnselected($student->project->supervisor, Auth::user()->student));
				}
			} catch (\Exception $e){

			}
		}

		return response()->json(array(
			'successful' => true, 'message' => "You have un-selected a project."
		));
	}

	/**
	 * Updates the students second marker
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function updateSecondMarker(Request $request){
		if(!Auth::user()->isAdminOfEducationLevel(Session::get('education_level')["shortName"])){
			return redirect()->action('HomeController@index');
		}

		DB::transaction(function() use ($request){
			$project = Project::findOrFail(request('project_id'));
			$student = Student::findOrFail(request('student_id'));
			$transaction = new Transaction;
			$marker = Supervisor::findOrFail(request('marker_id'));

			$transaction->fill(array(
				'type' => 'project',
				'action' => 'marker-assigned',
				'project' => $project->id,
				'student' => $student->id,
				'supervisor' => $project->supervisor_id,
				'marker' => $marker->id,
				'admin' => Auth::user()->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();
			$student->marker_id = $marker->id;
			$student->save();
		});

		return response()->json(array('successful' => true));
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
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function importStudents(Request $request){
		$request->validate(['studentFile' => 'required']);

		if(strtolower($request->file('studentFile')->getClientOriginalExtension()) != "csv"){
			return response()->json(array(
				'successful' => false,
				'message' => 'Invalid file format. Please upload a CSV file.'
			));
		}

		if(mb_detect_encoding($request->file('studentFile'), 'UTF-8', true) != 'UTF-8'){
			return response()->json(array(
				'successful' => false, 'message' => 'Invalid file encoding.'
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
				if(isset($request->empty_students)){
					$students = User::where('privileges', 'student');
					$students->delete();
				}

				if(isset($request->empty_programmes)){
					$userTable = new User;
					DB::table($userTable->getTable())->update(array(
						'programme' => null
					));

					DB::statement("SET foreign_key_checks=0");
					Programme::truncate();
					DB::statement("SET foreign_key_checks=1");
				}

				DB::transaction(function() use ($request, $csv){
					// Remove CSV header and tail
					for($i = 1; $i < count($csv) - 1; $i++){
						unset($user, $student, $studentProgramme, $studentProgrammeModel, $autoProgramme);

						$user = new User;
						$student = new Student;
						$studentProgramme = $csv[$i][3];

						if(isset($request->auto_programmes)){
							if(Programme::where('name', $studentProgramme)->first() == null){
								$autoProgramme = new Programme;
								$autoProgramme->name = $studentProgramme;
								$autoProgramme->save();
							}
						}

						$studentProgrammeModel = Programme::where('name', $studentProgramme)->first();

						$user->fill(array(
							'privileges' => 'student',
							'first_name' => $csv[$i][2],
							'last_name' => $csv[$i][1],
							'username' => $csv[$i][4],
							'programme' => $studentProgrammeModel->id,
							'email' => $csv[$i][4]."@sussex.ac.uk"
						));
						$user->save();

						$student->fill(array(
							'id' => $user->id, 'registration_number' => $csv[$i][0]
						));

						$student->save();
					}
				});

				$users = User::where('privileges', 'student')->get();
				$students = Student::all();
				$view = view('admin.partials.import-student-table')
					->with('users', $users)->with('students', $students)
					->render();

				return response()->json(array(
					'successful' => true, 'message' => $view
				));
			}
		}

		return response()->json(array(
			'successful' => false, 'message' => 'Invalid file.'
		));
	}

	/**
	 * The import students view.
	 *
	 * @param $csv
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
			DB::table('test_users')->insert(array(
				'id' => $id, 
				'last_name' => $csv[$i][1],
				'first_name' => $csv[$i][2],
				'programme' => $csv[$i][3],
				'username' => $csv[$i][4],
				'email' => $csv[$i][4]."@test.ac.uk"
			));

			DB::table('test_students')->insert(array(
				'id' => $id, 'registration_number' => $csv[$i][0]
			));
		}

		$users = DB::table('test_users')->select('*')->get();
		$students = DB::table('test_students')->select('*')->get();
		$view = view('admin.partials.import-student-table')
			->with('users', $users)->with('students', $students)->render();

		return response()->json(array(
			'successful' => true, 'message' => $view
		));
	}
}
