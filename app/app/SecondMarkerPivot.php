<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

class SecondMarkerPivot extends Model
{
	/**
	 * The models primary key
	 *
	 * @var array
	 */
	protected $primaryKey = 'student_id';

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['student_id', 'marker_id', 'project_id'];

	/**
	 * The table to retrieve data from.
	 *
	 * @throws Exception Database not found
	 * @return string    Table string
	 */
	public function getTable()
	{
		if (Session::get('department') !== null)
		{
			return Session::get('department') . '_second_marker_pivot_' . get_el_short_name();
		}
		else
		{
			throw new Exception('Database not found.');
		}
	}

	/**
	 * The student related to this pivot.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne Student
	 */
	public function student()
	{
		return $this->hasOne(Student::class, 'id', 'student_id');
	}

	/**
	 * The second marker related to this pivot.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne Student
	 */
	public function secondMarker()
	{
		return $this->hasOne(User::class, 'id', 'marker_id');
	}

	/**
	 * The project related to this pivot.
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\HasOne Project
	 */
	public function project()
	{
		return $this->hasOne(Project::class, 'id', 'project_id');
	}
}
