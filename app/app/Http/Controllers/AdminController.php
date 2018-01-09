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
		if($request->query("unqiue") == "1"){
			$userAgents = UserAgentString::where('first_visit', 1)->paginate($this->paginationCount);
		}
		else{
			$userAgents = UserAgentString::paginate($this->paginationCount);
		}

		if($request->query("partial")){
			return view('system.partials.user-agent-row')
			->with('userAgents', $userAgents);
		} else {
			return view('system.user-agent')
			->with('userAgents', $userAgents);
		}
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
