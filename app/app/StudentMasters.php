<?php
namespace SussexProjects;

class StudentMasters extends Student{
	protected $table = 'students_masters';

	public function user(){
		return $this->hasOne(User::class, 'id');
	}

	public function project(){
		return $this->hasOne(ProjectMasters::class, 'id', 'project_id');
	}
}
