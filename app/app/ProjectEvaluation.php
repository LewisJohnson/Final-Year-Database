<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;
use SussexProjects\Student;
use Encryptable;

/**
 * The student portfolio model.
 *
 * @see SussexProjects\Student
 */
class ProjectEvaluation extends Model {
	use Traits\Uuids;
	use Traits\Encryptable;
	
	const DissertationMarkIndex = 8;
	
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
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id', 'project_id'];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'is_finalised' => 'boolean',
		'questions' => 'array'
	];

	/**
	 * The attributes that will be encrypted.
	 *
	 * @var array
	 */
	protected $encryptable = ['questions'];

	/**
	 * The table to retrieve data from.
	 *
	 * @return string Table string
	 * @throws Exception Database not found
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_project_evaluation_'.Session::get('education_level')["shortName"];
		} else {
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Returns the project related to this evaluation.
	 *
	 * @return Project
	 */
	public function project(){
		return $this->hasOne(Project::class, 'id');
	}

	public function getQuestions(){
		$questions = [];

		foreach ($this->questions as $question) {
			$peq = new ProjectEvaluationQuestion(null, null, null);
			$peq->map($question);

			array_push($questions, $peq);
		}

		return $questions;
	}

	public function getPresetQuestions() {
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
				"depends on project type; for CS/GAME programming required",
				PEQValueTypes::Scale
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Writeup Quality",
				"Organization / Clarity / References / General presentation/ English / Diagrams and figures/ Within word limit",
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
				PEQValueTypes::YesNoPossibly
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Additional Comments",
				"Justify your mark referring to the comments above where useful",
				PEQValueTypes::CommentOnly
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Have you actually seen a working version of this system/video/application?",
				"",
				PEQValueTypes::YesNo
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Mark for Dissertation%",
				"",
				PEQValueTypes::Number
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Poster Mark %",
				"",
				PEQValueTypes::Number
		));

		array_push($questions,
			new ProjectEvaluationQuestion(
				"Oral Presentation Mark %",
				"",
				PEQValueTypes::Number
		));

		return $questions;
	}
}
