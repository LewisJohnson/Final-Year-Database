<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Carbon;
use SussexProjects\User;
use SussexProjects\Supervisor;
use SussexProjects\TopicUg;
use SussexProjects\TopicMasters;
use SussexProjects\StudentUg;
use SussexProjects\StudentMasters;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectMasters;
use SussexProjects\UserAgentString;
use SussexProjects\TransactionUg;
use SussexProjects\TransactionMasters;

class AdminController extends Controller{

	public function __construct(){
		$this->middleware('auth');
		$this->paginationCount = 100;
	}

	public function index(){
		return view('admin.index');
	}

	public function parameters(){
		return view('admin.parameters');
	}

	public function importStudents(){
		return view('admin.import');
	}

	public function userAgent(Request $request){
		if($request->query("unique") == "1"){
			$userAgents = UserAgentString::where('first_visit', 1);
		}
		else{
			$userAgents = UserAgentString::where('first_visit', 0);
		}

		if($request->query("page")){
			return view('system.partials.user-agent-row')
			->with('userAgents', $userAgents->paginate($this->paginationCount));
		} else {
			return view('system.user-agent')
			->with('userAgents', $userAgents->paginate($this->paginationCount));
		}
	}

	public function showAmendSupervisorArrangements(){
		$supervisors = Supervisor::all();
		return view('admin.arrangements')
			->with('supervisors', $supervisors);
	}


	public function amendSupervisorArrangements(Request $request){
		if(isset($request->project_load)){
			$request->validate([
				'project_load' => 'numeric',
			]);
		};

		foreach ($request->all() as $key => $value) {
			if (strpos($key, 'supervisor-') === 0) {
				preg_match('/\d+/', $key, $id);

				if(is_null($id[0])){ continue; }

				$supervisor = Supervisor::findOrFail($id[0]);

				if(Session::get("db_type") == "ug"){
					if(isset($request->project_load)){
						$supervisor->project_load_ug = $request->project_load;
					}
					$supervisor->take_students_ug = isset($request->take_students) ? true : false;
				} elseif(Session::get("db_type") == "masters") {
					if(isset($request->project_load)){
						$supervisor->project_load_masters = $request->project_load;
					}
					$supervisor->take_students_masters = isset($request->take_students) ? true : false;
				}
				$supervisor->save();
			}
		}
		$supervisors = Supervisor::all();
		return view('admin.arrangements')
			->with('supervisors', $supervisors);
	}

	public function showAmendTopics(){

		if(Session::get("db_type") == "ug"){
			$topics = TopicUg::all();

		} elseif(Session::get("db_type") == "masters") {
			$topics = TopicMasters::all();
		}

		return view('admin.amend-topics')
			->with('topics', $topics);
	}

	public function loginAsView(){
		if(Session::get("db_type") == "ug"){
			$students = StudentUg::all();

		} elseif(Session::get("db_type") == "masters") {
			$students = StudentMasters::all();
		}

		$supervisors = Supervisor::all();
		$staffUsers = User::Where('access_type', 'staff')->get();

		$students = $students->sortBy(function ($student, $key) {
			return $student->user->last_name;
		});

		$supervisors = $supervisors->sortBy(function ($supervisor, $key) {
			return $supervisor->user->last_name;
		});

		$staffUsers = $staffUsers->sortBy(function ($staff, $key) {
			return $staff->last_name;
		});

		return view('admin.login-as')
		// ->with('supervisors', $supervisors->sortBy('title'))
			->with('supervisors', $supervisors)
			->with('staff', $staffUsers)
			->with('students', $students);
	}

	public function archive(){
		return view('admin.archive');
	}

	public function showAssignMarker(Request $request){
		$supervisors = Supervisor::all();

		if(Session::get("db_type") == "ug"){
			$students = StudentUg::all();

		} elseif(Session::get("db_type") == "masters") {
			$students = StudentMasters::all();
		}

		$sorted = $students->sortBy(function ($student, $key) use ($request) {
			if($request->query("sort") == "firstname"){
				return $student->user->first_name;
			} elseif($request->query("sort") == "lastname"){
				return $student->user->last_name;
			}
		});

		return view('admin.assign-marker')
			->with('supervisors', $supervisors)
			->with('students', $sorted);
	}

	public function loginAs($id){
		$user = User::findOrFail($id);
		Auth::login($user);
		
		// Redirect
		session()->flash('message', 'You have logged in as '.$user->getFullName());
		session()->flash('message_type', 'success');

		return redirect('/');
	}

	public function export(Request $request){
		//todo: change to a temp file
		if($request->query("db") == "tran_ug"){
			$filename = "transactions-ug [".Carbon::now()->toDateString()."].json";
			$handle = fopen($filename, 'w+');
			fwrite($handle, json_encode(TransactionUg::all()->toArray(), JSON_PRETTY_PRINT));
			fclose($handle);
		}

		if($request->query("db") == "tran_masters"){
			$filename = "transactions-masters [".Carbon::now()->toDateString()."].json";
			$handle = fopen($filename, 'w+');
			fwrite($handle, json_encode(TransactionUg::all()->toArray(), JSON_PRETTY_PRINT));
			fclose($handle);
		}

		if($request->query("db") == "uas"){
			$filename = "user-agent-string [".Carbon::now()->toDateString()."].json";
			$handle = fopen($filename, 'w+');
			fwrite($handle, json_encode(UserAgentString::all()->toArray(), JSON_PRETTY_PRINT));
			fclose($handle);
		}

		$headers = array(
			'Content-Type' => 'text/json',
		);
		return response()->download($filename, $filename, $headers);
	}
}
