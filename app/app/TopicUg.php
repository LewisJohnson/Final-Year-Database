<?php
namespace App;

class TopicUg extends Topic{
    protected $table = 'topics_ug';

    public function projects(){
        return $this->belongsToMany('App\ProjectUg', 'project_topics_ug');
    }
}
