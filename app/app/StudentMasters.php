<?php
namespace SussexProjects;

/**
 * The masters student model.
 * 
 * @see SussexProjects\Http\Controllers\StudentController
*/
class StudentMasters extends Student{

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	protected $table = 'students_masters';

	/**
	 * Returns the user related to this student.
	 *
	 * @return User
	 */
	public function user(){
		return $this->hasOne(User::class, 'id');
	}

	/**
	 * Returns the project this student has selected.
	 *
	 * @return Project
	 */
	public function project(){
		return $this->hasOne(ProjectMasters::class, 'id', 'project_id');
	}
}
