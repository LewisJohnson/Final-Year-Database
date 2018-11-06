<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

/**
 * The supervisor model.
 *
 * @see SussexProjects\Http\Controllers\SupervisorController
 */
class Supervisor extends Model{

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = [];

	/**
	 * A HTML 5 data list snippet containing all supervisors.
	 * This is used for auto-complete.
	 *
	 * @return string The resulting HTML
	 */
	public static function getDatalist(){
		$supervisors = Supervisor::getAllSupervisorsQuery()->get();
		$dataListHtml = '<datalist id="supervisor-datalist">';

		foreach($supervisors as $supervisor){
			$dataListHtml .= '<option value="'.$supervisor->user->getFullName().'">';
		}

		$dataListHtml .= '</datalist>';

		return $dataListHtml;
	}

	/**
	 * Returns the user related to this supervisor.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne User
	 */
	public function user(){
		return $this->hasOne(User::class, 'id');
	}

	/**
	 * The table to retrieve data from.
	 *
	 * @return string Table string
	 * @throws Exception Database not found
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_supervisors';
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Sets the superior's email preference.
	 *
	 * @param        $value
	 * @param String $educationLevel An optional education level parameter
	 *
	 * @return void
	 */
	public function setAcceptingEmails($value, $educationLevel = null){
		if(isset($educationLevel)){
			$this["accept_email_".$educationLevel] = $value;
		} else {
			$this["accept_email_".Session::get('education_level')["shortName"]] = $value;
		}

		$this->save();

		return;
	}

	/**
	 * Sets taking student property.
	 *
	 * @param Boolean $value          Take students
	 * @param String  $educationLevel An optional education level parameter
	 */
	public function setTakingStudents($value, $educationLevel = null){
		if(isset($educationLevel)){
			$this["take_students_".$educationLevel] = $value;
		} else {
			$this["take_students_".Session::get('education_level')["shortName"]] = $value;
		}
		$this->save();

		return;
	}

	/**
	 * Sets the project load of the supervisor (Student load).
	 *
	 * @param Int    $value          The project load
	 * @param String $educationLevel An optional education level parameter
	 */
	public function setProjectLoad($value, $educationLevel = null){
		if(isset($educationLevel)){
			$this["project_load_".$educationLevel] = $value;
		} else {
			$this["project_load_".Session::get('education_level')["shortName"]] = $value;
		}
		$this->save();

		return;
	}

	/**
	 * Determines if the superior is accepting emails.
	 * NOTICE: The return value is dynamic, depending on session education level.
	 *
	 * @param String $educationLevel An optional education level parameter
	 *
	 * @return boolean Is supervisor accepting emails
	 */
	public function getAcceptingEmails($educationLevel = null){
		if(isset($educationLevel)){
			return $this["accept_email_".$educationLevel];
		}

		return $this["accept_email_".Session::get('education_level')["shortName"]];
	}

	/**
	 * Determines if the superior is taking students.
	 * NOTICE: The return value is dynamic, depending on session education level.
	 *
	 * @param String $educationLevel An optional education level parameter
	 *
	 * @return boolean Is supervisor taking students
	 */
	public function getTakingStudents($educationLevel = null){
		if(isset($educationLevel)){
			return $this["take_students_".$educationLevel];
		}

		return $this["take_students_".Session::get('education_level')["shortName"]];
	}

	/**
	 * The project load of the supervisor (Student load).
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

		return $this["project_load_".Session::get('education_level')["shortName"]];
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
			return Project::where('supervisor_id', $this->id)
				->whereNull('student_id')->where('status', $status)->get();
		}

		return Project::where('supervisor_id', $this->id)
			->orderBy('status', 'asc')->whereNull('student_id')->get();
	}

	/**
	 * A list of projects the supervisor has created (Owner).
	 *
	 * @param String $status A project status to add the where clause
	 *
	 * @return Project A collection of projects
	 */
	public function getPopularProjects(){
		return Project::where('supervisor_id', $this->id)
			->whereNull('student_id')
			->where('view_count', '>=', 10)
			->limit(10)
			->orderBy('view_count', 'desc')
			->get();
	}

	/**
	 * A list of students who have selected a project from this supervisor.
	 *
	 * @return array A key/value array where the key is the student and the value is their selected project
	 */
	public function getIntrestedStudents(){
		$project = new Project;
		$student = new Student;
		$user = new User;
		$offers = array();

		$students = Student::select($student->getTable().'.*', 'project.supervisor_id')
			->join($project->getTable().' as project', 'project_id', '=', 'project.id')
			->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
			->where('project_status', 'selected')
			->where('project.supervisor_id', $this->id)
			->orderBy('user.last_name', 'asc')
			->get();

		foreach($students as $student){
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
	 * @return array A key/value array where the key is the student and the value is the project they are accepted for
	 */
	public function getAcceptedStudents(){
		$project = new Project;
		$student = new Student;
		$user = new User;
		$offers = array();

		$students = Student::select($student->getTable().'.*', 'project.supervisor_id')
			->join($project->getTable().' as project', 'project_id', '=', 'project.id')
			->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
			->where('project_status', 'accepted')
			->where('project.supervisor_id', $this->id)
			->orderBy('user.last_name', 'asc')
			->get();

		foreach($students as $student){
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
	 * @return array Array A key/value array where the key is the student and the value is their proposed project
	 */
	public function getStudentProjectProposals(){
		$project = new Project;
		$student = new Student;
		$user = new User;
		$offers = array();

		$students = Student::select($student->getTable().'.*', 'project.supervisor_id')
			->join($project->getTable().' as project', 'project_id', '=', 'project.id')
			->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
			->where('project_status', 'proposed')
			->where('project.supervisor_id', $this->id)
			->orderBy('user.last_name', 'asc')
			->get();

		foreach($students as $student){
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}

		return $offers;
	}

	/**
	 * A list of students this supervisor is second marker too.
	 *
	 * @return array Array A key/value array where the key is the student and the value is their project
	 */
	public function getSecondSupervisingStudents(){
		$students = Student::where('marker_id', $this->id)->get();
		$offers = array();

		foreach($students as $key => $student){
			$ar = array();
			$ar["student"] = $student;
			$ar["project"] = $student->project;
			array_push($offers, $ar);
		}

		return $offers;
	}

	public function getMailtoStringByProjectStatus($status){
		$project = new Project;
		$student = new Student;

		$students = Student::where('project_status', $status)
			->join($project->getTable().' as project', 'project_id', '=', 'project.id')
			->where('project.supervisor_id', $this->id)
			->select($student->getTable().'.*', 'project.supervisor_id')->get();

		$return = 'mailto:'.Auth::user()->email;
		$return .= '?bcc=';

		foreach($students as $student){
			$return .= $student->user->email;
			$return .= ',';
		}

		return $return;
	}

	/**
	 * A list of supervisors with the supervisor privilege.
	 *
	 * @return QueryBuilder A query builder of all supervisors.
	 */
	public static function getAllSupervisorsQuery(){
		$userTable = new User();
		$supervisorTable = new Supervisor();

		return Supervisor::join($userTable->getTable().' as user', 'user.id', '=', $supervisorTable->getTable().'.id')
				->select($supervisorTable->getTable().'.*')
				->where('user.privileges', 'LIKE', '%supervisor%')
				->orderBy('user.last_name', 'asc');
	}

	/**
	 * A HTML data-list of all titles.
	 *
	 * @return string
	 */
	public static function getTitleDatalist(){
		$titles = Supervisor::groupBy('title')
			->where("take_students_".Session::get('education_level')["shortName"], true)
			->pluck('title');

		$rtnString = '<datalist id="titleDataList">';
		foreach($titles as $title){
			$rtnString .= '<option value="'.$title.'">';
		}
		$rtnString .= '</datalist>';

		return $rtnString;
	}

	public static function getAllSupervisorsMailtoString(){
		$supervisors = Supervisor::all();
		$return = 'mailto:'.Auth::user()->email;
		$return .= '?bcc=';

		foreach($supervisors as $key => $supervisor){
			$return .= $supervisor->user->email;
			$return .= ',';
		}

		return $return;
	}

	public static function getSupervisorsOpenToStudentsMailtoString(){
		$supervisors = Supervisor::where("take_students_".Session::get('education_level')["shortName"], true)->get();
		$return = 'mailto:'.Auth::user()->email;
		$return .= '?bcc=';

		foreach($supervisors as $key => $supervisor){
			$return .= $supervisor->user->email;
			$return .= ',';
		}

		return $return;
	}

	public static function getSupervisorsClosedToStudentsMailtoString(){
		$supervisors = Supervisor::where("take_students_".Session::get('education_level')["shortName"], false)->get();
		$return = 'mailto:'.Auth::user()->email;
		$return .= '?bcc=';

		foreach($supervisors as $key => $supervisor){
			$return .= $supervisor->user->email;
			$return .= ',';
		}

		return $return;
	}

	public static function getSupervisorsWithPendingStudentMailtoString(){
		$supervisors = Supervisor::all();
		$return = 'mailto:'.Auth::user()->email;
		$return .= '?bcc=';

		foreach($supervisors as $key => $supervisor){
			if(count($supervisor->getStudentProjectProposals()) > 0 || count($supervisor->getIntrestedStudents()) > 0){
				$return .= $supervisor->user->email;
				$return .= ',';
			}
		}

		return $return;
	}

	public static function getSupervisorsWithAllStudentsAcceptedMailtoString(){
		$supervisors = Supervisor::all();
		$return = 'mailto:'.Auth::user()->email;
		$return .= '?bcc=';

		foreach($supervisors as $key => $supervisor){
			if(count($supervisor->getAcceptedStudents()) > 0){
				$return .= $supervisor->user->email;
				$return .= ',';
			}
		}

		return $return;
	}
}
