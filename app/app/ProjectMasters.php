<?php

namespace SussexProjects;

class ProjectMasters extends Project{
	protected $table = 'projects_masters';
	
    public function topics(){
        return $this->belongsToMany('SussexProjects\TopicMasters', 'project_topics_masters', 'project_id', 'topic_id');
    }
}
