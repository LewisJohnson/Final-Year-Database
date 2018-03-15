<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;

/**
 * The student model.
 * 
 * @see SussexProjects\Http\Controllers\StudentController
*/
class Student extends Model{
	use Traits\Uuids;
	
	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_students_'.Session::get('education_level');
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
	protected $fillable = ['id', 'registration_number', 'programme', 'marker_id'];

	/**
	 * Returns the user related to this student.
	 *
	 * @return User
	 */
	public function user(){
		return $this->hasOne(User::class, 'id');
	}

	/**
	 * Returns the project this student has selected.
	 *
	 * @return Project
	 */
	public function project(){
		return $this->hasOne(Project::class, 'id', 'project_id');
	}

	public function marker(){
		return $this->belongsTo(Supervisor::class, 'marker_id', 'id');
	}

	public function getStatusString(){
		$return = '';
		switch($this->project_status) {
			case 'none':
				$return = 'You haven\'t selected a project.';
				break;
			case 'selected':
				$return = 'You\'re awaiting supervisor approval.';
				break;
			case 'proposed':
				$return = 'You haven\'t selected a project.';
				break;
			case 'accepted':
				$return = 'Congratulations. You\'ve been accepted.';
				break;
		}
		return $return;
	}

	public static function getMailtoStringByProjectStatus($status){
		$return = 'mailto:';
		$students = Student::Where('project_status', $status)->get();

		foreach ($students as $key => $student) {
			$return .= $student->user->email;
			$return .= ',';
		}

		return $return;
	}

	public function isFavouriteProject($id){
		if(empty(Cookie::get('favourite_projects'))){
			return false;
		}

		if(Cookie::get('favourite_projects') != "null"){
			$favProjects = unserialize(Cookie::get('favourite_projects'));

			if (($key = array_search($id, $favProjects)) !== false) {
				return true;
			}
		}
		return false;
	}

	public function getFavouriteProjects(){
		if(Cookie::get('favourite_projects') == "none" || Cookie::get('favourite_projects') == "a:0:{}" || empty(Cookie::get('favourite_projects'))){
			return null;
		} else {
			$projects = Project::whereIn('id', unserialize(Cookie::get('favourite_projects')))->get();
		}
		return $projects;
	}
}
