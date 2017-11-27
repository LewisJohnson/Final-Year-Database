<?php
namespace SussexProjects;

class StudentMasters extends Student{
	protected $table = 'students_masters';
	
	public function user(){
		return $this->hasOne(User::class, 'id');
	}

	public function getProject(){
		return ProjectMasters::where('id', $this->project_id)->first();
	}
}
