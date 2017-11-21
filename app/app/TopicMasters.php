<?php
namespace App;

class TopicMasters extends Topic
{
    protected $table = 'topics_masters';
    public function projects(){
        return $this->belongsToMany(Project_Masters::class, 'project_topics_masters');
    }
}
