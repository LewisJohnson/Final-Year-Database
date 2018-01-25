<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use SussexProjects\Supervisor;
use SussexProjects\ProjectsUg;
use SussexProjects\ProjectsMasters;
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
		$result = DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				$student = StudentUg::findOrFail(request('student_id'));
				$transaction = new TransactionUg;
			} else {
				$student = StudentMasters::findOrFail(request('student_id'));
				$transaction = new TransactionMasters;
			}

			$student->project_status = 'accepted';
			$student->save();

			$transaction->fill(array(
				'transaction_type' =>'accepted',
				'project_id' => $student->project_id,
				'student_id' => $student->id,
				'supervisor_id' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();
		});

		return $result;
	}

	public function rejectStudent(Request $request){
		$result = DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				$student = StudentUg::findOrFail(request('student_id'));
				$transaction = new TransactionUg;
			} else {
				$student = StudentMasters::findOrFail(request('student_id'));
				$transaction = new TransactionMasters;
			}

			$transaction->fill(array(
				'transaction_type' =>'rejected',
				'project_id' => $student->project_id,
				'student_id' => $student->id,
				'supervisor_id' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();

			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();
		});

		return $result;
	}

	public function report(Request $request){
			$supervisors = Supervisor::all();
		
		if($request->query("excludeClosedToOffer") == "true"){
			$supervisors = $supervisors->where('take_students_ug', 1);
		} else {
		}
		return view('supervisors.report')->with("supervisors", $supervisors);
	}

	public function acceptedStudentTable(){
		return view('supervisors.partials.accepted-students-table');
	}
}
