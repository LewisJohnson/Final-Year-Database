<?php

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use SussexProjects\Project;
use SussexProjects\Topic;
use Session;

class ProjectTopic extends Model{
	
	public $timestamps = false;
	public $incrementing = false;
	
	protected $table = null;
	protected $primaryKey = ['project_id', 'topic_id'];
	protected $fillable = ['project_id', 'topic_id'];

	public static function getProjectPrimaryTopicId(Project $project){

		if(Session::get("db_type") == "ug"){
            $query = ProjectTopicUg::where('project_id', $project->id);
        } else {
            $query = ProjectTopicMasters::where('project_id', $project->id);
        }

		$primary_topic = $query->where('primary', 1)->first();

		if($primary_topic === null){
			return '';
		} else {
			return $primary_topic->topic_id;
		}
	}

	public static function getProjectPrimaryTopicName(Project $project){
		$primary_topic_id = ProjectTopic::getProjectPrimaryTopicId($project);

		if($primary_topic_id === ''){
			return '';
		} else {
			if(Session::get("db_type") == "ug"){
				$t = TopicUg::where('id', $primary_topic_id)->first();
		    } else {
		    	$t = TopicMasters::where('id', $primary_topic_id)->first();
		    }
			return $t->name;
		}
	}
}
