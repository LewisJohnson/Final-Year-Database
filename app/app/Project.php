<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Project extends Model
{
    protected $fillable = ['supervisor', 'title', 'description', 'archived'];

    public function scopeSearch($query, $searchterm, $title = false, $description = false, $supervisor = false, $topic = false)
    {
        $query = DB::table('projects');

        if($title){
            $query->where("title", "LIKE", '%'.$searchterm.'%');
        }

        if($description){
            //todo: replace with regex
            $query->orWhere("description", "LIKE", '%'.$searchterm.'%');
        }

        if($supervisor){
            $query->orWhere("supervisor", "LIKE",'%'.$searchterm.'%');
        }

        if($topic){
            //todo: this
        }

        return $query->get();
    }

    public function topics(){
        return $this->belongsToMany(Topic::class, 'project_topics');
    }
}
