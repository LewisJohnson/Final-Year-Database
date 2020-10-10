<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

/**
 * The project model.
 *
 * @see SussexProjects\Http\Controllers\ProjectController
 */
class Project extends Model {
	use Traits\Uuids;

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = true;

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'description', 'skills', 'status'];

	/**
	 * The attributes that are sortable.
	 *
	 * @var array
	 */
	public $sortable = ['title', 'description', 'skills', 'status'];

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['supervisor'];

	/**
	 * The attributes that should are dates.
	 *
	 * @var array
	 */
	protected $dates = ['created_at', 'updated_at'];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];

	/**
	 * Get's the project status.
	 *
	 * @return string The project's status.
	 */
	public function getStatus(){
		if($this->status == "withdrawn" && !empty($this->getAcceptedStudent())){
			return "accepted";
		}

		if($this->status == "student-proposed" && !empty($this->getAcceptedStudent())){
			return "accepted (student proposed)";
		}
		
		return $this->status;
	}


	/**
	 * Get's the project status.
	 *
	 * @return string The project's status.
	 */
	public function getStatusAsBootstrapClass(){
		$status = $this->getStatus();
		
		switch ($status) {
			case 'accepted':
			case 'accepted (student proposed)':
				return "success";
				break;

			case 'withdrawn':
				return "warning";
				break;

			case 'archived':
				return "danger";
				break;
			
			default:
				return "secondary";
				break;
		}
	}

	/**
	 * The table to retrieve data from.
	 *
	 * @return string Table string
	 * @throws Exception Database not found
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_projects_'.get_el_short_name();
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Returns all topics this project has including a primary topic pivot.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany Topics
	 */
	public function topics(){
		$projectTopic = new ProjectTopic;

		return $this->belongsToMany(Topic::class, $projectTopic->getTable(), 'project_id', 'topic_id')
			->withPivot('primary');
	}

	/**
	 * Returns the project's supervisor
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function supervisor(){
		return $this->belongsTo(Supervisor::class, 'supervisor_id', 'id');
	}

	/**
	 * Returns the project's second marker.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\belongsTo Supervisor
	 */
	public function marker(){
		return $this->belongsTo(Supervisor::class, 'marker_id', 'id');
	}

	/**
	 * This should only be called on student proposed projects.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function student(){
		return $this->belongsTo(Student::class, 'student_id', 'id');
	}

	/**
	 * Returns the project's evaluation.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function evaluation(){
		return $this->hasOne(ProjectEvaluation::class, 'project_id', 'id');
	}

	/**
	 * Returns the projects primary project.
	 * Otherwise null is returned.
	 *
	 * @return Topic
	 */
	public function getPrimaryTopic(){
		foreach($this->topics as $key => $value){
			if($value->pivot->primary){
				return $value;
			}
		}

		return null;
	}

	/**
	 * Returns all students with this project selected.
	 *
	 * @return Student
	 */
	public function getStudentsWithProjectSelected(){
		return Student::where('project_id', $this->id)
			->where('project_status', 'selected')
			->get();
	}

	/**
	 * Returns the student who is accepted to undertake this project.
	 *
	 * @return Student
	 */
	public function getAcceptedStudent(){
		return Student::where('project_id', $this->id)
			->where('project_status', 'accepted')
			->first();
	}

	/**
	 * Determines if this project is owned by the current authenticated used.
	 *
	 * @return boolean
	 */
	public function isOwnedByUser(){
		if(Auth::user()->isSupervisor() && $this->status != "student-proposed"){
			return $this->supervisor_id === Auth::user()->id;
		} elseif(Auth::user()->isStudent()) {
			return $this->student_id === Auth::user()->id;
		}

		return false;
	}

	/**
	 * Determines if current user is a supervisor of the project.
	 *
	 * @return boolean
	 */
	public function isUserSupervisorOfProject(){
		if(Auth::user()->isSupervisor()){
			return $this->supervisor_id === Auth::user()->id;
		}

		return false;
	}

	/**
	 * Determines if current user is a second marker of the project.
	 *
	 * @return boolean
	 */
	public function isUserMarkerOfProject(){
		if(Auth::user()->isSupervisor()){
			return $this->marker_id === Auth::user()->id;
		}

		return false;
	}

	/**
	 * Gets a text only version of the projects description.
	 *
	 * @return boolean
	 */
	public function getShortDescription(){
		$returnString = strip_tags($this->description);
		$longString = false;

		if(strlen($returnString) > 70){
			$longString = true;
		}

		$returnString = substr($returnString, 0, 70);

		if($longString){
			$returnString .= "...";
		}

		return $returnString;
	}
}
