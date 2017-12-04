<?php

namespace SussexProjects;

class ProjectMasters extends Project{
	protected $table = 'projects_masters';
	
    public function topics(){
        return $this->belongsToMany('SussexProjects\TopicMasters', 'project_topics_masters', 'project_id', 'topic_id')->withPivot('primary');
    }

	public function student(){
		return $this->belongsTo(StudentMasters::class, 'student_id', 'project_id');
	}

	public function getPrimaryTopic(){
		foreach ($this->topics as $key => $value) {
			if($value->pivot->primary){
				return $value;
			}
		}
	}

	public function getStudentsWithThisProjectSelected(){
		return StudentMasters::where('project_id', $this->id)->where('project_status', 'selected')->get();
	}

	public function getStudentsWithThisProjectAccepted(){
		return StudentMasters::where('project_id', $this->id)->where('project_status', 'accepted')->get();
	}
}
