<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project_Ug extends Project{
    protected $table = 'projects_ug';
    
    public function topics(){
        return $this->belongsToMany(Topic_Ug::class, 'project_topics_ug');
    }
}
