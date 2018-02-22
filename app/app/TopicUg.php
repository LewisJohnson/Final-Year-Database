<?php
namespace SussexProjects;

/**
 * The undergraduate topic model.
 * 
 * @see SussexProjects\Http\Controllers\TopicController
*/
class TopicUg extends Topic{

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	public $table = 'topics_ug';

	/**
	 * Returns all projects related to this topic.
	 * 
	 * Includes primary project pivot.
	 *
	 * @return ProjectMasters
	*/
	public function projects(){
		return $this->belongsToMany(ProjectUg::class, 'project_topics_ug', 'topic_id', 'project_id')->withPivot('primary');
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
		$topicNames = TopicUg::pluck('name');

		$rtnString = '<datalist id="topicsDataList">';
		foreach ($topicNames as $name) {
			$rtnString .= '<option value="'. $name.'">';
		}
		$rtnString .= '</datalist>';

		return $rtnString;
	}
}
