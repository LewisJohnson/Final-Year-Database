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

	public function getSupervisor(){
		return Supervisor::where('id', $this->supervisor_id)->first();
	}

	public function getStudent(){
		if(Session::get("db_type") == "ug"){
			return StudentUg::where('id', $this->student_id)->first();
		} else {
			return StudentMasters::where('id', $this->student_id)->first();
		}
	}

	public function getStudentsWithThisProjectSelected(){
		if(Session::get("db_type") == "ug"){
			return StudentUg::where('project_id', $this->id)->where('project_status', 'selected')->get();
		} else {
			return StudentMasters::where('project_id', $this->id)->where('project_status', 'selected')->get();
		}
	}

	public function getStudentsWithThisProjectAccepted(){
		if(Session::get("db_type") == "ug"){
			return StudentUg::where('project_id', $this->id)->where('project_status', 'accepted')->get();
		} else {
			return StudentMasters::where('project_id', $this->id)->where('project_status', 'accepted')->get();
		}
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
