<?php

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
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	public $fillable = ['name'];

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
		$topicNames = Programme::pluck('name');

		$rtnString = '<select name="programme">';
		foreach ($topicNames as $name) {
			if($programme == $name){
				$rtnString .= '<option selected value="'.$name.'">'.$name.'</option>';
			} else{
				$rtnString .= '<option value="'.$name.'">'.$name.'</option>';
			}
		}
		$rtnString .= '</select>';

		return $rtnString;
	}
}
