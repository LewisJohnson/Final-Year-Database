<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use SussexProjects\User;
use SussexProjects\Supervisor;
use SussexProjects\TopicUg;
use SussexProjects\TopicMasters;
use SussexProjects\StudentUg;
use SussexProjects\StudentMasters;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectMasters;
use SussexProjects\UserAgentString;
use Session;

class AdminController extends Controller{

	public function __construct(){
		$this->paginationCount = 100;
	}

	public function index(){
		return view('admin.index');
	}

	public function importStudents(){
		return view('admin.import');
	}

	public function userAgent(){
		$userAgents = UserAgentString::paginate($this->paginationCount);

		return view('system.user-agent')
			->with('userAgents', $userAgents);
	}

	public function userAgentPaginated(){
		$userAgents = UserAgentString::paginate($this->paginationCount);

		return view('system.partials.user-agent-row')
			->with('userAgents', $userAgents);
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

	public function showAssignMarker(){
		$supervisors = Supervisor::all();

		if(Session::get("db_type") == "ug"){
			$students = StudentUg::all();

		} elseif(Session::get("db_type") == "masters") {
			$students = StudentMasters::all();
		}

		return view('admin.assign-marker')
		->with('supervisors', $supervisors)
		->with('students', $students);
	}

	public function loginAs($id){
		$user = User::find($id);
		Auth::login($user);
		return redirect('/');
	}
}