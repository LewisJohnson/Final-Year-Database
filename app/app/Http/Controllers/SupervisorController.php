<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use SussexProjects\Mail\StudentAccepted;
use SussexProjects\Mail\StudentRejected;
use SussexProjects\Mail\SupervisorUndo;
use SussexProjects\Mode;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\Transaction;
use SussexProjects\User;

/**
 * The supervisor controller.
 * Handles all functions related to supervisors.
 */
class SupervisorController extends Controller{

	public function __construct(){
		parent::__construct();
		$this->middleware('auth');
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function projectReport(){
		return view('supervisors.project-report');
	}

	/**
	 * Display the most popular projects.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function projectPopularity(){
		return view('supervisors.project-popularity')
			->with("projects", Auth::user()->supervisor->getPopularProjects());
	}

	/**
	 * The supervisor report.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function report(Request $request){

		if(isset($request->sr_hide_closed)){
			Cookie::queue('sr_hide_closed', $request->sr_hide_closed, 525600);
		} else {
			$request->sr_hide_closed = Cookie::get('sr_hide_closed');
		}

		if($request->sr_hide_closed){
			$supervisors = Supervisor::getAllSupervisorsQuery()
				->where('take_students_'.Session::get('education_level')["shortName"], true)
				->get();
		} else {
			$supervisors = Supervisor::getAllSupervisorsQuery()->get();
		}

		return view('supervisors.report')
			->with('supervisors', $supervisors)
			->with('sr_hide_closed', $request->sr_hide_closed);
	}

	/**
	 * A table of all accepted students.
	 *
	 * @return \Illuminate\Http\Response
	 
	 */
	public function acceptedStudentsTable(Request $request){

		// We don't need to specify a student year because you can't accept students from any year but active 
		$acceptedStudents = Auth::user()->supervisor->getAcceptedStudents();
		$showEvaluationButton = Mode::getProjectEvaluationDate()->lte(\Carbon\Carbon::now());

		return view('supervisors.partials.accepted-students-table')
				->with('acceptedStudents', $acceptedStudents)
				->with('showEvaluationButton', $showEvaluationButton);
	}

	/**
	 * Accepts a student for their selected project.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response JSON
	 */
	public function acceptStudent(Request $request){
		if(Mode::getSupervisorAcceptDate()->gt(Carbon::now())){
			return response()->json(array(
				'successful' => false,
				'message' => 'You are not allowed to accept students until '.Mode::getSupervisorAcceptDate(true).'.'
			));
		}

		$this->validate(request(), [
			'student_id' => 'required',
			'project_id' => 'required',
		]);

		$student = Student::findOrFail(request('student_id'));

		// We must return the error because the return in the transaction will not break out of the function.
		$error = DB::transaction(function() use ($request, $student){
			$project = Project::findOrFail(request('project_id'));
			$transaction = new Transaction;

			if($project->id != $student->project_id){
				return response()->json(array(
					'successful' => false,
					'message' => 'Project ID and student project ID do not match up.'
				));
			}

			if($project->getAcceptedStudent() != null){
				return response()->json(array(
					'successful' => false,
					'message' => 'This project has already been allocated to another student.'
				));
			}

			if(count($project->getStudentsWithProjectSelected()) > 1){
				return response()->json(array(
					'successful' => false,
					'message' => 'You must reject all other students for "'.$project->title.'" before accepting '.$student->user->getFullName()
				));
			}

			if($project->status != "student-proposed"){
				$project->status = 'withdrawn';
			}
			
			$student->project_status = 'accepted';
			$project->save();
			$student->save();

			$transaction->fill(array(
				'type' => 'student',
				'action' => 'accepted',
				'project' => $student->project_id,
				'student' => $student->id,
				'supervisor' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();

			return null;
		});

		if($error != null){
			return $error;
		}

		try{
			// Send accepted email
			Mail::to($student->user->email)
				->send(new StudentAccepted(Auth::user()->supervisor, $student));
		} catch (\Exception $e){
			return response()->json(array(
				'successful' => true,
				'email_successful' => false,
				'message' => $student->user->first_name.' was accepted. However, the confirmation email failed to send.'
			));
		}

		return response()->json(array(
			'successful' => true,
			'message' => $student->user->first_name.' has been accepted.'
		));
	}

	/**
	 * Rejects a student for their selected project.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response JSON
	 */
	public function rejectStudent(Request $request){
		if(Mode::getSupervisorAcceptDate()->gt(Carbon::now())){
			return response()->json(array(
				'successful' => false,
				'message' => 'You are not allowed to reject students until '.Mode::getSupervisorAcceptDate(true).'.'
			));
		}

		$student = Student::findOrFail(request('student_id'));
		$projectId = $student->project->id;

		DB::transaction(function() use ($request, $student, $projectId){
			$transaction = new Transaction;
			$transaction->fill(array(
				'type' => 'student',
				'action' => 'rejected',
				'project' => $student->project_id,
				'student' => $student->id,
				'supervisor' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();

			if($student->project->status == "student-proposed"){
				$student->project->supervisor_id = null;
				$student->project->save();
			}

			$student->reject_count = ++$student->reject_count;
			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();

		});

		$emailError = false;
		try{
			// Send declined email
			Mail::to($student->user->email)
				->send(new StudentRejected(Auth::user()->supervisor, $student, $projectId));
		} catch (\Exception $e){
			$emailError = true;
		}

		if($emailError){
			return response()->json(array(
				'successful' => true,
				'email_successful' => false,
				'message' => $student->user->first_name.' has been rejected.'
			));
		}

		return response()->json(array(
			'successful' => true,
			'email_successful' => true,
			'message' => $student->user->first_name.' has been rejected.'
		));
	}

	/**
	 * Updates the students share name to other students preference.
	 *
	 * @param \Illuminate\Http\Request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function receiveEmails(Request $request){
		$educationLevels = get_education_levels(true);

		if(in_array($request->education_level, $educationLevels)){
			Auth::user()->supervisor->setAcceptingEmails(isset($request["accept_emails_".$request->education_level]) ? 1 : 0, $request->education_level);
		} else {
			return response()->json(array(
				'successful' => false,
				'message' => 'Incorrect parameters.'
			));
		}

		if(isset($request["accept_emails_".$request->education_level])){
			$message = "You have opted in to ".$request->education_level." emails.";
		} else {
			$message = "You have opted out of ".$request->education_level." emails.";
		}

		return response()->json(array(
			'successful' => true,
			'message' => $message
		));
	}

	/**
	 * Undoes an accepted student.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response JSON
	 */
	public function undoStudent(Request $request){

		if(Session::get('logged_in_as') == null){
			return response()->json(array(
				'successful' => false,
				'email_successful' => true,
				'message' => "You are not allowed to perform this action."
			));
		}

		$student = Student::findOrFail(request('student_id'));
		$projectId = $student->project->id;

		DB::transaction(function() use ($request, $student, $projectId){
			$transaction = new Transaction;

			$transaction->fill(array(
				'type' => 'student',
				'action' => 'undo',
				'project' => $student->project_id,
				'student' => $student->id,
				'supervisor' => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon
			));
			$transaction->save();

			$student->project->marker_id = null;

			if($student->project->status == "student-proposed"){
				$student->project->supervisor_id = null;
			}
			$student->project->save();

			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();
		});

		$emailError = false;
		try{
			// Send declined email
			Mail::to($student->user->email)
				->send(new SupervisorUndo(Auth::user()->supervisor, $student, $projectId));
		} catch (\Exception $e){
			$emailError = true;
		}

		$message = $student->getName()." is no longer accepted.";

		if($emailError){
			return response()->json(array(
				'successful' => true,
				'email_successful' => false,
				'message' => $message
			));
		}

		return response()->json(array(
			'successful' => true,
			'email_successful' => true,
			'message' => $message
		));
	}
}
