<?php
namespace SussexProjects\Http\Controllers;

use SussexProjects\User;
use SussexProjects\StudentUg;
use SussexProjects\StudentMasters;
use SussexProjects\Supervisor;
use SussexProjects\Http\Requests\StoreUser;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserController extends Controller{

	public function __construct(){ $this->middleware('auth'); }

	public function index(Request $request){
		if(Session::get("db_type") == "ug"){
			$students = StudentUg::all();
		} elseif(Session::get("db_type") == "masters") {
			$students = StudentMasters::all();
		}

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
				if(Session::get("db_type") == "ug"){
					StudentUg::create([
						'id' => $user->id,
						'registration_number' => $request['registration_number'],
						'programme' => $request['programme']
					]);
				} else {
					StudentMasters::create([
						'id' => $user->id,
						'registration_number' => $request['registration_number'],
						'programme' => $request['programme']
					]);
				}
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
		return redirect('/');
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
	 * Show the form for editing the specified resource.
	 *
	 * @param  \SussexProjects\User  $user
	 * @return \Illuminate\Http\Response
	 */
	public function edit(User $user){
		return view('users.edit')->with('user', $user);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function update(StoreUser $user){
		dd($request);
		return "null";
	}

	public static function checkPrivilegeConditions($privileges){
		$amountOfPrivileges = count($privileges);
		$amountOfAdminPrivileges = 0;
		$amountOfStudentPrivileges = 0;

		if(in_array("admin_ug", $privileges)){ $amountOfAdminPrivileges++; }
		if(in_array("admin_masters", $privileges)){ $amountOfAdminPrivileges++; }
		if(in_array("admin_system", $privileges)){ $amountOfAdminPrivileges++; }

		if(in_array("student_ug", $privileges)){ $amountOfStudentPrivileges++; }
		if(in_array("student_masters", $privileges)){ $amountOfStudentPrivileges++; }

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
			// User can't be student and an admin
			$error = ValidationException::withMessages([ "privileges" => ["Privileges student and administrator are not compatible."]]);
			throw $error;
		}

		if($amountOfStudentPrivileges > 0 && in_array("supervisor", $privileges)){
			// User can't be student and a supervisor
			$error = ValidationException::withMessages([ "privileges" => ["Privileges student and supervisor are not compatible."]]);
			throw $error;
		}

		if(!Auth::user()->isSystemAdmin() || !Auth::user()->isMastersAdmin()){
			if(in_array("admin_masters", $privileges) || in_array("student_masters", $privileges)){
				// Log::alert('Illegal activity detected.', ['user' => json_encode(Auth::user(), JSON_PRETTY_PRINT)]);
				$error = ValidationException::withMessages([ "privileges" => ["You are not allowed to create a masters administrator or student."]]);
				throw $error;
			}
		}

		if(!Auth::user()->isSystemAdmin() || !Auth::user()->isUgAdmin()){
			if(in_array("admin_ug", $privileges) || in_array("student_ug", $privileges)){
				// Log::alert('Illegal activity detected.', ['user' => json_encode(Auth::user(), JSON_PRETTY_PRINT)]);
				$error = ValidationException::withMessages([ "privileges" => ["You are not allowed to create an undergraduate administrator or student"]]);
				throw $error;
			}
		}

		if(!Auth::user()->isSystemAdmin()){
			if(in_array("admin_system", $privileges)){
				// Log::alert('Illegal activity detected.', ['user' => json_encode(Auth::user(), JSON_PRETTY_PRINT)]);
				$error = ValidationException::withMessages([ "privileges" => ["You are not allowed to create a system administrator."]]);
				throw $error;
			}
		}

		return "";
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
