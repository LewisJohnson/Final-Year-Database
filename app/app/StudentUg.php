<?php
namespace SussexProjects;

/**
 * The undergraduate student model.
 * 
 * @see SussexProjects\Http\Controllers\StudentController
*/
class StudentUg extends Student{

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	protected $table = 'students_ug';

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
		return $this->hasOne(ProjectUg::class, 'id', 'project_id');
	}
}
