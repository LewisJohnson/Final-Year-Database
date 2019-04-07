<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Session;

/**
 * The mode singleton model.
 *
 * @see SussexProjects\Http\Controllers\ModeController
 */
class Mode extends Model{
	use Traits\Encryptable;

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
	 * The columns to be parsed as dates.
	 * Laravel can not use the MySql 'Year' data type, so please do not add project year.
	 *
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
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'thresholds' => 'array',
		'evaluation_questions' => 'array'
	];

	/**
	 * The attributes that will be encrypted.
	 *
	 * @var array
	 */
	protected $encryptable = ['thresholds', 'evaluation_questions'];

	/**
	 * The table to retrieve data from.
	 *
	 * @return string Table string
	 * @throws Exception Database not found
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
	 * ish...
	 *
	 * @return Mode
	 */
	public static function Instance(){
		$mode = Mode::first();

		// There is no mode, create one
		if($mode == null){
			$newMode = new Mode();
			$carbon = Carbon::now();

			$newMode->project_year = $carbon->year;
			$newMode->project_selection = $carbon->addYear();
			$newMode->supervisor_accept = $carbon->addYear();
			$newMode->marker_released_to_staff = false;
			$newMode->evaluation_questions = Mode::getPresetQuestions();
			$newMode->save();

			return $newMode;
		}

		if($mode->evaluation_questions == null){
			$mode->evaluation_questions = Mode::getPresetQuestions();
			$mode->save();
		}

		return $mode;
	}

	/**
	 * Gets project selection date
	 *
	 * @param boolean $human
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
	 * @param boolean $human
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
	 * Gets thresholds for project evaluations
	 *
	 * @return string
	 */
	public static function getThresholds(){
		$thresholds = Mode::Instance()->thresholds;

		if(!empty($thresholds)) {
			sort($thresholds);
		}

		return $thresholds;
	}

	/**
	 * Gets the default questions for project evaluations
	 *
	 * @return string
	 */
	public static function getEvaluationQuestions(){
		return Mode::Instance()->evaluation_questions;
	}

	/**
	 * Gets the boolean is marker realeased to staff
	 *
	 * @return string
	 */
	public static function isMarkerReleasedToStaff(){
		return Mode::Instance()->marker_released_to_staff;
	}

	private static function getPresetQuestions() {
		$questions = [];

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Basic Criteria",
				"Understanding of problem / Completion of project / Overall quality of work / Extent to which objectives are met",
				PEQValueTypes::Scale
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Quality of Research & Analysis",
				"Clear objectives / Background literature / Research / Difficulty of the problem / Completeness / Professional issues",
				PEQValueTypes::Scale
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Technical Quality",
				"Depends on project type; for CS/GAME programming required",
				PEQValueTypes::Scale
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Writeup Quality",
				"Organization / Clarity / References / General presentation / English / Diagrams and figures / Within word limit",
				PEQValueTypes::Scale
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Evaluation",
				"Justification of decisions / Critical Evaluation of achievements",
				PEQValueTypes::Scale
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Exceptional Criteria",
				"Evidence of outstanding merit / Contains publishable material / Reaches beyond taught courses",
				PEQValueTypes::YesPossiblyNo
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Additional Comments",
				"Justify your mark referring to the comments above where useful",
				PEQValueTypes::CommentOnly
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Have you actually seen a working version of this system / video / application?",
				"",
				PEQValueTypes::YesNo
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Poster Presentation Mark %",
				"",
				PEQValueTypes::PosterPresentation
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Oral Presentation Mark %",
				"",
				PEQValueTypes::OralPresentation
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Mark for Dissertation %",
				"",
				PEQValueTypes::Dissertation
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Student Feedback",
				"",
				PEQValueTypes::StudentFeedback
		));

		return $questions;
	}
}