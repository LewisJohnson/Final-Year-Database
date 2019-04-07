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
		return $this->hasOne(Project::class, 'id', 'project_id');
	}

	public function getStatus(){
		if($this->is_finalised){
			return "Finalised";
		}

		if($this->supervisor_submitted && $this->marker_submitted){
			return "Submitted";
		}

		return "In-Progress";
	}

	public function getStatusBootstrapClass(){
		if($this->is_finalised){
			return "text-danger";
		}

		if($this->supervisor_submitted && $this->marker_submitted){
			return "text-success";
		}

		return "text-warning";
	}

	public function getQuestions(){
		$questions = [];

		foreach($this->questions as $question) {
			$peq = new ProjectEvaluationQuestion(null, null, null);
			$peq->map($question);

			array_push($questions, $peq);
		}

		return $questions;
	}

	public function getPosterPresentationQuestion(){
		foreach($this->getQuestions() as $question) {
			if($question->type == PEQValueTypes::PosterPresentation) {
				return $question;
			}
		}

		throw new Exception("Error finding poster mark.");
	}

	public function getOralPresentationQuestion(){
		foreach($this->getQuestions() as $question) {
			if($question->type == PEQValueTypes::OralPresentation) {
				return $question;
			}
		}

		throw new Exception("Error finding oral presentation mark.");
	}

	public function getDissertationQuestion(){
		foreach($this->getQuestions() as $question) {
			if($question->type == PEQValueTypes::Dissertation) {
				return $question;
			}
		}

		throw new Exception("Error finding dissertation mark.");
	}

	public function getStudentFeedback(){
		foreach($this->getQuestions() as $question) {
			if($question->type == PEQValueTypes::StudentFeedback) {
				return $question;
			}
		}

		throw new Exception("Error finding dissertation mark.");
	}

	public function isFilled($type) {

		$commentAccessor = $type."Comment";

		foreach ($this::getQuestions() as $question) {
			// We probably only want Scale and Number types
			if($question->type == PEQValueTypes::Scale || $question->type == PEQValueTypes::Number){
				// We don't check values because the student could have failed every question

				// Check comments 
				if(strlen($question->$commentAccessor) < 20){
					return false;
				}
			}
		}

		return true;
	}

	public function getQuestionsLeftToFillSummary($type) {

		$commentAccessor = $type."Comment";
		$output = "";

		foreach($this::getQuestions() as $question) {
			// We probably only want Scale and Number types
			if($question->type == PEQValueTypes::Scale || $question->type == PEQValueTypes::Number){
				// We don't check values because the student could have failed every question

				if(strlen($question->$commentAccessor) < 20){
					$output .= '<li class="list-unstyled"><b>'.$question->title.':</b>';
					$output .= "	<li>Comment is too short</li>";
					$output .= "<br></li>";
				}
			}
		}

		return $output;
	}
}
