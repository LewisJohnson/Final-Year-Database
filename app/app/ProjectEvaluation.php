<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects;

use Encryptable;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use SussexProjects\Student;

/**
 * The student portfolio model.
 *
 * @see SussexProjects\Student
 */
class ProjectEvaluation extends Model
{
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
		'is_deferred'  => 'boolean',
		'questions'    => 'array',
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
	 * @throws Exception Database not found
	 * @return string    Table string
	 */
	public function getTable()
	{
		if (Session::get('department') !== null)
		{
			return Session::get('department') . '_project_evaluation_' . get_el_short_name();
		}
		else
		{
			throw new Exception('Database not found.');
		}
	}

	/**
	 * Returns the project related to this evaluation.
	 *
	 * @return Project
	 */
	public function project()
	{
		return $this->hasOne(Project::class, 'id', 'project_id');
	}

	/**
	 * @param $group
	 */
	public function supervisorHasSubmittedAllQuestions($group = null)
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($group != null)
			{
				if ($question->group != $group)
				{
					continue;
				}
			}

			if ($question->supervisorOmitSubmission)
			{
				continue;
			}

			if (!$question->supervisorSubmitted)
			{
				return false;
			}
		}

		return true;
	}

	/**
	 * @param $group
	 */
	public function markerHasSubmittedAllQuestions($group = null)
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($group != null)
			{
				if ($question->group != $group)
				{
					continue;
				}
			}

			if ($question->markerOmitSubmission)
			{
				continue;
			}

			if (!$question->markerSubmitted)
			{
				return false;
			}
		}

		return true;
	}

	public function getStatus()
	{
		if ($this->is_finalised)
		{
			return "Finalised";
		}

		if ($this->is_deferred)
		{
			return "Deferred";
		}

		if ($this->supervisorHasSubmittedAllQuestions() && $this->markerHasSubmittedAllQuestions())
		{
			return "Submitted";
		}

		if ((Auth::user()->id == $this->project->supervisor_id) && $this->supervisorHasSubmittedAllQuestions())
		{
			return "Supervisor Submitted";
		}

		if ((Auth::user()->id == $this->project->supervisor_id) && $this->markerHasSubmittedAllQuestions())
		{
			return "Marker Submitted";
		}

		return "In-Progress";
	}

	public function getStatusBootstrapClass()
	{
		if ($this->is_finalised)
		{
			return "text-danger";
		}

		if ($this->is_deferred)
		{
			return "text-info";
		}

		if ($this->supervisorHasSubmittedAllQuestions() && $this->markerHasSubmittedAllQuestions())
		{
			return "text-success";
		}

		return "text-warning";
	}

	/**
	 * @return mixed
	 */
	public function getGroups()
	{
		$groups = [];

		foreach ($this->getQuestions() as $question)
		{
			if (!in_array($question->group, $groups))
			{
				array_push($groups, $question->group);
			}
		}

		return $groups;
	}

	/**
	 * @return mixed
	 */
	public function getQuestions()
	{
		$questions = [];

		foreach ($this->questions as $question)
		{
			$peq = new ProjectEvaluationQuestion(null, null, null, null, null, null);
			$peq->map($question);

			array_push($questions, $peq);
		}

		return $questions;
	}

	public function hasPosterPresentationQuestion()
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($question->type == PEQValueTypes::PosterPresentation)
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * @return mixed
	 */
	public function getPosterPresentationQuestion()
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($question->type == PEQValueTypes::PosterPresentation)
			{
				return $question;
			}
		}

		throw new Exception("Error finding poster mark.");
	}

	public function hasOralPresentationQuestion()
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($question->type == PEQValueTypes::OralPresentation)
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * @return mixed
	 */
	public function getOralPresentationQuestion()
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($question->type == PEQValueTypes::OralPresentation)
			{
				return $question;
			}
		}

		throw new Exception("Error finding oral presentation mark.");
	}

	public function hasDissertationQuestion()
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($question->type == PEQValueTypes::Dissertation)
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * @return mixed
	 */
	public function getDissertationQuestion()
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($question->type == PEQValueTypes::Dissertation)
			{
				return $question;
			}
		}

		throw new Exception("Error finding dissertation mark.");
	}

	public function hasStudentFeedbackQuestion()
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($question->type == PEQValueTypes::StudentFeedback)
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * @return mixed
	 */
	public function getStudentFeedbackQuestion()
	{
		foreach ($this->getQuestions() as $question)
		{
			if ($question->type == PEQValueTypes::StudentFeedback)
			{
				return $question;
			}
		}

		throw new Exception("Error finding student feedback.");
	}

	/**
	 * @param $group
	 */
	public function hasSupervisorFilledGroup($group)
	{
		foreach ($this::getQuestions() as $question)
		{
			if ($question->group != $group)
			{
				continue;
			}

			if ($question->submissionType == PEQSubmissionTypes::Optional)
			{
				continue;
			}

			if ($question->supervisorOmitSubmission)
			{
				continue;
			}

			if (is_null($question->supervisorValue))
			{
				if ($question->type != PEQValueTypes::CommentOnly && $question->type != PEQValueTypes::StudentFeedback)
				{
					return false;
				}
			}

			// Check comments
			if (strlen($question->supervisorComment) < $question->minCommentLength)
			{
				return false;
			}
		}

		return true;
	}

	/**
	 * @param $group
	 */
	public function hasMarkerFilledGroup($group)
	{
		foreach ($this::getQuestions() as $question)
		{
			if ($question->group != $group)
			{
				continue;
			}

			if ($question->submissionType == PEQSubmissionTypes::Optional)
			{
				continue;
			}

			if ($question->markerOmitSubmission)
			{
				continue;
			}

			if ($question->submissionType == PEQSubmissionTypes::SupervisorOnly)
			{
				continue;
			}

			if (is_null($question->markerValue))
			{
				if ($question->type != PEQValueTypes::CommentOnly && $question->type != PEQValueTypes::StudentFeedback)
				{
					return false;
				}
			}

			// Check comments
			if (strlen($question->markerComment) < $question->minCommentLength)
			{
				return false;
			}
		}

		return true;
	}

	/**
	 * @param  $group
	 * @return mixed
	 */
	public function getSupervisorQuestionsLeftToFillSummary($group)
	{
		$output = "";

		foreach ($this::getQuestions() as $question)
		{
			if ($question->group != $group)
			{
				continue;
			}

			if ($question->submissionType == PEQSubmissionTypes::Optional)
			{
				continue;
			}

			if ($question->supervisorOmitSubmission)
			{
				continue;
			}

			$isBad = (is_null($question->supervisorValue) && !($question->type == PEQValueTypes::CommentOnly || $question->type == PEQValueTypes::StudentFeedback)) ||
			strlen($question->supervisorComment) < $question->minCommentLength;

			if ($isBad)
			{
				$output .= '<li class="list-unstyled"><b>' . $question->title . '</b>';
			}

			if (is_null($question->supervisorValue) && !($question->type == PEQValueTypes::CommentOnly || $question->type == PEQValueTypes::StudentFeedback))
			{
				$output .= "	<li>Value is not filled in</li>";
			}

			if (strlen($question->supervisorComment) < $question->minCommentLength)
			{
				$output .= "	<li>Comment is too short</li>";
			}

			if ($isBad)
			{
				$output .= "<br></li>";
			}
		}

		return $output;
	}

	/**
	 * @param  $group
	 * @return mixed
	 */
	public function getMarkerQuestionsLeftToFillSummary($group)
	{

		$output = "";

		foreach ($this::getQuestions() as $question)
		{
			if ($question->group != $group)
			{
				continue;
			}

			if ($question->submissionType == PEQSubmissionTypes::Optional)
			{
				continue;
			}

			if ($question->submissionType == PEQSubmissionTypes::SupervisorOnly)
			{
				continue;
			}

			if ($question->markerOmitSubmission)
			{
				continue;
			}

			$isBad = is_null($question->markerValue) || strlen($question->markerComment) < $question->minCommentLength;

			if ($isBad)
			{
				$output .= '<li class="list-unstyled"><b>' . $question->title . '</b>';
			}

			if (is_null($question->markerValue) && ($question->type != PEQValueTypes::CommentOnly || $question->type != PEQValueTypes::StudentFeedback))
			{
				$output .= "	<li>Value is not filled in</li>";
			}

			if (strlen($question->markerComment) < $question->minCommentLength)
			{
				$output .= "	<li>Comment is too short</li>";
			}

			if ($isBad)
			{
				$output .= "<br></li>";
			}
		}

		return $output;
	}
}
