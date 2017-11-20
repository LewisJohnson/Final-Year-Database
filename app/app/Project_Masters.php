<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project_Masters extends Project{
	protected $table = 'projects_masters';
	
    public function topics(){
        return $this->belongsToMany(Topic_Masters::class, 'project_topics_masters');
    }
}
