<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;
use Exception;

class Mode extends Model{

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
	 * @access protected
	 */
	protected $fillable = ['project_year', 'start_date', 'mode'];


	/**
	 * The columns to be parsed as dates.
	 *
	 * @var array
	 * @access protected
	 */
	protected $dates = ['start_date'];


	/**
	 * The models primary key 
	 * 
	 * @var integer
	 * @access protected
	 */
	protected $primaryKey = 'project_year';

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
			return Session::get('department').'_mode_'.Session::get('education_level')["shortName"];
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Call this method to get singleton
	 * 
	 * ish...
	 *
	 * @return UserFactory
	 */
	public static function Instance(){
		$mode = Mode::all()->first();

		if($mode == null){
			throw new Exception("Error Processing Request", 1);
			
		}

		return $mode;
	}

	/**
	 * Gets start date
	 *
	 * @return string
	 */
	public static function getStartDate($human = null){
		if($human){
			return Mode::Instance()->start_date->toDayDateTimeString();
		} else {
			return Mode::Instance()->start_date;
		}
	}

	/**
	 * Gets project year
	 *
	 * @return string
	 */
	public static function getProjectYear(){
		return Mode::Instance()->project_year;
	}

	/**
	 * Gets mode
	 *
	 * @return string
	 */
	public static function getMode(){
		return Mode::Instance()->mode;
	}
}
