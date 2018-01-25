<?php
namespace SussexProjects;

class TopicMasters extends Topic{
	public $table = 'topics_masters';

	public function projects(){
		return $this->belongsToMany(ProjectMasters::class, 'project_topics_masters', 'topic_id', 'project_id')->withPivot('primary');
	}

	public function projectsOnOffer(){
		$this->projects->where('status', 'on-offer');
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

