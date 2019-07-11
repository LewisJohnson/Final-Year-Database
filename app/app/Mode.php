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
	protected $dates = ['project_selection', 'supervisor_accept', 'project_evaluation_date'];

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
		$mode = Mode::orderBy('project_year', 'desc')->first();

		// There is no mode, create one
		if($mode == null){
			$newMode = new Mode();
			$carbon = Carbon::now();

			$newMode->project_year = $carbon->year;
			$newMode->project_selection = $carbon->addYear();
			$newMode->supervisor_accept = $carbon->addYear();
			$newMode->marker_released_to_staff = false;
			$newMode->evaluation_questions = Mode::getPresetQuestions();
			$newMode->project_evaluation_date = $carbon->addYear();
			$newMode->save();

			return $newMode;
		}

		if($mode->evaluation_questions == null){
			$mode->evaluation_questions = Mode::getPresetQuestions();
			$mode->save();
		}

		if($mode->project_evaluation_date == null){
			$mode->project_evaluation_date = Carbon::now()->addYear();
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
	 * Gets supervisor accept date
	 *
	 * @param boolean $human
	 *
	 * @return string
	 */
	public static function getProjectEvaluationDate($human = null){
		if($human){
			return Mode::Instance()->project_evaluation_date->toDayDateTimeString();
		} else {
			return Mode::Instance()->project_evaluation_date;
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
	public static function getFriendlyProjectYear(){
		return Mode::Instance()->project_year.'/'.(Mode::Instance()->project_year + 1);
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
	 * Gets the default questions for project evaluations
	 *
	 * @return string
	 */
	public static function getEvaluationPercentageDifference(){
		return Mode::Instance()->project_evaluation_percentage_difference;
	}

	/**
	 * Gets the boolean is marker released to staff
	 *
	 * @return string
	 */
	public static function isMarkerReleasedToStaff(){
		return Mode::Instance()->marker_released_to_staff;
	}

	/**
	 * Gets old years
	 *
	 * @return string
	 */
	public static function getOldProjectYears(){
		return Mode::Where('project_year', '<>', Mode::Instance()->project_year)->get();
	}

	/**
	 * Gets old years
	 *
	 * @return string
	 */
	public static function getDependenciesForProjectYear(){
		return Mode::Where('project_year', '<>', Mode::Instance()->project_year)->get();
	}

	private static function getPresetQuestions() {
		$questions = [];

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Basic Criteria",
				"Understanding of problem / Completion of project / Overall quality of work / Extent to which objectives are met",
				PEQValueTypes::Scale,
				PEQSubmissionTypes::Both,
				20,
				'A'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Quality of Research & Analysis",
				"Clear objectives / Background literature / Research / Difficulty of the problem / Completeness / Professional issues",
				PEQValueTypes::Scale,
				PEQSubmissionTypes::Both,
				20,
				'A'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Technical Quality",
				"Depends on project type; for CS/GAME programming required",
				PEQValueTypes::Scale,
				PEQSubmissionTypes::Both,
				20,
				'A'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Writeup Quality",
				"Organization / Clarity / References / General presentation / English / Diagrams and figures / Within word limit",
				PEQValueTypes::Scale,
				PEQSubmissionTypes::Both,
				20,
				'A'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Evaluation",
				"Justification of decisions / Critical Evaluation of achievements",
				PEQValueTypes::Scale,
				PEQSubmissionTypes::Both,
				20,
				'A'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Exceptional Criteria",
				"Evidence of outstanding merit / Contains publishable material / Reaches beyond taught courses",
				PEQValueTypes::YesPossiblyNo,
				PEQSubmissionTypes::Both,
				20,
				'A'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Additional Comments",
				"Justify your mark referring to the comments above where useful",
				PEQValueTypes::CommentOnly,
				PEQSubmissionTypes::Both,
				20,
				'A'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Have you actually seen a working version of this system / video / application?",
				"",
				PEQValueTypes::YesNo,
				PEQSubmissionTypes::Both,
				20,
				'A'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Poster Presentation Mark %",
				"",
				PEQValueTypes::PosterPresentation,
				PEQSubmissionTypes::Both,
				20,
				'B'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Oral Presentation Mark %",
				"",
				PEQValueTypes::OralPresentation,
				PEQSubmissionTypes::Both,
				20,
				'C'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Mark for Dissertation %",
				"",
				PEQValueTypes::Dissertation,
				PEQSubmissionTypes::Both,
				20,
				'D'
			)
		);

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Student Feedback",
				"",
				PEQValueTypes::StudentFeedback,
				PEQSubmissionTypes::SupervisorOnly,
				50,
				'D'
			)
		);

		return $questions;
	}
}