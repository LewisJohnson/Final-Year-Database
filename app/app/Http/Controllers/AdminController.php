<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use SussexProjects\User;
use SussexProjects\Supervisor;
use SussexProjects\TopicUg;
use SussexProjects\TopicMasters;
use Session;

class AdminController extends Controller{
	public function index(){
		return view('admin.index');
	}

	public function importStudents(){
		return view('admin.import');
	}

	public function amendSupervisorArrangements(){
		$supervisors = Supervisor::all();
		return view('admin.arrangements')
		->with('supervisors', $supervisors);;
	}
	
	public function amendTopics(){
		
		if(Session::get("db_type") == "ug"){
			$topics = TopicUg::all();

		} elseif(Session::get("db_type") == "masters") {
			$topics = TopicMasters::all();
		}

		return view('admin.amend-topics')
				->with('topics', $topics);
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