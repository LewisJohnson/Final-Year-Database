<?php
namespace App;

class ProjectUg extends Project{
    protected $table = 'projects_ug';

    public function topics(){
        return $this->belongsToMany('App\TopicUg', 'project_topics_ug', 'project_id', 'topic_id');
    }
}