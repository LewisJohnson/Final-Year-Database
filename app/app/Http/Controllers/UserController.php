<?php
namespace SussexProjects\Http\Controllers;

use SussexProjects\User;
use SussexProjects\StudentUg;
use SussexProjects\StudentMasters;
use SussexProjects\Supervisor;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use DB;
use Session;

class UserController extends Controller{

	public function __construct(){ 
		$this->middleware('auth'); 
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
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request){
		$result = DB::transaction(function() use ($request) {
			$user = User::create([
				'username' => $request['username'],
				'first_name' => $request['first_name'],
				'last_name' => $request['last_name'],
				'access_type' => $request['access_type'],
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



	public function showEdit(User $user){
		if(Session::get("db_type") == "ug"){
			$students = StudentUg::all();

		} elseif(Session::get("db_type") == "masters") {
			$students = StudentMasters::all();
		}

		$supervisors = Supervisor::all();
		$staffUsers = User::Where('access_type', 'staff')->get();

		$students = $students->sortBy(function($student, $key) {
			return $student->user->last_name;
		});

		$supervisors = $supervisors->sortBy(function($supervisor, $key) {
			return $supervisor->user->last_name;
		});

		$staffUsers = $staffUsers->sortBy(function($staff, $key) {
			return $staff->last_name;
		});

		return view('users.edit-users')
			->with('supervisors', $supervisors)
			->with('staff', $staffUsers)
			->with('students', $students);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \SussexProjects\User  $user
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id){
		$editUser = User::findOrFail($id);
		return view('users.edit')->with('editUser', $editUser);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function update($request){
		dd($request);
		// todo: add form validation
		$result = DB::Transaction(function($id) use ($id){
			if(Session::get("db_type") == "ug"){
				$project = ProjectUg::findOrFail($id);
				$transaction = new TransactionUg;
			} elseif(Session::get("db_type") == "masters") {
				$project = ProjectMasters::findOrFail($id);
				$transaction = new TransactionMasters;
			}
			$project->update(request(['title', 'description', 'skills', 'status']));
			$transaction->fill(array(
				'transaction_type' =>'updated',
				'project_id' => $project->id,
				'supervisor_id' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();
			session()->flash('message', '"'.$project->title.'" has been updated.');
			session()->flash('message_type', 'success');
			return redirect()->action('ProjectController@show', $project);
		});

		return $result;
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
