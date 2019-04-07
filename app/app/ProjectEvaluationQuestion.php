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

	public $SupervisorValue;
	public $SupervisorComment;

	public $MarkerValue;
	public $MarkerComment;

	public $FinalValue;
	public $FinalComment;

	function __construct($title, $description, $type) {
		$this->title = $title;
		$this->description = $description;
		$this->type = $type;
    }

	// JSON mapper
	public function map($data) {
		$this->title = $data->title;
		$this->description = $data->description;
		$this->type = $data->type;

		$this->SupervisorValue = $data->SupervisorValue ?? PEQValueTypes::getDefaultValue($this->type);
		$this->SupervisorComment = $data->SupervisorComment ?? "-";

		$this->MarkerValue = $data->MarkerValue ?? PEQValueTypes::getDefaultValue($this->type);
		$this->MarkerComment = $data->MarkerComment ?? "-";

		$this->FinalValue = $data->FinalValue ?? PEQValueTypes::getDefaultValue($this->type);
		$this->FinalComment = $data->FinalComment ?? "-";
	}
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
	 * A question where a value is not required (Relies soely on comment).
	 */
	const CommentOnly = 8;

	/**
	 * A question where a value is not required (Relies soely on comment).
	 */
	const StudentFeedback = 9;

	public static function getDefaultValue($type){
		switch ($type) {
			case PEQValueTypes::PlainText:
			case PEQValueTypes::CommentOnly:
			case PEQValueTypes::StudentFeedback:
				return "";
				break;
			
			case PEQValueTypes::Scale:
			case PEQValueTypes::Number:
			case PEQValueTypes::PosterPresentation:
			case PEQValueTypes::OralPresentation:
			case PEQValueTypes::Dissertation:
			case PEQValueTypes::YesNo:
				return 0;
				break;

			case PEQValueTypes::YesPossiblyNo:
				return 'No';
				break;
		}
	}
}