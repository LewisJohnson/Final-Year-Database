<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

class Programme extends Model{
	use Traits\Uuids;

use Traits\Uuids;

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	public $fillable = ['name'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	public $id = ['name'];

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_programme';
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * A HTML data-list of all topics.
	 *
	 * @return string
	 */
	public static function getSelectList($programme = null){
		$programmes = Programme::all();

		$rtnString = '<select name="programme">';
		foreach($programmes as $prog) {
			if($programme == $prog){
				$rtnString .= '<option selected value="'.$prog->name.'">'.$prog->name.'</option>';
			} else{
				$rtnString .= '<option value="'.$prog->name.'">'.$prog->name.'</option>';
			}
		}
		$rtnString .= '</select>';

		return $rtnString;
	}
}
