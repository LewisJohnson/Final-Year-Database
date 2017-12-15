<?php

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Session;

class Project extends Model{
	protected $table = null;
	protected $primaryKey = 'id';
	
	// Mass fillable items
	protected $fillable = ['title', 'description', 'skills', 'status', 'author_programme'];
	protected $guarded = ['supervisor'];
	protected $hidden = ['supervisor', 'marker', 'created_at', 'updated_at'];

	public function supervisor(){
		return $this->belongsTo(Supervisor::class, 'supervisor_id', 'id');
	}

	public function marker(){
		return $this->belongsTo(Supervisor::class, 'marker_id', 'id');
	}

	public function isOwnedByUser(){
		if(Auth::user()){
			if(Auth::user()->isSupervisorOrSuperior()){
				if($this->student_proposed_project){
					return false;
				} else{
					return $this->supervisor_id === Auth::user()->supervisor->id;
				}
			}
			if(Auth::user()->isStudent()){
				return $this->student_id === Auth::user()->student->id;
			}
		}
	}
	
}
