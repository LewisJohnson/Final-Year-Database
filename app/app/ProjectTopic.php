<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Project;
use App\Topic;
use Session;

class ProjectTopic extends Model{
	protected $table = 'NULL';
	public $timestamps = false;
	public $incrementing = false;
	protected $primaryKey = ['project_id', 'topic_id'];
	protected $fillable = ['project_id', 'topic_id'];

	public static function getProjectPrimaryTopicId(Project $project){

		if(Session::get("db_type") == "ug"){
            $query = ProjectTopic_Ug::where('project_id', $project->id);
        } else {
            $query = ProjectTopic_Masters::where('project_id', $project->id);
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
				$t = Topic_Ug::where('id', $primary_topic_id)->first();
		    } else {
		    	$t = Topic_Masters::where('id', $primary_topic_id)->first();
		    }
			return $t->name;
		}
	}
}
