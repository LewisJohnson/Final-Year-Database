<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

/**
 * The supervisor model.
 * 
 * @see SussexProjects\Http\Controllers\SupervisorController
*/
class Supervisor extends User{
	use Traits\Uuids;

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_supervisors';
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'id', 'title', 'contact_type', 'project_load', 'take_students' ];

	/**
	 * Returns the user related to this supervisor.
	 *
	 * @return User
	 */
	public function user(){
		return $this->hasOne(User::class, 'id');
	}


	/**
	 * Determines if the superior is accepting emails.
	 * 
	 * NOTICE: The return value is dynamic, depending on session education level.
	 *
	 * @param String $educationLevel An optional education level parameter
	 * 
	 * @return boolean Is supervisor accepting emails
	 */
	public function isAcceptingEmails($educationLevel = null){
		if(isset($educationLevel)){
			return $this["accept_email_".$educationLevel];
		}

		return $this["accept_email_".Session::get('education_level')];
	}

	/**
	 * Determines if the superior is taking students.
	 * 
	 * NOTICE: The return value is dynamic, depending on session education level.
	 *
	 * @param String $educationLevel An optional education level parameter
	 * 
	 * @return boolean Is supervisor taking students
	 */
	public function isTakingStudents($educationLevel = null){

		if(isset($educationLevel)){
			return $this["take_students_".$educationLevel];
		}
		return $this["take_students_".Session::get('education_level')];
	}

	/**
	 * The project load of the supervisor (Student load).
	 * 
	 * NOTICE: The return value is dynamic, depending on session education level.
	 *
	 * @param String $educationLevel An optional education level parameter
	 * 
	 * @return int Project load
	 */
	public function getProjectLoad($educationLevel = null){

		if(isset($educationLevel)){
			return $this["project_load_".$educationLevel];
		}

		return $this["project_load_".Session::get('education_level')];
	}

	/**
	 * A list of projects the supervisor has created (Owner).
	 *
	 * @param String $status A project status to add the where clause
	 * 
	 * @return Project A collection of projects
	 */
	public function getProjects($status = null){
		if(isset($status)){
			return Project::where("supervisor_id", $this->id)
				->whereNull('student_id')
				->where("status", "=", $status)
				->get();
		}

		return Project::where("supervisor_id", $this->id)
			->orderBy('status', 'asc')
			->whereNull('student_id')
			->get();
	}


	/**
	 * A list of students who have selected a project from this supervisor.
	 * 
	 * @return Array A key/value array where the key is the student and the value is their selected project
	 */
	public function getSelectedStudents(){
		$students = Student::all();
		$offers = array();

		$students = $students->filter(function($student, $key) {
			if($student->project->supervisor_id !== $this->id){
				return false;
			}

			if($student->project_status !== 'selected'){
				return false;
			}

			return true;
		});

		//todo: re-add name hiding for students
		foreach ($students as $key => $student) {
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}
		
		return $offers;
	}

	/**
	 * A list of students who have been accepted to undertake a project from this supervisor
	 * 
	 * @return Array A key/value array where the key is the student and the value is the project they are accepted for
	 */
	public function getAcceptedStudents(){
		$students = Student::all();
		$offers = array();

		$students = $students->filter(function($student, $key) {
			if($student->project->supervisor_id !== $this->id){
				return false;
			}

			if($student->project_status !== 'accepted'){
				return false;
			}

			return true;
		});

		//todo: re-add name hiding for students
		foreach ($students as $key => $student) {
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}
		
		return $offers;
	}

	/**
	 * A list of students who have proposed a project to this supervisor
	 * 
	 * @return Student Array A key/value array where the key is the student and the value is their proposed project
	 */
	public function getStudentProjectProposals(){
		$students = Student::all();
		$offers = array();

		$students = $students->filter(function($student, $key) {
			if($student->project->supervisor_id !== $this->id){
				return false;
			}

			if($student->project_status !== 'student-proposed'){
				return false;
			}

			if($student->project->staus !== 'proposed'){
				return false;
			}
			return true;
		});

		//todo: re-add name hiding for students
		foreach ($students as $key => $student) {
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}
		
		return $offers;
	}

	/**
	 * A list of students this supervisor is second supervisor (marker) too.
	 * 
	 * @return Student Array A key/value array where the key is the student and the value is their project
	 */
	public function getSecondSupervisingStudents(){
		$students = Student::all();
		$offers = array();

		$students = $students->filter(function($student, $key) {
			return $student->project->marker_id == $this->id;
		});

		//todo: re-add name hiding for students
		foreach ($students as $key => $student) {
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}
		
		return $offers;
	}


	/**
	 * A HTML 5 data list snippet containing all supervisors.
	 * This is used for auto-complete.
	 *	
	 * @return string The resulting HTML
	*/
	public static function getDatalist(){
		$supervisors = Supervisor::all();

		$dataListHtml = '<datalist id="supervisor-datalist">';
		foreach ($supervisors as $supervisor) {
			$dataListHtml .= '<option value="'. $supervisor->user->getFullName().'">';
		}
		$dataListHtml .= '</datalist>';

		return $dataListHtml;
	}
}


