<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use SussexProjects\User;
use SussexProjects\Supervisor;

class AdminController extends Controller{
	public function index(){
		return view('admin.index');
	}

	public function importStudents(){
		return view('admin.import');
	}

	public function supervisorArrangements(){
		$supervisors = Supervisor::all();
		return view('admin.arrangements')
		->with('supervisors', $supervisors);;
	}
	
	public function topics(){
		return view('admin.topics');
	}

	public function loginAsView(){
		return view('admin.login-as');
	}

	public function archive(){
		return view('admin.archive');
	}
	public function loginAs($id){
		$user = User::find($id);
		Auth::login($user);
		return redirect('/');
	}
}

