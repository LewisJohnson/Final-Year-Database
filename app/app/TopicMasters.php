<?php
namespace SussexProjects;

/**
 * The masters topic model.
 * 
 * @see SussexProjects\Http\Controllers\TopicController
*/
class TopicMasters extends Topic{

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	public $table = 'topics_masters';

	/**
	 * Returns all projects related to this topic.
	 * 
	 * Includes primary project pivot.
	 *
	 * @return ProjectMasters
	*/
	public function projects(){
		return $this->belongsToMany(ProjectMasters::class, 'project_topics_masters', 'topic_id', 'project_id')->withPivot('primary');
	}

	/**
	 * Returns all projects related to this topic which are on-offer to students.
	 *
	 * @return ProjectMasters
	*/
	public function projectsOnOffer(){
		$this->projects->where('status', 'on-offer');
	}

	/**
	 * A HTML datalist of all topics.
	 *
	 * @return string
	 */
	public static function getDatalist(){
		$topicNames = TopicMasters::pluck('name');

		$rtnString = '<datalist id="topicsDataList">';
		foreach ($topicNames as $name) {
			$rtnString .= '<option value="'. $name.'">';
		}
		$rtnString .= '</datalist>';

		return $rtnString;
	}
}

