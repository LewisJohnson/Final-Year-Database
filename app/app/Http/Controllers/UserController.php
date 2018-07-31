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
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\ValidationException;
use SussexProjects\Http\Requests\UserForm;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\User;

/**
 * The user controller.
 * Handles all functions related to users.
 */
class UserController extends Controller{

	public function __construct(){
		parent::__construct();
	}

	/**
	 * A list of all users in the system.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\View\View
	 */
	public function index(Request $request){
		$students = Student::all();
		$supervisors = Supervisor::getAllSupervisorsQuery()->get();
		$staffUsers = User::where('privileges', 'staff')->get();
		$noPrivilegesUsers = User::whereNull('privileges')->get();
		$admins = [];

		$students = $students->sortBy(function($student){
			return $student->user->last_name;
		});

		$staffUsers = $staffUsers->sortBy(function($staff){
			return $staff->last_name;
		});

		$noPrivilegesUsers = $noPrivilegesUsers->sortBy(function($user){
			return $user->last_name;
		});

		if(Auth::user()->isSystemAdmin()){
			$admins = User::where('privileges', 'LIKE', '%admin_system%');

			foreach (get_education_levels() as $education_level) {
				$admins->orWhere('privileges', 'admin_'.$education_level["shortName"]);
			}

			$admins = $admins->get();

			$admins = $admins->sortBy(function($admin){
				return $admin->last_name;
			});
		}

		return view('users.index')
			->with('supervisors', $supervisors)
			->with('staff', $staffUsers)
			->with('students', $students)
			->with('admins', $admins)
			->with('noPrivilegesUsers', $noPrivilegesUsers);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create(){
		return view('users.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  UserForm $request
	 *
	 * @return \Illuminate\Http\RedirectResponse
	 */
	public function store(UserForm $request){
		// Validate Student
		if(in_array("student", $request->privileges)){
			$request->validate([
				'registration_number' => 'required'
			]);
		}

		// Validate Supervisor
		if(in_array("supervisor", $request->privileges)){
			$request->validate([
				'title' => 'required|max:6'
			]);
		}

		if(!$this->checkPrivilegeConditions($request->privileges)){
			return redirect()->action('HomeController@index');
		}

		$user = new User;
		DB::transaction(function() use ($request, $user){
			if ($request['programme'] === '') {
				$request['programme'] = null;
			}
			
			$user->fill(array(
				'first_name' => $request['first_name'],
				'last_name' => $request['last_name'],
				'username' => $request['username'],
				'programme' => $request['programme'],
				'email' => $request['email']
			));

			$user->save();

			if (!empty($request->privileges) && is_array($request->privileges)){
				if(in_array("student", $request->privileges)){
					$student = Student::create([
						'id' => $user->id,
						'registration_number' => $request['registration_number'],
					]);
					$student->save();
				}

				if(in_array("supervisor", $request->privileges)){
					$supervisor = new Supervisor();
					$supervisor['id'] = $user->id;
					$supervisor['title'] = $request->title;

					foreach (get_education_levels() as $education_level) {
						$supervisor['project_load_'.$education_level['shortName']] = $request['project_load_'.$education_level['shortName']];
						$supervisor['take_students_'.$education_level['shortName']] = empty($request['take_students_'.$education_level['shortName']]);
						$supervisor['accept_email_'.$education_level['shortName']] = empty($request['accept_email_'.$education_level['shortName']]);
					}

					$supervisor->save();
				}

				$string = "UPDATE `?` SET `privileges`= '?' WHERE `id`= '?'";
				$replaced = str_replace_array('?', [Session::get("department").'_users', implode(",", $request->privileges), $user->id], $string);
				DB::statement($replaced);
			}

			return true;
		});

		session()->flash('message', 'User was created.');
		session()->flash('message_type', 'success');

		return redirect()->action('HomeController@index');
	}

	/**
	 * Checks multiple privilege conditions.
	 * First, checks whether or not the $privileges array confirms to the rules.
	 * Second, checks whether or not the currently authenticated used has sufficient privileges to perform action.
	 * This method throws an exception if a condition fails.
	 * **RULES**
	 * - Staff is a unique privilege
	 * - User can NOT be student and an admin
	 * - User can NOT be student and a supervisor
	 * **AUTHENTICATION RULES**
	 * - EducationLevel_X administrator can create staff, student_X and admin_X.
	 *        - Where X is typically undergraduate or postgraduate
	 * - System administrator can create all types of users.
	 * - Only administrators can create users.
	 *
	 * @param  string[] $privileges
	 *
	 * @return boolean Returns true if all conditions passed
	 */
	public static function checkPrivilegeConditions($privileges){
		if (empty($privileges) || !(is_array($privileges))){
			// No privileges selected
			return true;
		}

		$amountOfPrivileges = count($privileges);
		$amountOfAdminPrivileges = 0;
		$amountOfStudentPrivileges = 0;

		if(in_array("admin_system", $privileges)){
			$amountOfAdminPrivileges++;
		}

		foreach(get_education_levels(true) as $key => $level){
			if(in_array("admin_".$level, $privileges)){
				$amountOfAdminPrivileges++;
			}
			if(in_array("student_".$level, $privileges)){
				$amountOfStudentPrivileges++;
			}
		}

		if(in_array("staff", $privileges) && $amountOfPrivileges > 1){
			// Staff is a unique privilege
			$error = ValidationException::withMessages(["privileges" => ["Staff is a unique privilege."]]);
			throw $error;
		}

		if($amountOfStudentPrivileges > 0 && $amountOfAdminPrivileges > 0){
			// User can NOT be student and an admin
			$error = ValidationException::withMessages(["privileges" => ["Privileges student and administrator are not compatible."]]);
			throw $error;
		}

		if($amountOfStudentPrivileges > 0 && in_array("supervisor", $privileges)){
			// User can NOT be student and a supervisor
			$error = ValidationException::withMessages(["privileges" => ["Privileges student and supervisor are not compatible."]]);
			throw $error;
		}

		foreach(get_education_levels() as $key => $level){
			if(!Auth::user()->isAdminOfEducationLevel($level["shortName"])){
				if(!Auth::user()->isSystemAdmin()){
					if(in_array("admin_".$level["shortName"], $privileges) || in_array("student_".$level["shortName"], $privileges)){
						$error = ValidationException::withMessages([
							"privileges" => [
								"You are not allowed to create a ".$level["longName"]." administrator or student."
							]
						]);
						throw $error;
					}
				}
			}
		}

		if(!Auth::user()->isSystemAdmin()){
			if(in_array("admin_system", $privileges)){
				$error = ValidationException::withMessages(["privileges" => ["You are not allowed to create a system administrator."]]);
				throw $error;
			}
		}

		return true;
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \SussexProjects\User $user
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function show(User $user){
		return view('users.show', compact('user'));
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \SussexProjects\User $user
	 *
	 * @return \Illuminate\View\View
	 */
	public function projects(User $user, Request $request){
		$projects = Project::where('supervisor_id', $user->id);

		if(Auth::user() == $user){
			$view = 'personal';
		} else {
			$view = 'supervisor';
		}

		if($view == 'supervisor'){
			$projects->where('status', 'on-offer');
		}

		if(Auth::user()->isSupervisor()){
			$projects->where('status', '<>' , 'student-proposed');
		}

		if($view == 'personal'){
			if(isset($request->hide_archived)){
				Cookie::queue('hide_archived', $request->hide_archived, 525600);
			} else {
				$request->hide_archived =  Cookie::get('hide_archived');
			}

			if($request->hide_archived){
				$projects->where('status', '<>', 'archived');
			}
		}

		return view('projects.index')
			->with('projects', $projects->get())
			->with('owner', $user)
			->with('view', $view)
			->with('hide_archived', $request->hide_archived);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \SussexProjects\User $user
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function edit(User $user){
		return view('users.edit')->with('user', $user);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param UserForm         $user
	 * @param Request|UserForm $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update(UserForm $userForm){
		$request = request();
		$user = User::where('username', $userForm->username)->first();

		// Validate Student
		if(in_array("student", $request->privileges)){
			$request->validate([
				'registration_number' => 'required'
			]);
		}

		// Validate Supervisor
		if(in_array("supervisor", $request->privileges)){
			$request->validate([
				'title' => 'required|max:6'
			]);
		}

		// No privileges selected
		if (empty($request->privileges) || !(is_array($request->privileges))){
			$user->privileges = null;
			$user->save();

			session()->flash('message', 'User "'. $user->getFullName().'" has been updated successfully.');
			session()->flash('message_type', 'success');

			return redirect()->action('HomeController@index');
		}

		if(!$this->checkPrivilegeConditions($request->privileges)){
			return redirect()->action('HomeController@index');
		}

		DB::transaction(function() use ($request, $user){
			if ($request['programme'] === '') {
				$request['programme'] = null;
			}

			$user->update(array(
				'first_name' => $request['first_name'],
				'last_name' => $request['last_name'],
				'username' => $request['username'],
				'programme' => $request['programme'],
				'email' => $request['email']
			));

			// Update student privilege
			if(in_array("student", $request->privileges)){
				if($user->isStudent()){
					// If they are a student already, update
					$user->student->registration_number = $request['registration_number'];
					$user->student->save();
				} else {
					// Else, create a new student
					$student = Student::create([
						'id' => $user->id,
						'registration_number' => $request['registration_number'],
					]);
					$student->save();
				}
			}

			// If a user was a student and they had their student privilege revoked
			// Delete the student model (Remove them from student table)
			if(!in_array("student", $request->privileges) && $user->isStudent()){
				$user->student->delete();
			}

			// Update student supervisor
			if(in_array("supervisor", $request->privileges)){
				if($user->isSupervisor()){
					$supervisor = $user->supervisor;
				} else {
					$supervisor = new Supervisor();
					$supervisor['id'] = $user->id;
				}

				$supervisor['title'] = $request['title'];

			foreach (get_education_levels() as $education_level) {
					$supervisor['project_load_'.$education_level['shortName']] = $request['project_load_'.$education_level['shortName']];
					$supervisor['take_students_'.$education_level['shortName']] = empty($request['take_students_'.$education_level['shortName']]);
					$supervisor['accept_email_'.$education_level['shortName']] = empty($request['accept_email_'.$education_level['shortName']]);
				}

				$supervisor->save();
			}

			$user->save();
			$string = "UPDATE `?` SET `privileges`= '?' WHERE `id`= '?'";
			$replaced = str_replace_array('?', [Session::get("department").'_users', implode(",", $request->privileges), $user->id], $string);
			DB::statement($replaced);
		});

		session()->flash('message', 'User "'. $user->getFullName().'" has been updated successfully.');
		session()->flash('message_type', 'success');

		return redirect()->action('HomeController@index');
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function info(Request $request){
		$user = User::findOrFail($request->id);

		$infoString = "<h4>Information about \"".$user->getFullName()."\"</h4>";

		$infoString .= "<ul>";

		if($user->isStudent()){
			$infoString .= "<li>They are a student.</li>";
			$infoString .= "<li>Their project status is ".$user->student->project_status.".</li>";

			if($user->student->project == null){
				$infoString .= "<li>They do not have a project associated with them.</li>";
			} else {
				$infoString .= "<li>The project associated with them is titled \"".$user->student->project->title."\".</li>";
			}

			$infoString .= "<li>They have ".count($user->student->getProposedProjectsWithoutSupervisor())." proposed projects without a supervisor.</li>";
			$infoString .= "<li style='list-style: none;opacity:.3'><hr></li>";
		}

		if($user->isSupervisor()){
			$infoString .= "<li>They are a supervisor.</li>";
			$infoString .= "<li>They have ".count($user->supervisor->getProjects())." projects.</li>";
			$infoString .= "<li>They have ".count($user->supervisor->getIntrestedStudents())." interested students.</li>";
			$infoString .= "<li>They have ".count($user->supervisor->getAcceptedStudents())." accepted students.</li>";
			$infoString .= "<li>They have ".count($user->supervisor->getStudentProjectProposals())." students who have proposed a project to them.</li>";
			$infoString .= "<li>They are second supervisor to ".count($user->supervisor->getSecondSupervisingStudents())." students.</li>";
			$infoString .= "<li style='list-style: none;opacity:.3'><hr></li>";
		}

		if($user->isProjectAdmin()){
			$infoString .= "<li>They are a project administrator.</li>";
			$infoString .= "<li style='list-style: none;opacity:.3'><hr></li>";
		}

		if($user->isSystemAdmin()){
			$infoString .= "<li>They are a system administrator.</li>";
			$infoString .= "<li style='list-style: none;opacity:.3'><hr></li>";
		}

		if($user->isStaff()){
			$infoString .= "<li>They are a staff member.</li>";
		}

		$infoString .= "</ul>";

		return response()->json(array('message' => $infoString));
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Request $request){
		$result = DB::transaction(function() use ($request){
			$user = User::findOrFail($request->id);

			if($user->isSupervisor()){
				foreach($user->supervisor->getIntrestedStudents() as $interested) {
					$student = $interested['student'];
					$student->project_id = null;
					$student->project_status = 'none';
					$student->save();
				}

				foreach($user->supervisor->getAcceptedStudents() as $accepted) {
					$student = $accepted['student'];
					$student->project_id = null;
					$student->project_status = 'none';
					$student->save();
				}

				foreach($user->supervisor->getStudentProjectProposals() as $proposed) {
					$student = $proposed['student'];
					$student->project_id = null;
					$student->project_status = 'none';
					$student->project->supervisor_id = null;
					$student->project->save();
					$student->save();
				}

				foreach($user->supervisor->getSecondSupervisingStudents() as $second) {
					$student = $second['student'];
					$student->marker_id = null;
					$student->save();
				}

				$projects = Project::where('supervisor_id', $user->id)->delete();
			}

			if($user->isStudent()){
				$projects = Project::where('student_id', $user->id)->delete();
			}
			$user->delete();

			return response()->json(array('successful' => true, 'message' => 'User has been deleted.'));
		});

		return $result;
	}
}
