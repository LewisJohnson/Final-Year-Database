<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use SussexProjects\User;
use SussexProjects\Student;
use SussexProjects\Project;
use SussexProjects\Supervisor;
use SussexProjects\Http\Requests\StoreUser;

/**
 * The user controller.
 *
 * Handles all functions related to users.
 * 
*/
class UserController extends Controller{

	public function __construct(){ 
		$this->middleware('auth'); 
	}

	/**
	 * A list of all users in the system.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request){
		$students = Student::all();
		$supervisors = Supervisor::all();
		$staffUsers = User::Where('privileges', 'staff')->get();

		$students = $students->sortBy(function($student, $key) {
			return $student->user->last_name;
		});

		$supervisors = $supervisors->sortBy(function($supervisor, $key) {
			return $supervisor->user->last_name;
		});

		$staffUsers = $staffUsers->sortBy(function($staff, $key) {
			return $staff->last_name;
		});

		return view('users.index')
			->with('supervisors', $supervisors)
			->with('staff', $staffUsers)
			->with('students', $students)
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
	 * @param  StoreUser  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(StoreUser $request){
		// todo: add form validation

		if(!$this->checkPrivilegeConditions($request->privileges)){
			return;
		}

		$result = DB::transaction(function() use ($request) {
			$user = User::create([
				'username' => $request['username'],
				'first_name' => $request['first_name'],
				'last_name' => $request['last_name'],
				'email' => $request['email'],
				'password' => bcrypt($request['password']),
			]);

			if($user->access_type == "student"){
				Student::create([
					'id' => $user->id,
					'registration_number' => $request['registration_number'],
					'programme' => $request['programme']
				]);
			} else if ($user->access_type == "supervisor"){
				dd("Not implemented yet.");
				// Supervisor::create([
				// 	'id' => $user->id,
				// 	'title' => $request['title'],
				// 	'contact_type' => $request['contact_type'],
				// 	'project_load' => $request['project_load'],
				// 	'take_students' => isset($request['take_students']),
				// ]);
			}
		});

		session()->flash('message', 'User was created.');
		session()->flash('message_type', 'success');
		return redirect()->action('HomeController@index');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \SussexProjects\User  $user
	 * @return \Illuminate\Http\Response
	 */
	public function show(User $user){
		return view('users.show', compact('user'));
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \SussexProjects\User  $user
	 * @return \Illuminate\Http\Response
	 */
	public function projects(User $user){
		if(Auth::user() == $user){
			$view = 'personal';
		} else {
			$view = 'supervisor';
		}

		//todo: add student proposed projects
		$projects = Project::where('supervisor_id', $user->id)->get();

		return view('projects.index')
			->with('projects', $projects)
			->with('owner', $user)
			->with('view', $view);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \SussexProjects\User  $user
	 * @return \Illuminate\Http\Response
	 */
	public function edit(User $user){
		return view('users.edit')
		->with('user', $user);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function update(StoreUser $user){
		dd($request);
		return null;
	}


	/**
	 * Checks multiple privilege conditions.
	 *
	 * First, checks whether or not the $privileges array confirms to the rules.
	 * Second, checks whether or not the currently authenticated used has sufficient privileges to perform action.
	 * 
	 * This method throws an exception if a condition fails.
	 * 
	 * **RULES**
	 * - Guest is a unique privilege
	 * - Staff is a unique privilege
	 * - User can NOT be student and an admin
	 * - User can NOT be student and a supervisor
	 * 
	 * **AUTHENTICATION RULES**
	 * - EducationLevel_X administrator can create guest, staff, student_X and admin_X.
	 * 		- Where X is typically undergraduate or postgraduate
	 * - System administrator can create all types of users.
	 * - Only administrators can create users.
	 * 
	 * @param  string[]  $privileges
	 * @return boolean Returns true if all conditions passed
	 */
	public static function checkPrivilegeConditions($privileges){
		$amountOfPrivileges = count($privileges);
		$amountOfAdminPrivileges = 0;
		$amountOfStudentPrivileges = 0;
		
		if(in_array("admin_system", $privileges)){ $amountOfAdminPrivileges++; }

		foreach (get_education_levels(true) as $key => $level) {
			if(in_array("admin_".$level, $privileges)){ $amountOfAdminPrivileges++; }
			if(in_array("student_".$level, $privileges)){ $amountOfStudentPrivileges++; }
		}

		if(in_array("guest", $privileges) && $amountOfPrivileges > 1){
			// Guest is a unique privilege
			$error = ValidationException::withMessages([ "privileges" => ["Guest is a unique privilege."]]);
			throw $error;
		}

		if(in_array("staff", $privileges) && $amountOfPrivileges > 1){
			// Staff is a unique privilege
			$error = ValidationException::withMessages([ "privileges" => ["Staff is a unique privilege."]]);
			throw $error;
		}

		if($amountOfStudentPrivileges > 0 && $amountOfAdminPrivileges > 0){
			// User can NOT be student and an admin
			$error = ValidationException::withMessages([ "privileges" => ["Privileges student and administrator are not compatible."]]);
			throw $error;
		}

		if($amountOfStudentPrivileges > 0 && in_array("supervisor", $privileges)){
			// User can NOT be student and a supervisor
			$error = ValidationException::withMessages([ "privileges" => ["Privileges student and supervisor are not compatible."]]);
			throw $error;
		}

		foreach (get_education_levels() as $key => $level) {
			if(!Auth::user()->isSystemAdmin() || !Auth::user()->isAdminOfEducationLevel($level)){
				if(in_array("admin_".$level["shortName"], $privileges) || in_array("student_".$level["shortName"], $privileges)){
					$error = ValidationException::withMessages([ "privileges" => ["You are not allowed to create a ".$level["longName"]." administrator or student."]]);
					throw $error;
				}
			}
		}

		if(!Auth::user()->isSystemAdmin()){
			if(in_array("admin_system", $privileges)){
				$error = ValidationException::withMessages([ "privileges" => ["You are not allowed to create a system administrator."]]);
				throw $error;
			}
		}

		return true;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \SussexProjects\User  $user
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(User $user){
		//
	}
}
