<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Carbon;
use Exception;

class Mode extends Model{

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;

	/**
	 * The columns to be parsed as dates.
	 *
	 * Laravel can not use the MySql 'Year' data type, so please do not add project year.
	 * @var array
	 */
	protected $dates = ['project_selection', 'supervisor_accept'];


	/**
	 * The models primary key 
	 * 
	 * @var integer
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

		// There is no mode, create one
		if($mode == null){
			$newMode = new Mode();
			$carbon = Carbon::now();

			$newMode->project_year = $carbon->year;
			$newMode->project_selection = $carbon->addYear();
			$newMode->supervisor_accept = $carbon->addYear();
			$newMode->marker_released_to_staff = false;
			$newMode->save();

			return $newMode;
		}

		return $mode;
	}

	/**
	 * Gets project selection date
	 *
	 * @return string
	 */
	public static function getProjectSelectionDate($human = null){
		if($human){
			return Mode::Instance()->project_selection->toDayDateTimeString();
		} else {
			return Mode::Instance()->project_selection;
		}
	}

	/**
	 * Gets supervisor accept date
	 *
	 * @return string
	 */
	public static function getSupervisorAcceptDate($human = null){
		if($human){
			return Mode::Instance()->supervisor_accept->toDayDateTimeString();
		} else {
			return Mode::Instance()->supervisor_accept;
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
	 * Gets project year
	 *
	 * @return string
	 */
	public static function isMarkerReleasedToStaff(){
		return Mode::Instance()->marker_released_to_staff;
	}
}