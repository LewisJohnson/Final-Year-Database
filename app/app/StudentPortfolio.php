<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;
use SussexProjects\Student;

/**
 * The student portfolio model.
 *
 * @see SussexProjects\Student
 */
class StudentPortfolio extends Model{
	use Traits\Uuids;
	
	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;

	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['student_id'];

	/**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
	protected $casts = [
		'custom_fields' => 'array',
		'is_final' => 'boolean'
	];

	/**
	 * The table to retrieve data from.
	 *
	 * @return string Table string
	 * @throws Exception Database not found
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_student_portfolio_'.Session::get('education_level')["shortName"];
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Returns the student related to this user.
	 *
	 * @return Student
	 */
	public function student(){
		return $this->hasOne(Student::class, 'id');
	}

	/**
	 * Returns the student related to this user.
	 *
	 * @return Student
	 */
	public function getCustomFields(){
		$json = json_decode($this->custom_fields, true);
		return $json["fields"];
	}
}
