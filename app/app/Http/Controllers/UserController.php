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
		$this->middleware('auth');
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
		$supervisors = Supervisor::all();
		$staffUsers = User::Where('privileges', 'staff')->get();

		$students = $students->sortBy(function($student){
			return $student->user->last_name;
		});

		$supervisors = $supervisors->sortBy(function($supervisor){
			return $supervisor->user->last_name;
		});

		$staffUsers = $staffUsers->sortBy(function($staff){
			return $staff->last_name;
		});

		return view('users.index')->with('supervisors', $supervisors)
			->with('staff', $staffUsers)->with('students', $students)
			->with('view', $request->query("view"));
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
		if(!$this->checkPrivilegeConditions($request->privileges)){
			return redirect()->action('HomeController@index');
		}

		$user = new User;
		DB::transaction(function() use ($request, $user){
			$user->fill(array(
				'first_name' => $request['first_name'],
				'last_name' => $request['last_name'],
				'username' => $request['username'],
				'password' => bcrypt($request['password']),
				'programme' => $request['programme'],
				'email' => $request['email']
			));

			$user->save();

			if(in_array("student", $request->privileges)){
				$student = Student::create([
					'id' => $user->id,
					'registration_number' => $request['registration_number'],
				]);
				$student->save();
			}

			if(in_array("supervisor", $request->privileges)){
				$supervisor = Supervisor::create([
					'id' => $user->id, 'title' => $request['title'],
					'project_load_'.Session::get('education_level')['shortName'] => $request['project_load_'.Session::get('education_level')['shortName']],
					'take_students_'.Session::get('education_level')['shortName'] => $request['take_students_'.Session::get('education_level')['shortName']],
					'accept_email_'.Session::get('education_level')['shortName'] => $request['accept_email_'.Session::get('education_level')['shortName']]
				]);
				$supervisor->save();
			}

			$string = "UPDATE `?` SET `privileges`= '?' WHERE `id`= '?'";
			$replaced = str_replace_array('?', [
				Session::get("department").'_users',
				implode(",", $request->privileges), $user->id
			], $string);
			DB::statement($replaced);

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
	public function projects(User $user){
		$projects = Project::where('supervisor_id', $user->id);

		if(Auth::user() == $user){
			$view = 'personal';
		} else {
			$view = 'supervisor';
		}

		if($view == 'supervisor'){
			$projects->where('status', 'on-offer');
		}

		return view('projects.index')->with('projects', $projects->get())
			->with('owner', $user)->with('view', $view);
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
	public function update(UserForm $user, Request $request){
		if(!$this->checkPrivilegeConditions($request->privileges)){
			return redirect()->action('HomeController@index');
		}

		DB::transaction(function() use ($request, $user){
			$user->fill(array(
				'first_name' => $request['first_name'],
				'last_name' => $request['last_name'],
				'username' => $request['username'],
				'password' => bcrypt($request['password']),
				'programme' => $request['programme'],
				'email' => $request['email']
			));

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

			if(in_array("supervisor", $request->privileges)){
				if($user->isSupervisor()){
					// If they are a student already, update
					$user->supervisor->fill([
						'id' => $user->id, 'title' => $request['title'],
						'project_load_'.Session::get('education_level')['shortName'] => $request['project_load_'.Session::get('education_level')['shortName']],
						'take_students_'.Session::get('education_level')['shortName'] => $request['take_students_'.Session::get('education_level')['shortName']],
						'accept_email_'.Session::get('education_level')['shortName'] => $request['accept_email_'.Session::get('education_level')['shortName']]
					]);
					$user->supervisor->save();
				} else {
					// Else, create a new supervisor
					$supervisor = Supervisor::create([
						'id' => $user->id, 'title' => $request['title'],
						'project_load_'.Session::get('education_level')['shortName'] => $request['project_load_'.Session::get('education_level')['shortName']],
						'take_students_'.Session::get('education_level')['shortName'] => $request['take_students_'.Session::get('education_level')['shortName']],
						'accept_email_'.Session::get('education_level')['shortName'] => $request['accept_email_'.Session::get('education_level')['shortName']]
					]);
					$supervisor->save();
				}
			}

			$user->save();
			$string = "UPDATE `?` SET `privileges`= '?' WHERE `id`= '?'";
			$replaced = str_replace_array('?', [
				Session::get("department").'_users',
				implode(",", $request->privileges), $user->id
			], $string);
			DB::statement($replaced);

		});

		session()->flash('message', 'User was updated.');
		session()->flash('message_type', 'success');

		return redirect()->action('HomeController@index');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \SussexProjects\User $user
	 *
	 * @return \Illuminate\Http\Response
	 */
	//	public function destroy(User $user){
	//		//
	//	}
}
