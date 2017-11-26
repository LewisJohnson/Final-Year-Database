<?php
namespace SussexInformaticsProjects\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use SussexInformaticsProjects\User;
use SussexInformaticsProjects\Supervisor;

class AdminController extends Controller{
	public function index(){
		return view('admin.index');
	}

	public function summaryStudents(){
		return view('admin.summary.students');
	}

	public function summarySupervisors(){
		return view('admin.summary.supervisors');
	}

	public function importStudents(){
		return view('admin.import');
	}

	public function supervisors(){
		return view('admin.supervisors');
	}

	public function supervisorArrangements($id){
		$supervisor = Supervisor::where('id', $id)->first();
		return view('admin.supervisor-arrangements')->with('supervisor', $supervisor);
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

