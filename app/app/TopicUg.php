<?php
namespace SussexProjects;

class TopicUg extends Topic{
	protected $table = 'topics_ug';

	public function projects(){
		return $this->belongsToMany('SussexProjects\ProjectUg', 'project_topics_ug', 'project_id', 'topic_id');
	}

	public function amountOfProjectsOnOffer(){
		return ProjectTopicUg::where('topic_id', $this->id)->count();
	}

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
