<?php

namespace SussexInformaticsProjects;

class ProjectMasters extends Project{
	protected $table = 'projects_masters';
	
    public function topics(){
        return $this->belongsToMany('SussexInformaticsProjects\TopicMasters', 'project_topics_masters', 'project_id', 'topic_id');
    }
}
