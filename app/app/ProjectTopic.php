<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;
use SussexProjects\Project;
use SussexProjects\Topic;

/**
 * The project topic model.
 * 
 * @see SussexProjects\Http\Controllers\ProjectTopic
*/
class ProjectTopic extends Model{

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	protected $primaryKey = ['project_id', 'topic_id'];

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
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['project_id', 'topic_id'];

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_project_topics_'.Session::get('education_level')["shortName"];
		} else {
			throw new Exception('Database not found.');
		}
	}
}
