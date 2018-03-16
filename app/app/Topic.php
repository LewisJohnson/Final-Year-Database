<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

/**
 * The topic model.
 * 
 * @see SussexProjects\Http\Controllers\topicController
*/
class Topic extends Model{
	use Traits\Uuids;

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_topics_'.Session::get('education_level');
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
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];
	
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	public $fillable = ['name'];

	/**
	 * Returns all projects related to this topic.
	 * 
	 * Includes primary project pivot.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany Project
     */
	public function projects(){
		return $this->belongsToMany(Project::class, null, 'topic_id', 'project_id')->withPivot('primary');
	}

	/**
	 * Returns all projects related to this topic which are on-offer to students.
	 *
	 * @return Project
	*/
	public function projectsOnOffer(){
		return $this->projects->where('status', 'on-offer');
	}

	/**
	 * A HTML data-list of all topics.
	 *
	 * @return string
	 */
	public static function getDatalist(){
		$topicNames = Topic::pluck('name');

		$rtnString = '<datalist id="topicsDataList">';
		foreach ($topicNames as $name) {
			$rtnString .= '<option value="'. $name.'">';
		}
		$rtnString .= '</datalist>';

		return $rtnString;
	}
}
