<?php
namespace SussexProjects;

class TopicMasters extends Topic{
	public $table = 'topics_masters';

	public function projects(){
		return $this->belongsToMany(ProjectMasters::class, ProjectTopicMasters::class)->withPivot('primary');
	}

	public function amountOfProjects(){
		return ProjectTopicMasters::where('topic_id', $this->id)->count();
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

