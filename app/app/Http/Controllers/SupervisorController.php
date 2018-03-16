<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use SussexProjects\Supervisor;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\Transaction;

/**
 * The supervisor controller.
 *
 * Handles all functions related to supervisors.
 * 
*/
class SupervisorController extends Controller{

	public function __construct(){
		$this->middleware('auth');
	}

	// *
	//  * Display a listing of the resource.
	//  *
	//  * @return \Illuminate\Http\Response
	 
	// public function index(){
	// 	return view('supervisors.index');
	// }

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function projectReport(){
		return view('supervisors.project-report');
	}
	

	/**
	 * The supervisor report.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function report(Request $request){
		$supervisors = Supervisor::all();

		if($request->query("excludeClosedToOffer") === "true"){
			$supervisors = $supervisors->filter(function ($supervisor, $key) {
				return $supervisor['take_students_'.Session::get('education_level')["shortName"]];
			});
		}

		return view('supervisors.report')->with("supervisors", $supervisors);
	}

	/**
	 * A table of all accepted students.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function acceptedStudentTable(){
		return view('supervisors.partials.accepted-students-table');
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
	 * Accepts a student for their selected project.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response JSON
	 */
	public function acceptStudent(Request $request){
		$this->validate(request(), [
			'student_id' => 'required',
			'project_id' => 'required',
		]);

		DB::transaction(function() use ($request) {
			$student = Student::findOrFail(request('student_id'));
			$project = Project::findOrFail(request('project_id'));
			$transaction = new Transaction;

			$acceptedStudent = Student::where('project_id', $project->id)->where('project_status', 'accepted')->get();
			$selectedStudent = Student::where('project_id', $project->id)->where('project_status', 'selected')->get();

			if($project->id != $student->project_id){
				return response()->json(array('successful' => false, 'message' => 'Project ID and student project ID do not match up'));
			}

			if(count($acceptedStudent) != 0){
				return response()->json(array('successful' => false, 'message' => 'This project has already been allocated to another student'));
			}

			if(count($selectedStudent) > 1){
				return response()->json(array('successful' => false, 'message' => 'You must reject all other students before accepting a student'));
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

		return response()->json(array('successful' => true, 'message' => 'Student accepted'));
	}

	/**
	 * Rejects a student for their selected project.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response JSON
	 */
	public function rejectStudent(Request $request){
		DB::transaction(function() use ($request) {
			$student = Student::findOrFail(request('student_id'));
			$transaction = new Transaction;

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

		return response()->json(array('successful' => true, 'message' => 'Student rejected'));
	}

	/**
	 * Undoes an accepted student.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response JSON
	 */
	public function undoStudent(Request $request){
		DB::transaction(function() use ($request) {
			$student = Student::findOrFail(request('student_id'));
			$transaction = new Transaction;

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

		$message = $student->user->getFullName()." is no longer accepted.";
		return response()->json(array('successful' => true, 'message' => $message));
	}
}
