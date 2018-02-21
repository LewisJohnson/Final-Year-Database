<?php
namespace SussexProjects;

class StudentUg extends Student{
	protected $table = 'students_ug';

	public function user(){
		return $this->hasOne(User::class, 'id');
	}

	public function project(){
		return $this->hasOne(ProjectUg::class, 'id', 'project_id');
	}
}
