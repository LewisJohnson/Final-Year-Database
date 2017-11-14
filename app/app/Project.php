<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Project extends Model{

    // Mass fillable items
    protected $fillable = ['title', 'description', 'skills', 'status', 'start_date'];
    protected $guarded = ['supervisor'];

    public function topics(){
        return $this->belongsToMany(Topic::class, 'project_topics');
    }

    public function getSupervisor(){
        return Supervisor::where('id', $this->supervisor_id)->first();
    }

    public function getSupervisorAsUser(){
        return User::where('id', $this->supervisor_id)->first();
    }

    public function getStudent(){
        return Student::where('id', $this->student_id)->first();
    }

    public function getStudentAsUser(){
        return User::where('id', $this->student_id)->first();
    }

    public function isOwnedByUser(){
        if($this->supervisor_id == Auth::user()->supervisor->id){
            return true;
        } else {
            return false;
        }
    }

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
            // $query->orWhere("supervisor", "LIKE",'%'.$searchterm.'%');
        }

        if($topic){
            //todo: this
        }

        return $query->get();
    }

}
