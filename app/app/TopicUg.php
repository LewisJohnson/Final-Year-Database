<?php
namespace App;

class TopicUg extends Topic{
	protected $table = 'topics_ug';

	public function projects(){
		return $this->belongsToMany('App\ProjectUg', 'project_topics_ug');
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
