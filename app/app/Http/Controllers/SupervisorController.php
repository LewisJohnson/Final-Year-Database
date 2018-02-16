<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use SussexProjects\Supervisor;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectMasters;
use SussexProjects\StudentUg;
use SussexProjects\StudentMasters;
use SussexProjects\TransactionUg;
use SussexProjects\TransactionMasters;
use Illuminate\Support\Carbon;
use Session;
use DB;
use Auth;

class SupervisorController extends Controller{

	public function __construct(){
		$this->middleware('auth');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(){
		return view('supervisors.index');
	}


	/**
	 * Displays transactions for projects owned by supervisor
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function transactions(){
		$projects = Auth::user()->projects->pluck('id');

		if(Session::get("db_type") == "ug"){
			$transactions = TransactionUg::whereIn('project_id', $projects)->orderBy('transaction_date', 'desc')->get();
		} elseif(Session::get("db_type") == "masters") {
			$transactions = TransactionMasters::whereIn('project_id', $projects)->orderBy('transaction_date', 'desc')->get();
		}

		return view('supervisors.transactions')->with('transactions', $transactions);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		//
	}

	public function acceptStudent(Request $request){
		$this->validate(request(), [
			'student_id' => 'required',
			'project_id' => 'required',
		]);

		DB::transaction(function() use ($request) {
			if(Session::get("db_type") == "ug"){
				$student = StudentUg::findOrFail(request('student_id'));
				$project = ProjectUg::findOrFail(request('project_id'));
				$transaction = new TransactionUg;
			} else {
				$student = StudentMasters::findOrFail(request('student_id'));
				$project = ProjectMasters::findOrFail(request('project_id'));
				$transaction = new TransactionMasters;
			}

			if(Session::get("db_type") == "ug"){
				$acceptedStudent = StudentUg::where('project_id', $project->id)->where('project_status', 'accepted')->get();
				$selectedStudent = StudentUg::where('project_id', $project->id)->where('project_status', 'selected')->get();
			} else {
				$acceptedStudent = StudentMasters::where('project_id', $project->id)->where('project_status', 'accepted')->get();
				$selectedStudent = StudentMasters::where('project_id', $project->id)->where('project_status', 'selected')->get();
			}

			if($project->id != $student->project_id){
				die(json_encode(array('successful' => false, 'message' => 'Project ID and student project ID do not match up')));
			}

			if(count($acceptedStudent) != 0){
				die(json_encode(array('successful' => false, 'message' => 'This project has already been allocated to another student')));
			}

			if(count($selectedStudent) > 1){
				die(json_encode(array('successful' => false, 'message' => 'You must reject all other students before accepting a student')));
			}

			$student->project_status = 'accepted';
			$student->save();

			$transaction->fill(array(
				'type' =>'project',
				'action' =>'accepted',
				'project' => $student->project_id,
				'student' => $student->id,
				'supervisor' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();
		});

		return json_encode(array('successful' => true, 'message' => 'Student accepted'));
	}

	public function rejectStudent(Request $request){
		DB::transaction(function() use ($request) {
			if(Session::get("db_type") == "ug"){
				$student = StudentUg::findOrFail(request('student_id'));
				$transaction = new TransactionUg;
			} else {
				$student = StudentMasters::findOrFail(request('student_id'));
				$transaction = new TransactionMasters;
			}

			$transaction->fill(array(
				'type' =>'project',
				'action' =>'rejected',
				'project' => $student->project_id,
				'student' => $student->id,
				'supervisor' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();

			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();
		});

		return json_encode(array('successful' => true, 'message' => 'Student rejected'));
	}

	public function undo(Request $request){
		DB::transaction(function() use ($request) {
			if(Session::get("db_type") == "ug"){
				$student = StudentUg::findOrFail(request('student_id'));
				$transaction = new TransactionUg;
			} else {
				$student = StudentMasters::findOrFail(request('student_id'));
				$transaction = new TransactionMasters;
			}

			$transaction->fill(array(
				'type' =>'project',
				'action' =>'undo',
				'project' => $student->project_id,
				'student' => $student->id,
				'supervisor' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();

			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();
		});

		return json_encode(array('successful' => true, 'message' => 'Student rejected'));
	}

	public function report(Request $request){
		$supervisors = Supervisor::all();

		if($request->query("excludeClosedToOffer") === "true"){
			if(Session::get("db_type") == "ug"){
				$supervisors = $supervisors->filter(function ($supervisor, $key) {
					return $supervisor->take_students_ug;
				});
			} else {
				$supervisors = $supervisors->filter(function ($supervisor, $key) {
					return $supervisor->take_students_masters;
				});
			}
		}

		return view('supervisors.report')->with("supervisors", $supervisors);
	}

	public function acceptedStudentTable(){
		return view('supervisors.partials.accepted-students-table');
	}
}
