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

	public function acceptStudent(Request $request){
		try {
			DB::transaction(function ($request) use ($request) {
				if(Session::get("db_type") == "ug"){
					$student = StudentUg::find(request('student_id'))->first();
					$transaction = new TransactionUg;
				} else {
					$student = StudentMasters::find(request('student_id'))->first();
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

				session()->flash('message', ($student->id . 'has been accepted.'));
				session()->flash('message_type', 'success');

				return 'true';
			});
		} catch(ModelNotFoundException $err){
			session()->flash('message', 'There was a problem accepting the student.');
			session()->flash('message_type', 'danger');
			return 'false';
		}
	}

	public function rejectStudent(Request $request){

		try {
			DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				$student = StudentUg::find(request('student_id'))->first();
				$transaction = new TransactionUg;
			} else {
				$student = StudentMasters::find(request('student_id'))->first();
				$transaction = new TransactionMasters;
			}

			$transaction->fill(array(
				'transaction_type' =>'rejected',
				'project_id' => request('project_id'),
				'student_id' => $student->id,
				'supervisor_id' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();

			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();

			session()->flash('message', ($student->id . 'has been rejected.'));
			session()->flash('message_type', 'success');

			return 'true';
			});
		} catch(ModelNotFoundException $err){
			session()->flash('message', 'There was a problem rejecting the student.');
			session()->flash('message_type', 'danger');
			return 'false';
		}
	}

	public function report(){
		if(Session::get("db_type") == "ug"){
			$supervisors = Supervisor::all();
		} else {
			// $supervisors = StudentMasters::find?(request('student_id'))->first();
		}
		return view('supervisors.report')->with("supervisors", $supervisors);
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
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		//
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function edit($id)
	{
		//
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

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}

}
