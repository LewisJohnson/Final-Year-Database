<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;
use SussexProjects\Project;
use SussexProjects\Topic;

/**
 * The masters project topic model.
 * 
 * @see SussexProjects\Http\Controllers\ProjectTopic
*/
class ProjectTopic extends Model{
	use Traits\Uuids;

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_project_topics_'.Session::get('db_type');
		} else {
			return 'UNSET';
		}
	}

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
}
