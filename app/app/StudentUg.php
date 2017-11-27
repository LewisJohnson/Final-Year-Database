<?php
namespace SussexProjects;

class StudentUg extends Student{
	protected $table = 'students_ug';

	public function user(){
		return $this->hasOne(User::class, 'id');
	}
	
	public function getProject(){
		return ProjectUg::where('id', $this->project_id)->first();
	}
}
