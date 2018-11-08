<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Exception;
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

	/**
	 * The HTML purifier configuration used to sanitise project descriptions.
	 *
	 * @see http://htmlpurifier.org/live/configdoc/plain.html HTML purifier configuration documentation.
	 * @see https://github.com/ezyang/htmlpurifier The Laravel implementation of HTML purifier.
	 * @var string[] ~HTML purifier configuration
	 */
	public $htmlPurifyConfig;

	public function __construct(){
		parent::__construct();
		$this->middleware('auth');

		$purifier = Purify::getPurifier();
		$config = $purifier->config;

		$config->set('Core.RemoveProcessingInstructions', true);		
		$config->set('Attr.ID.HTML5', true);
		$config->set('AutoFormat.Linkify', true);
		$config->set('HTML.TargetBlank', true);
		$config->set('HTML.SafeObject', true);
		$config->set('HTML.SafeScripting', '');
		$config->set('HTML.ForbiddenElements', 'h1,h2,h3,h4,h5,h6,script,html,body');
		$config->set('Output.FlashCompat', true);
		$config->set('Cache.SerializerPath', base_path('storage/framework/cache'));
		
		$htmlPurifyConfig = $config;
	}

	/**
	 * Returns the first student in the DB without a second marker.
	 *
	 * @return Student The next student without a second marker assigned to them.
	 */
	public static function getStudentWithoutSecondMarker(){
		return $student = Student::whereNull('marker_id')->first();
	}

	/**
	 * The student report view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function report(){
		return view('students.report')
			->with('studentCount', Student::count());
	}

	/**
	 * Adds project to the students favourite projects list.
	 *
	 * @return void
	 */
	public function addFavouriteProject(Request $request){
		$project = Project::findOrFail($request->project_id);

		// It works.
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
	 * Removes a project from the students favourite projects list.
	 *
	 * @return void
	 */
	public function removeFavouriteProject(Request $request){
		$project = Project::findOrFail($request->project_id);
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
	 * @param \Illuminate\Http\Request $request
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
	 * @return \Illuminate\View\View|\Illuminate\Http\Response
	 */
	public function proposeProjectView(){
		$supervisors = Supervisor::getAllSupervisorsQuery()
			->where("take_students_".Session::get('education_level')["shortName"], true)
			->get();

		if(Auth::user()->student->project_status == "none"){
			return view("students.propose-project")->with('supervisors', $supervisors);
		} else {
			session()->flash('message_type', 'error');
			session()->flash('message', 'You already have a project selected.');
			return redirect()->action('HomeController@index');
		}
	}

	/**
	 * Adds student proposed project to the database.
	 *
	 * @param ProjectForm $request Student proposed project
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function proposeProject(ProjectForm $request){

		$student = Auth::user()->student;
		$result = DB::transaction(function() use ($request, $student){
			$project = new Project;
			$projectController = new ProjectController;
			$newlineFixedDescription = nl2br(request('description'));
			$clean_html = Purify::clean($newlineFixedDescription, $this->htmlPurifyConfig);

			$transaction = new Transaction;
			$supervisor = Supervisor::findOrFail(request('supervisor_id'));

			if(Mode::getProjectSelectionDate()->gt(Carbon::now())){
				session()->flash('message', 'You are not allowed to propose a project until '.Mode::getProjectSelectionDate(true).'.');
				session()->flash('message_type', 'error');
				return false;
			}

			if($student->project_status != 'none' || $student->project_id != null){
				session()->flash('message', 'You have already selected a project.');
				session()->flash('message_type', 'error');
				return false;
			}

			if(!$supervisor->user->isSupervisor()){
				session()->flash('message', 'Sorry, you\'re not allowed to propose a project to this supervisor.');
				session()->flash('message_type', 'error');
				return false;
			}

			if(!$supervisor->getTakingStudents()){
				session()->flash('message', 'Sorry, this supervisor is no longer accepting students.');
				session()->flash('message_type', 'error');
				return false;
			}

			$project->supervisor_id = request('supervisor_id');
			$project->student_id = Auth::user()->student->id;

			$project->fill(array(
				'title' => request('title'),
				'description' => $clean_html,
				'status' => "student-proposed",
				'skills' => request('skills')
			));

			$project->save();
			
			$transaction->fill(array(
				'type' => 'project',
				'action' => 'proposed',
				'project' => $project->id,
				'student' => Auth::user()->student->id,
				'supervisor' => $supervisor->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();

			$student->project_id = $project->id;
			$student->project_status = 'proposed';
			
			$student->save();

			session()->flash('message', 'You have proposed "'.$project->title.'" to '.$supervisor->user->getFullName());
			session()->flash('message_type', 'success');
			return true;
		});

		// Send student proposed email
		if($result){
			if($student->project->supervisor->getAcceptingEmails()){
				try{
					// Send accepted email
					Mail::to($student->project->supervisor->user->email)
						->send(new StudentProposed($student->project->supervisor, Auth::user()->student));
				} catch (Exception $e){

				}
			}
		}

		return redirect()->action('HomeController@index');
	}

	/**
	 * The student propose a project view (Form).
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function proposeExistingProjectView(Project $project){
		$supervisors = Supervisor::getAllSupervisorsQuery()
						->where("take_students_".Session::get('education_level')["shortName"], true)
						->get();

		if(Auth::user()->student->project_status == "none"){
			return view("students.propose-existing-project")->with('project', $project)->with('supervisors', $supervisors);
		} else {
			session()->flash('message_type', 'error');
			session()->flash('message', 'You already have a project selected.');
			return redirect()->action('HomeController@index');
		}
	}

	/**
	 * Adds student proposed project to the database.
	 *
	 * @param Request|ProjectForm $request Student proposed project
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function proposeExistingProject(Request $request){
		$request->validate([
			'project_id' => 'required',
			'supervisor_id' => 'required'
		]);

		$student = Auth::user()->student;
		$result = DB::transaction(function() use ($request, $student){
			$project = Project::findOrFail(request('project_id'));
			$supervisor = Supervisor::findOrFail(request('supervisor_id'));
			$transaction = new Transaction;

			if(Mode::getProjectSelectionDate()->gt(Carbon::now())){
				session()->flash('message', 'You are not allowed to propose a project until '.Mode::getProjectSelectionDate(true).'.');
				session()->flash('message_type', 'error');
				return false;
			}

			if($student->project_status != 'none' || $student->project_id != null){
				session()->flash('message', 'You have already selected a project.');
				session()->flash('message_type', 'error');
				return false;
			}

			if(!$supervisor->user->isSupervisor()){
				session()->flash('message', 'Sorry, you\'re not allowed to propose a project to this supervisor.');
				session()->flash('message_type', 'error');
				return false;
			}

			if($project->supervisor_id != null){
				session()->flash('message', 'You have already proposed this project to someone.');
				session()->flash('message_type', 'error');
				return false;
			}

			if($project->status != 'student-proposed'){
				session()->flash('message', 'This project is not a student proposed project.');
				session()->flash('message_type', 'error');
				return false;
			}

			if(!$supervisor->getTakingStudents()){
				session()->flash('message', 'Sorry, this supervisor is no longer accepting students.');
				session()->flash('message_type', 'error');
				return false;
			}

			if(!$project->isOwnedByUser()){
				session()->flash('message', 'This project does not belong to you.');
				session()->flash('message_type', 'error');
				return false;
			}

			$project->supervisor_id = $supervisor->id;

			$transaction->fill(array(
				'type' => 'project',
				'action' => 'proposed',
				'project' => $project->id,
				'student' => Auth::user()->student->id,
				'supervisor' => $supervisor->id,
				'transaction_date' => new Carbon
			));

			$project->save();
			$transaction->save();

			$student->project_id = $project->id;
			$student->project_status = 'proposed';
			
			$student->save();

			session()->flash('message', 'You have proposed "'.$project->title.'" to '.$supervisor->user->getFullName());
			session()->flash('message_type', 'success');
			return true;
		});

		if($result){
			// Send student proposed email
			if($student->project->supervisor->getAcceptingEmails()){
				try{
					// Send accepted email
					Mail::to($student->project->supervisor->user->email)
						->send(new StudentProposed($student->project->supervisor, Auth::user()->student));
				} catch (Exception $e){

				}
			}
		}

		return redirect()->action('HomeController@index');
	}

	/**
	 * Selects the requested project.
	 * If successful, the student will now have to wait to be approved or rejected.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response Home page
	 */
	public function selectProject(Request $request){

		$request->validate([
			'project_id' => 'required'
		]);

		$student = Auth::user()->student;
		$result = DB::transaction(function() use ($request, $student){
			$project = Project::findOrFail(request('project_id'));

			if(Mode::getProjectSelectionDate()->gt(Carbon::now())){
				session()->flash('message', 'You are not allowed to select a project until '.Mode::getProjectSelectionDate(true).'.');
				session()->flash('message_type', 'error');
				return false;
			}

			if($student->project_status != 'none' || $student->project_id != null){
				session()->flash('message', 'You have already selected a project.');
				session()->flash('message_type', 'error');
				return false;
			}

			if($project->status != "on-offer"){
				session()->flash('message', 'Sorry, this project is no longer on offer.');
				session()->flash('message_type', 'error');
				return false;
			}

			if(!$project->supervisor->user->isSupervisor()){
				session()->flash('message', 'Sorry, you\'re not allowed to propose a project to this supervisor.');
				session()->flash('message_type', 'error');
				return false;
			}

			if(!$project->supervisor->getTakingStudents()){
				session()->flash('message', 'Sorry, this supervisor is no longer accepting students.');
				session()->flash('message_type', 'error');
				return false;
			}

			$transaction = new Transaction;

			$student->project_id = $project->id;
			$student->project_status = 'selected';
			$student->save();

			$transaction->fill(array(
				'type' => 'project',
				'action' => 'selected',
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

		if($result){
			if($student->project->supervisor->getAcceptingEmails()){
				try{
					// Send selected email
					if($student->project->supervisor->getAcceptingEmails()){
						Mail::to($student->project->supervisor->user->email)
							->send(new StudentSelected($student->project->supervisor, Auth::user()->student));
					}
				} catch (Exception $e){

				}
			}
		}

		return redirect()->action('HomeController@index');
	}

	/**
	 * Undoes a selected project.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response JSON
	 */
	public function undoSelectedProject(){
		if(Auth::user()->student->project == null || Auth::user()->student->project_status == 'none'){
			return response()->json(array(
				'error' => true,
				'message' => "You currently have no project selected."
			));
		}

		if(Auth::user()->student->project_status == 'accepted'){
			return response()->json(array(
				'error' => true,
				'message' => "You have already been accepted for this project."
			));
		}

		$student = Auth::user()->student;
		$projectId = Auth::user()->student->project_id;

		DB::transaction(function() use ($student, $projectId){
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

			if($student->project->status == "student-proposed"){
				$student->project->supervisor_id = null;
			}

			$student->project->save();
		});

		if($student->project->supervisor->getAcceptingEmails()){
			try{
				// Send selected email
				if($student->project->supervisor->getAcceptingEmails()){
					Mail::to($student->project->supervisor->user->email)
						->send(new StudentUnselected($student->project->supervisor, $student, $projectId));
				}
			} catch (Exception $e){

			}
		}

		return response()->json(array(
			'successful' => true,
			'message' => "You have un-selected a project."
		));
	}

	/**
	 * Updates the students second marker.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function updateSecondMarker(Request $request){
		if(!Auth::user()->isAdminOfEducationLevel(Session::get('education_level')["shortName"])){
			session()->flash('message', 'Sorry, you are not allowed to perform this action.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		DB::transaction(function() use ($request){
			$project = Project::findOrFail(request('project_id'));
			$student = Student::findOrFail(request('student_id'));
			$marker = Supervisor::findOrFail(request('marker_id'));
			$transaction = new Transaction;

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
	 * The import students view.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function importStudentsView(){
		return view('admin.import');
	}

	/**
	 * Import students to the production or test database.
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
				'successful' => false,
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

				// EMPTY STUDENTS
				if(isset($request->empty_students)){
					$students = User::where('privileges', 'student');
					$students->delete();
				}

				// EMPTY PROGRAMMES
				if(isset($request->empty_programmes)){
					$userTable = new User;

					DB::beginTransaction();

					try{
						DB::table($userTable->getTable())->update(array('programme' => null));
						DB::statement("SET foreign_key_checks=0");
						Programme::truncate();
						DB::statement("SET foreign_key_checks=1");

						DB::commit();
					} catch (\Illuminate\Database\QueryException $e) {
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message' => 'Error with emptying programmes. Query Exception: '.$e
						));
					} catch (Exception $e) {
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message' => 'Error with emptying programmes. General Exception: '.$e
						));
					} catch (Throwable $e) {
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message' => 'Error with emptying programmes. Throwable Exception: '.$e
						));
					}
				}

				// AUTO PROGRAMMES
				if(isset($request->auto_programmes)){
					DB::beginTransaction();

					try{
						// Remove CSV header and tail
						for($i = 1; $i < count($csv); $i++){
							unset($studentProgramme, $autoProgramme);

							if($csv[$i][3] === NULL){
								throw new Exception("Student at row:".$i." has an invalid programme.");
							}
							$studentProgramme = $csv[$i][3];
							$studentProgramme = trim($studentProgramme);

							if(Programme::where('name', $studentProgramme)->first() == null){
								$autoProgramme = new Programme;
								$autoProgramme->name = $studentProgramme;
								$autoProgramme->save();
							}
						}

						DB::commit();
					} catch (\Illuminate\Database\QueryException $e) {
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message' => 'Query Exception: '.$e
						));
					} catch (Exception $e) {
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message' => 'General Exception: '.$e
						));
					} catch (Throwable $e) {
						DB::rollBack();
						return response()->json(array(
							'successful' => false,
							'message' => 'Throwable Exception: '.$e
						));
					}
				}

				// ACTUALLY IMPORT STUDENTS
				DB::beginTransaction();
				try{
					// Remove CSV header and tail
					for($i = 1; $i < count($csv); $i++){
						unset($user, $student, $studentProgramme, $studentProgrammeModel);

						if($csv[$i][0] == null){
							continue;
						}
						if($csv[$i][1] === NULL){
							throw new Exception("Student at row:".$i." has an invalid last name.");
						}
						if($csv[$i][2] === NULL){
							throw new Exception("Student at row:".$i." has an invalid first name.");
						}
						if($csv[$i][3] === NULL){
							throw new Exception("Student at row:".$i." has an invalid programme.");
						}
						if($csv[$i][4] === NULL){
							throw new Exception("Student at row:".$i." has an invalid username.");
						}
						if(User::where('username', $csv[$i][4])->first() !== null){
							throw new Exception("Student at row:".$i.". The username \"".$csv[$i][4]."\" is already in use.");
						}

						$user = new User;
						$student = new Student;
						$studentProgramme = $csv[$i][3];
						$studentProgrammeModel = Programme::where('name', $studentProgramme)->first();

						if($studentProgrammeModel === NULL){
							throw new Exception("There was a problem at row:".$i.". The programme name \"".$studentProgrammeModel."\" could not be imported.");
						}

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
							'id' => $user->id,
							'registration_number' => $csv[$i][0]
						));

						$student->save();
					}

					DB::commit();
				} catch (\Illuminate\Database\QueryException $e) {
					DB::rollBack();
					return response()->json(array(
						'successful' => false,
						'message' => 'Query Exception: '.$e
					));
				} catch (Exception $e) {
					DB::rollBack();
					return response()->json(array(
						'successful' => false,
						'message' => 'General Exception: '.$e
					));
				} catch (Throwable $e) {
					DB::rollBack();
					return response()->json(array(
						'successful' => false,
						'message' => 'Throwable Exception: '.$e
					));
				}

				$users = User::where('privileges', 'student')->get();
				$students = Student::all();
				$view = view('admin.partials.import-student-table')
					->with('users', $users)->with('students', $students)
					->render();

				return response()->json(array(
					'successful' => true,
					'message' => $view
				));
			}
		}

		return response()->json(array(
			'successful' => false,
			'message' => 'Invalid file.'
		));
	}

	/**
	 * Imports the students to the test database.
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
		for($i = 1; $i < count($csv); $i++){
			$id = $i;
			if($csv[$i][0] == null){
				continue;
			}
			DB::table('test_users')->insert(array(
				'id' => $id, 
				'last_name' => $csv[$i][1],
				'first_name' => $csv[$i][2],
				'programme' => $csv[$i][3],
				'username' => $csv[$i][4],
				'email' => $csv[$i][4]."@test.ac.uk"
			));

			DB::table('test_students')->insert(array(
				'id' => $id,
				'registration_number' => $csv[$i][0]
			));
		}

		$users = DB::table('test_users')
		->select('*')
		->get();

		$students = DB::table('test_students')
		->select('*')
		->get();

		$view = view('admin.partials.import-student-table')
			->with('users', $users)
			->with('students', $students)
			->render();

		return response()->json(array(
			'successful' => true,
			'message' => $view
		));
	}
}
