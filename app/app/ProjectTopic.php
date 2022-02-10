<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

/**
 * The project topic model.
 *
 * @see SussexProjects\Http\Controllers\ProjectTopic
 * @see SussexProjects\Http\Controllers\ProjectController
 * @see SussexProjects\Http\Controllers\TopicController
 * @see Project
 * @see Topic
 */
class ProjectTopic extends Model
{

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
	 * The models primary key
	 *
	 * @var array
	 */
	protected $primaryKey = ['project_id', 'topic_id'];

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
	 * @throws Exception Database not found
	 * @return string    Table string
	 */
	public function getTable()
	{
		if (Session::get('department') !== null)
		{
			return Session::get('department') . '_project_topics_' . get_el_short_name();
		}
		else
		{
			throw new Exception('Database not found.');
		}
	}
}
