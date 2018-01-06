<?php
namespace SussexProjects;

class ProjectUg extends Project{
	protected $table = 'projects_ug';

	public function topics(){
		return $this->belongsToMany(TopicUg::class, 'project_topics_ug', 'project_id', 'topic_id')->withPivot('primary');
	}

	public function student(){
		return $this->belongsTo(StudentUg::class);
	}

	public function getPrimaryTopic(){
		foreach ($this->topics as $key => $value) {
			if($value->pivot->primary){
				return $value;
			}
		}
	}

	public function getStudentsWithThisProjectSelected(){
		return StudentUg::where('project_id', $this->id)->where('project_status', 'selected')->get();
	}

	public function getStudentsWithThisProjectAccepted(){
		return StudentUg::where('project_id', $this->id)->where('project_status', 'accepted')->get();
	}
}
