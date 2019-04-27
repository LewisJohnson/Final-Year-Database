<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects;

class ProjectEvaluationQuestion {
	public $title;
	public $description;
	public $type;

	public $group;

	public $submissionType;

	public $supervisorValue;
	public $supervisorComment;

	public $markerValue;
	public $markerComment;

	public $finalValue;
	public $finalComment;

	public $minCommentLength;

	public $supervisorSubmitted;
	public $markerSubmitted;

	function __construct($title, $description, $type, $group, $minCommentLength, $submissionType) {
		$this->title = $title;
		$this->description = $description;
		$this->type = $type;
		$this->group = $group;
		$this->minCommentLength = $minCommentLength;
		$this->submissionType = $submissionType;
    }

	// JSON mapper
	public function map($data) {
		$this->title = $data->title;
		$this->description = $data->description;
		$this->type = $data->type;

		$this->group = $data->group;

		$this->minCommentLength = $data->minCommentLength;
		$this->submissionType = $data->submissionType;

		$this->supervisorValue = $data->supervisorValue;
		$this->supervisorComment = $data->supervisorComment ?? "";

		$this->markerValue = $data->markerValue;
		$this->markerComment = $data->markerComment ?? "";

		$this->finalValue = $data->finalValue;
		$this->finalComment = $data->finalComment ?? "";

		$this->supervisorSubmitted = $data->supervisorSubmitted ?? false;
		$this->markerSubmitted = $data->markerSubmitted ?? false;
	}
}

class PEQSubmissionTypes {
	/**
	 * Both markers have to submit and answer
	 */
	const Both = 0;

	/**
	 * Supervisor only
	 */
	const SupervisorOnly = 1;
}

class PEQValueTypes {
	/**
	 * Any text
	 */
	const PlainText = 0;

	/**
	 *
	 	Fail | Border- | Border | Border+ | Satisfactory- | Satisfactory | Satisfactory+ | Good- | Good | Good+ | Excellent
	 */
	const Scale = 1;

	/**
	 * Unsigned TINYINT 0 - 255
	 */
	const Number = 2;

	/**
	 * Unsigned TINYINT 0 - 255
	 */
	const PosterPresentation = 3;

	/**
	 * Unsigned TINYINT 0 - 255
	 */
	const OralPresentation = 4;

	/**
	 * Unsigned TINYINT 0 - 255
	 */
	const Dissertation = 5;

	/**
	 * Yes | No
	 */
	const YesNo = 6;

	/**
	 * Yes | Possibly | No
	 */
	const YesPossiblyNo = 7;


	/**
	 * A question where a value is not required (Relies solely on comment).
	 */
	const CommentOnly = 8;

	/**
	 * A question where a value is not required (Relies solely on comment).
	 */
	const StudentFeedback = 9;
}