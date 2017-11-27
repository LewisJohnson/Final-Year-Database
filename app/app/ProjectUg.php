<?php
namespace SussexProjects;

class ProjectUg extends Project{
    protected $table = 'projects_ug';

    public function topics(){
        return $this->belongsToMany('SussexProjects\TopicUg', 'project_topics_ug', 'project_id', 'topic_id');
    }
}