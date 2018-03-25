<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

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
	 */
	protected $fillable = ['project_year', 'start_date', 'mode'];


	/**
	 * The columns to be parsed as dates.
	 *
	 * @var array
	 */
	protected $dates = ['project_year', 'start_date'];


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

	public static function getStartDate($human = null){
		$mode = Mode::all()->first();

		if($human){
			return $mode->start_date->toDayDateTimeString();
		} else {
			return $mode->start_date;
		}
	}

	public static function getProjectYear(){
		$mode = Mode::all()->first();
		return $mode->project_year;
	}

	public static function getMode(){
		$mode = Mode::all()->first();
		return $mode->mode;
	}
}
