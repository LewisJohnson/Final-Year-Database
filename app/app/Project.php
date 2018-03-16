<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

/**
 * The project model.
 * 
 * @see SussexProjects\Http\Controllers\ProjectController
*/
class Project extends Model{
	use Traits\Uuids;

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_projects_'.Session::get('education_level')["shortName"];
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = true;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title', 'description', 'skills', 'status'];

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['supervisor', 'deleted_at'];

	/**
	 * The attributes that should are dates.
	 *
	 * @var array
	 */
	protected $dates = ['created_at'. 'updated_at', 'deleted_at'];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = ['supervisor', 'created_at', 'updated_at'];

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

    /**
     * Returns all topics this project has including a primary topic pivot.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany Topics
     */
    public function topics(){
		$projectTopic = new ProjectTopic;
		return $this->belongsToMany(Topic::class, $projectTopic->getTable(), 'project_id', 'topic_id')->withPivot('primary');
	}

    /**
     * Returns the project's supervisor (Owner)
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function supervisor(){
        return $this->belongsTo(Supervisor::class, 'supervisor_id', 'id');
    }

    /**
     * This should only be called on student proposed projects.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function student(){
		return $this->belongsTo(Student::class, 'id', 'student_id');
	}

    /**
     * Returns the projects primary project.
     *
     * Otherwise null is returned.
     *
     * @return Topic
     */
    public function getPrimaryTopic(){
		foreach ($this->topics as $key => $value) {
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
    public function getStudentsWithThisProjectSelected(){
		return Student::where('project_id', $this->id)->where('project_status', 'selected')->get();
	}

    /**
     * Returns the student who is accepted to undertake this project.
     *
     * @return Student
     */
    public function getAcceptStudent(){
		return Student::where('project_id', $this->id)->where('project_status', 'accepted')->first();
	}

	/**
	 * A list of all potential project statues.
	 *
	 * @return string[] An array of all statues'.
	*/
	public static function getAllStatuses(){
		return ['none', 'student-proposed', 'selected', 'accepted'];
	}

	/**
	 * Determines if this project is owned by the current authenticated used.
	 *
	 * @return boolean
	*/
	public function isOwnedByUser(){
		if(Auth::user()->isSupervisor()){
			return $this->supervisor_id === Auth::user()->supervisor->id;
		} elseif(Auth::user()->isStudent()){
			return $this->student_id === Auth::user()->student->id;
		}
	}
}
