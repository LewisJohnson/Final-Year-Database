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
use SussexProjects\Supervisor;
use SussexProjects\User;

/**
 * The topic model.
 *
 * @see SussexProjects\Http\Controllers\TopicController
 */
class Topic extends Model
{
	use Traits\Uuids;

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
	public $fillable = ['name'];

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
	protected $guarded = ['id'];

	/**
	 * A HTML data-list of all topics.
	 *
	 * @return string
	 */
	public static function getDatalist()
	{
		$topicNames = Topic::pluck('name');

		$rtnString = '<datalist id="topicsDataList">';
		foreach ($topicNames as $name)
		{
			$rtnString .= '<option value="' . $name . '">';
		}
		$rtnString .= '</datalist>';

		return $rtnString;
	}

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
			return Session::get('department') . '_topics_' . get_el_short_name();
		}
		else
		{
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Returns the project count of on-offer projects.
	 *
	 * @return Project
	 */
	public function getProjectsOnOfferCount()
	{

		$supervisorTable = new Supervisor();
		$userTable = new User();
		$projectTable = new Project();
		$projectTopicTable = new ProjectTopic();

		return;
		Project::whereNotNull('supervisor_id')
			->join($supervisorTable->getTable() . ' as supervisor', 'supervisor_id', '=', 'supervisor.id')
			->join($userTable->getTable() . ' as user', 'user.id', '=', 'supervisor.id')
			->rightJoin($projectTopicTable->getTable() . ' as projectTopic', 'projectTopic.project_id', '=', $projectTable->getTable() . '.id')
			->where('topic_id', $this->id)
			->where('status', 'on-offer')
			->where('user.privileges', 'LIKE', '%supervisor%')
			->where('supervisor.take_students_' . get_el_short_name(), true)
			->count();
	}
}
