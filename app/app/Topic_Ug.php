<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic_Ug extends topic{
    protected $table = 'topics_ug';

    public function projects(){
        return $this->belongsToMany(Project_Ug::class, 'project_topics_ug');
    }
}
