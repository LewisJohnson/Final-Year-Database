<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic_Masters extends Topic
{
    protected $table = 'topics_masters';
    public function projects(){
        return $this->belongsToMany(Project_Masters::class, 'project_topics_masters');
    }
}
