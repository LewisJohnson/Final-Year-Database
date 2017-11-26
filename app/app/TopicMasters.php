<?php
namespace SussexInformaticsProjects;

class TopicMasters extends Topic
{
	protected $table = 'topics_masters';

	public function projects(){
		return $this->belongsToMany(Project_Masters::class, 'project_topics_masters');
	}

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
	