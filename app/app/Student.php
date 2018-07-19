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
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

/**
 * The student model.
 *
 * @see SussexProjects\Http\Controllers\StudentController
 */
class Student extends Model{

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

	public static function getMailtoStringByProjectStatus($status){
		$return = 'mailto:';
		$students = Student::Where('project_status', $status)->get();

		foreach($students as $key => $student){
			$return .= $student->user->email;
			$return .= ',';
		}

		return $return;
	}

	/**
	 * The table to retrieve data from.
	 *
	 * @return string Table string
	 * @throws Exception Database not found
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_students_'.Session::get('education_level')["shortName"];
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * The students name, hidden if they have they have their name hidden.
	 * The students name will also be visible to supervisors and administrators.
	 *
	 * @return string
	 */
	public function getName(){
		if(Auth::check()){

			// If authenticated user is this student, show full name
			if(Auth::user()->id == $this->id){
				return $this->user->getFullName();
			}

			// If authenticated user is student, and this student is hiding there name, hide name
			if(Auth::user()->isStudent() && !$this->share_name){
				return "A Student";
			} else {
				return $this->user->getFullName();
			}
		}

		return "A Student";
	}

	/**
	 * The user related to this student.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne Student
	 */
	public function user(){
		return $this->hasOne(User::class, 'id');
	}

	/**
	 * The project this student has selected.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne Project
	 */
	public function project(){
		return $this->hasOne(Project::class, 'id', 'project_id');
	}

	/**
	 * The students second supervisor (Marker)
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\belongsTo Supervisor
	 */
	public function marker(){
		return $this->belongsTo(Supervisor::class, 'marker_id', 'id');
	}

	/**
	 * The status of the student in a pretty string.
	 *
	 * @return String status
	 */
	public function getStatusString(){
		$return = '';
		switch($this->project_status){
		case 'none':
			$return = 'You haven\'t selected a project.';
			break;
		case 'selected':
		case 'proposed':
			$return = 'You\'re awaiting supervisor approval.';
			break;
		case 'accepted':
			$return = 'Congratulations. You\'ve been accepted.';
			break;
		}

		return $return;
	}

	/**
	 * Returns all favourite projects.
	 *
	 * @return Project Projects
	 */
	public function getFavouriteProjects(){
		if(Cookie::get('favourite_projects') == "none" || Cookie::get('favourite_projects') == "a:0:{}" || empty(Cookie::get('favourite_projects'))){
			return null;
		} else {
			$projects = Project::whereIn('id', unserialize(Cookie::get('favourite_projects')))
				->get();
		}

		return $projects;
	}

	/**
	 * Returns proposed projects without a supervisor.
	 *
	 * @return Project Projects
	 */
	public function getProposedProjectsWithoutSupervisor(){
		return Project::
				where('status', 'student-proposed')
				->where('student_id', $this->id)
				->whereNull('supervisor_id')
				->get();
	}

	/**
	 * Returns a boolean whether the parameter project is a favourite project.
	 *
	 * @param $id Project ID
	 *
	 * @return boolean favourite project
	 */
	public function isFavouriteProject($id){
		if(empty(Cookie::get('favourite_projects'))){
			return false;
		}

		if(Cookie::get('favourite_projects') != "null"){
			$favProjects = unserialize(Cookie::get('favourite_projects'));

			if(($key = array_search($id, $favProjects)) !== false){
				return true;
			}
		}

		return false;
	}
}
