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
}
