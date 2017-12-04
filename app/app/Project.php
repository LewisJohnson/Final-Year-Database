<?php

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Session;

class Project extends Model{
	protected $table = null;
	protected $primaryKey = 'id';
	
	// Mass fillable items
	protected $fillable = ['title', 'description', 'skills', 'status', 'start_date'];
	protected $guarded = ['supervisor'];

	public function supervisor(){
		return $this->belongsTo(Supervisor::class, 'supervisor_id', 'id');
	}

	public function marker(){
		return $this->belongsTo(Supervisor::class, 'marker_id', 'id');
	}

	public function isOwnedByUser(){
		if($this->supervisor_id == Auth::user()->supervisor->id){
			return true;
		} else {
			return false;
		}
	}
}
