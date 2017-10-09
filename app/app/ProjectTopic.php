<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Project;
use App\Topic;

class ProjectTopic extends Model{
	public $timestamps = false;
	public $incrementing = false;
	protected $primaryKey = ['project_id', 'topic_id'];
	protected $fillable = ['project_id', 'topic_id'];

	public static function getProjectPrimaryTopicId(Project $project){
		$pt = ProjectTopic
		::where('project_id', $project->id)
		->where('primary', 1)
		->first();

		if($pt === null){
			return '';
		} else {
			return $pt->topic_id;
		}
	}

	public static function getProjectPrimaryTopicName(Project $project){
		$pt = ProjectTopic
		::where('project_id', $project->id)
		->where('primary', 1)
		->first();

		if($pt === null){
			return '';
		} else {
			$t = Topic::where('id', $pt->topic_id)->first();
			return $t->name;
		}
	}
}
