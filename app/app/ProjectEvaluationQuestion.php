<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects;

class ProjectEvaluationQuestion
{
	/**
	 * @var mixed
	 */
	public $title;
	/**
	 * @var mixed
	 */
	public $description;
	/**
	 * @var mixed
	 */
	public $type;

	/**
	 * @var mixed
	 */
	public $group;

	/**
	 * @var mixed
	 */
	public $submissionType;

	/**
	 * @var mixed
	 */
	public $supervisorValue;
	/**
	 * @var mixed
	 */
	public $supervisorComment;

	/**
	 * @var mixed
	 */
	public $markerValue;
	/**
	 * @var mixed
	 */
	public $markerComment;

	/**
	 * @var mixed
	 */
	public $finalValue;
	/**
	 * @var mixed
	 */
	public $finalComment;

	/**
	 * @var mixed
	 */
	public $minCommentLength;

	/**
	 * @var mixed
	 */
	public $supervisorSubmitted;
	/**
	 * @var mixed
	 */
	public $markerSubmitted;

	/**
	 * @var mixed
	 */
	public $supervisorOmitSubmission;
	/**
	 * @var mixed
	 */
	public $markerOmitSubmission;

	/**
	 * @param $title
	 * @param $description
	 * @param $type
	 * @param $group
	 * @param $minCommentLength
	 * @param $submissionType
	 */
	function __construct($title, $description, $type, $group, $minCommentLength, $submissionType)
	{
		$this->title = $title;
		$this->description = $description;
		$this->type = $type;
		$this->group = $group;
		$this->minCommentLength = $minCommentLength;
		$this->submissionType = $submissionType;
	}

	// JSON mapper
	/**
	 * @param $data
	 */
	public function map($data)
	{
		$this->title = $data->title;
		$this->description = $data->description;
		$this->type = $data->type;

		$this->group = $data->group;

		$this->minCommentLength = $data->minCommentLength ?? 0;
		$this->submissionType = $data->submissionType ?? PEQSubmissionTypes::Both;

		$this->supervisorValue = $data->supervisorValue;
		$this->supervisorComment = $data->supervisorComment ?? "";

		$this->markerValue = $data->markerValue;
		$this->markerComment = $data->markerComment ?? "";

		$this->finalValue = $data->finalValue;
		$this->finalComment = $data->finalComment ?? "";

		$this->supervisorSubmitted = $data->supervisorSubmitted ?? false;
		$this->markerSubmitted = $data->markerSubmitted ?? false;

		$this->supervisorOmitSubmission = $data->supervisorOmitSubmission ?? false;
		$this->markerOmitSubmission = $data->markerOmitSubmission ?? false;
	}
}

class PEQSubmissionTypes
{
	                                   /**
	 * Both markers have to submit and answer
	 */
	const Both = 0;

	/**
	 * Supervisor only
	 */
	const SupervisorOnly = 1;

	/**
	 * Optional
	 */
	const Optional = 2;
}

class PEQValueTypes
{
	/**
	 * Any text
	 */
	const PlainText = 0;

	/**
	 *
	 * Fail | Border- | Border | Border+ | Satisfactory- | Satisfactory | Satisfactory+ | Good- | Good | Good+ | Excellent
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