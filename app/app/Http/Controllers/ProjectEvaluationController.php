<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use SussexProjects\Mode;
use SussexProjects\PEQValueTypes;
use SussexProjects\Project;
use SussexProjects\ProjectEvaluation;
use SussexProjects\ProjectEvaluationPivot;
use Illuminate\Support\Carbon;
use SussexProjects\Transaction;
use SussexProjects\Student;
use SussexProjects\User;
use Log;

/**
 * The admin controller.
 * Methods in this controller are used for project and system administrators.
 *
 * @see SussexProjects\User
 */
class ProjectEvaluationController extends Controller
{

	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * An overall view of project evaluations.
	 *
	 *
	 * @param  Project                                                    $project
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function report(Request $request)
	{
		if (!empty($request->project_year))
		{
			$userTable = (new User())->getTable();
			$studentTable = (new Student())->getTable();

			$students = Student::join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
				->select($studentTable . '.*')
				->where('user.active_year', $request->project_year)
				->orderBy('user.last_name', 'asc')
				->get();
		}
		else
		{
			$students = Student::getAllStudentsQuery()->get();
		}

		return view('evaluation.report')
			->with("students", $students);
	}

	/**
	 * The project evaluation view.
	 *
	 * @param  \Illuminate\Http\Project	$project
	 * @return \Illuminate\View\View
	 */
	public function show(Student $student)
	{
		$evaluation = $student->getEvaluation();
		$project = null;

		if (!empty($evaluation))
		{
			$project = $evaluation->getProject();
		}

		// If user isn't the supervisor or second marker, check if they're admin or external marker
		if (empty($project))
		{
			if (!empty($student->getSecondMarker()) && !$student->getSecondMarker()->id)
			{
				if (!Auth::user()->isAdminOfEducationLevel() && !Auth::user()->isExternalMarker())
				{
					return parent::Unauthorised(__METHOD__);
				}
			}
		}
		else
		{
			if (Auth::user()->id != ($project->supervisor->id || $project->getSecondMarker()->id))
			{
				if (!Auth::user()->isAdminOfEducationLevel() && !Auth::user()->isExternalMarker())
				{
					return parent::Unauthorised(__METHOD__);
				}
			}
		}

		// If the evaluation is null, set up a new one
		if (is_null($evaluation))
		{
			DB::transaction(function () use ($student)
			{
				$studentProject = $student->project;
				$evaluation = new ProjectEvaluation();
				$evaluation->fill(array(
					'is_finalised' => false,
					'questions'    => Mode::getEvaluationQuestions(),
					'project_year' => Mode::getProjectYear(),
				));

				$evaluation->save();

				$pivot = new ProjectEvaluationPivot();
				$pivot->proj_eval_id = $evaluation->id;
				$pivot->student_id = $student->id;

				if (!empty($studentProject))
				{
					$pivot->project_id = $studentProject->id;
				}

				$pivot->save();

				$transaction = new Transaction();
				$transaction->fill(array(
					'type'             => 'evaluation',
					'action'           => 'created',
					'student'          => $pivot->student_id,
					'transaction_date' => new Carbon()
				));

				if (!empty($studentProject) && Auth::user()->id == $studentProject->supervisor->id)
				{
					$transaction->supervisor = Auth::user()->id;
				}
				else if (!empty($studentProject) && !empty($studentProject->getSecondMarker()) && Auth::user()->id == $studentProject->getSecondMarker()->id)
				{
					$transaction->admin = Auth::user()->id;
				}
				else
				{
					$transaction->admin = Auth::user()->id;
				}

				$transaction->save();
			});

			parent::logInfo(__METHOD__, "Project evaluation created");

			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		return view('evaluation.evaluation')
			->with("student", $student)
			->with("project", $project)
			->with("evaluation", $evaluation);
	}


	/**
	 * Creates all project evaluations for accepted students.
	 *
	 *
	 * @param  \Illuminate\Http\Project	$project
	 * @return \Illuminate\View\View
	 */
	public function createAll(Project $project)
	{
		$students = Student::getAllStudentsQuery()->where('project_status', 'accepted')->get();

		foreach ($students as $student)
		{
			if (empty($student->project))
			{
				throw new Exception('The student "' . $student->getFullName() . '" has been accepted but has no project.');
			}

			$evaluation = $student->project->evaluation;

			// If the evaluation is null, set up a new one
			if (is_null($evaluation))
			{
				$evaluation = new ProjectEvaluation();

				$evaluation->project_id = $student->project->id;
				$evaluation->fill(array(
					'is_finalised' => false,
					'questions'    => Mode::getEvaluationQuestions(),
					'project_year' => Mode::getProjectYear(),
				));

				$evaluation->save();
			}
		}

		parent::logInfo(__METHOD__, "Created all Project Evaluations for accepted students");
		parent::logAdminTransaction('evaluation', 'created-all');

		return redirect()->action('ProjectEvaluationController@report');
	}

	/**
	 * An view to set the canvas URLs for project evaluations.
	 *
	 *
	 * @param  Project                                                    $project
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function amendCanvasUrlsView(Request $request)
	{

		if (!empty($request->project_year))
		{
			$userTable = (new User())->getTable();
			$studentTable = (new Student())->getTable();

			$students = Student::join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
				->select($studentTable . '.*')
				->where('user.active_year', $request->project_year)
				->orderBy('user.last_name', 'asc')
				->get();
		}
		else
		{
			$students = Student::getAllStudentsQuery()->get();
		}

		return view('evaluation.amend-canvas-urls')
			->with("students", $students);
	}

	/**
	 * An view to set the canvas URLs for project evaluations.
	 *
	 *
	 * @param  Project                                                    $project
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function amendCanvasUrls(Request $request)
	{
		$students = Student::getAllStudentsQuery()->get();

		foreach ($students as $student)
		{
			if (!empty($student->project) && !empty($student->project->evaluation))
			{
				$canvas_url = $request[$student->project->evaluation->id . "_canvas_url"];

				if ($canvas_url != null)
				{
					$student->project->evaluation->canvas_url = $canvas_url;
					$student->project->evaluation->save();
				}
			}
		}

		parent::logInfo(__METHOD__, "Updated Project Evaluation Canvas URLs");
		parent::logAdminTransaction('evaluation', 'updated-canvas-urls');

		session()->flash('message', 'Evaluation Canvas URLs have been updated successfully');
		session()->flash('message_type', 'success');

		return view('evaluation.amend-canvas-urls')
			->with("students", $students);
	}

	/**
	 * Updates a specified resource in storage.
	 *
	 *
	 * @param  Project	$project
	 * @param  Request	$request
	 * @return \Illuminate\Http\Response
	 */
	public function update(ProjectEvaluation $evaluation, Request $request)
	{
		$project = $evaluation->getProject();
		$student = $evaluation->getStudent();

		if (empty($project))
		{
			session()->flash('message', 'The project evaluation must have a project before being updated.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		if (empty($student))
		{
			session()->flash('message', 'The project evaluation must have a student before being updated.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$isProjectSupervisor = Auth::user()->id == $project->supervisor->id;
		$isProjectMarker = Auth::user()->id == $student->getSecondMarker()->id;

		if (!$isProjectSupervisor && !$isProjectMarker)
		{
			parent::Unauthorised(__METHOD__);
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		if (($isProjectSupervisor && $evaluation->supervisorHasSubmittedAllQuestions()) ||
			($isProjectMarker && $evaluation->markerHasSubmittedAllQuestions())
		)
		{
			$context = ['evaluation' => $evaluation];
			parent::logInfo(__METHOD__, 'User tried to update project evaluation with all marks submitted', $context);

			session()->flash('message', 'You have already submitted all your marks.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		if ($evaluation->is_finalised)
		{
			$context = ['evaluation' => $evaluation];
			parent::logInfo(__METHOD__, 'User tried to update finalised project evaluation', $context);

			session()->flash('message', 'This project evaluation has been finalised.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		$questions = $evaluation->questions;

		for ($i = 0; $i < count($questions); $i++)
		{
			if ($isProjectSupervisor)
			{
				$accessor = "supervisor";
			}
			elseif ($isProjectMarker)
			{
				$accessor = "marker";
			}

			// Check Supervisor / Marker has already submitted
			$submittedAccessor = $accessor . 'Submitted';
			if ($questions[$i]->$submittedAccessor)
			{
				continue;
			}

			// Check if is an omission
			if (!empty($request[$i . '_' . $accessor . '_omit_submission']))
			{
				$omissionAccessor = $accessor . 'OmitSubmission';
				$questions[$i]->$omissionAccessor = true;
				continue;
			}

			$value = $request[$i . '_' . $accessor . '_value'];

			switch ($questions[$i]->type)
			{
				case PEQValueTypes::Scale:
					$value = (int) max(0, min(10, $value));
					break;

				case PEQValueTypes::Number:
				case PEQValueTypes::PosterPresentation:
				case PEQValueTypes::OralPresentation:
				case PEQValueTypes::Dissertation:
					$value = (int) max(0, min(100, $value));
					break;

				case PEQValueTypes::YesNo:
					$value = (bool) $value;
					break;

				case PEQValueTypes::YesPossiblyNo:
					$value = (int) max(0, min(2, $value));
					break;
			}

			$valueAccessor = $accessor . 'Value';
			$questions[$i]->$valueAccessor = $value;

			$commentAccessor = $accessor . 'Comment';
			$questions[$i]->$commentAccessor = $request[$i . '_' . $accessor . '_comment'];
		}

		$evaluation->questions = $questions;

		if (!empty($request->canvas_url))
		{
			$evaluation->canvas_url = $request->canvas_url;
		}

		$evaluation->save();

		if ($request->ajax)
		{
			return response()->json(array(
				'successful' => true,
			));
		}
		else
		{
			session()->flash('message', 'The project evaluation for "' . $project->title . '" has been updated.');
			session()->flash('message_type', 'success');

			return redirect()->action('ProjectEvaluationController@show', $student);
		}
	}

	/**
	 * Submits a group for the evaluation
	 *
	 *
	 * @param  Request				$request		Must include the group to be submitted
	 * @param  ProjectEvaluation	$evaluation		The project the evaluation belongs too
	 * @return \Illuminate\Http\Response
	 */
	public function submitGroup(Request $request, ProjectEvaluation $evaluation)
	{
		$group = $request->group;
		$project = $evaluation->getProject();
		$student = $evaluation->getStudent();

		if (empty($group))
		{
			session()->flash('message', 'Invalid group submitted.');
			session()->flash('message_type', 'error');

			Log::error("ProjectEvaluationController::submitGroup - Tried to submit empty group.");

			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		if (empty($project))
		{
			session()->flash('message', 'The project evaluation must have a project before being updated.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		if (empty($student))
		{
			session()->flash('message', 'The project evaluation must have a student before being updated.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$isProjectSupervisor = Auth::user()->id == $project->supervisor->id;
		$isProjectMarker = Auth::user()->id == $student->getSecondMarker()->id;

		if (!$isProjectSupervisor && !$isProjectMarker)
		{
			return parent::Unauthorised(__METHOD__);
		}

		if ($evaluation->is_finalised)
		{
			session()->flash('message', 'This project evaluation has been finalised.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		$questions = $evaluation->questions;

		for ($i = 0; $i < count($questions); $i++)
		{
			if ($isProjectSupervisor)
			{
				$accessor = "supervisorSubmitted";
			}
			elseif ($isProjectMarker)
			{
				$accessor = "markerSubmitted";
			}

			if ($questions[$i]->group == $group)
			{
				$questions[$i]->$accessor = true;
			}
		}

		$evaluation->update(array(
			'questions' => $questions,
		));

		session()->flash('message', 'You have successfully submitted Group "' . $group . '".');
		session()->flash('message_type', 'success');

		return redirect()->action('ProjectEvaluationController@show', $student);
	}

	/**
	 * Un-submits the group for the evaluation
	 *
	 *
	 * @param  Request	$request	Must include the group to be un-submitted
	 * @param  Project	$project	The project the evaluation belongs too
	 * @return \Illuminate\Http\Response
	 */
	public function unsubmitGroup(Request $request, ProjectEvaluation $evaluation)
	{
		$group = $request->group;
		$project = $evaluation->getProject();
		$student = $evaluation->getStudent();

		if (empty($group))
		{
			session()->flash('message', 'Invalid group submitted.');
			session()->flash('message_type', 'error');


			Log::error("ProjectEvaluationController::unsubmitGroup - Tried to un-submit empty group.");

			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		if (empty($project))
		{
			session()->flash('message', 'The project evaluation must have a project before being updated.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		if (empty($student))
		{
			session()->flash('message', 'The project evaluation must have a student before being updated.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$isProjectSupervisor = Auth::user()->id == $project->supervisor->id;
		$isProjectMarker = Auth::user()->id == $student->getSecondMarker()->id;

		if (!$isProjectSupervisor && !$isProjectMarker)
		{
			return parent::Unauthorised(__METHOD__);
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		if ($evaluation->is_finalised)
		{
			session()->flash('message', 'This project evaluation has been finalised.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		$questions = $evaluation->questions;

		for ($i = 0; $i < count($questions); $i++)
		{
			if ($isProjectSupervisor)
			{
				$accessor = "supervisorSubmitted";
				$omitAccessor = "supervisorOmitSubmission";
			}
			elseif ($isProjectMarker)
			{
				$accessor = "markerSubmitted";
				$omitAccessor = "markerOmitSubmission";
			}

			if ($questions[$i]->group == $group)
			{
				$questions[$i]->$accessor = false;
				$questions[$i]->$omitAccessor = false;
			}
		}

		$evaluation->update(array(
			'questions' => $questions,
		));

		session()->flash('message', 'You have un-submitted Group "' . $group . '".');
		session()->flash('message_type', 'warning');

		return redirect()->action('ProjectEvaluationController@show', $student);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 *
	 * @param  Project	$project
	 * @param  Request	$request
	 * @return \Illuminate\Http\Response
	 */
	public function manualFinaliseView(Request $request)
	{
		$student = new Student();
		$user = new User();

		$students = Student::select($student->getTable() . '.*')
			->join($user->getTable() . ' as user', 'user.id', '=', $student->getTable() . '.id')
			->orderBy('last_name', 'asc')
			->get();

		$students = $students->filter(function ($student)
		{
			if (empty($student->project))
			{
				return false;
			}

			if (empty($student->project->evaluation))
			{
				return false;
			}

			return !$student->project->evaluation->is_finalised;
		});

		return view('evaluation.finalise-manual')
			->with("students", $students);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 *
	 * @param  Project	$project
	 * @param  Request	$request
	 * @return \Illuminate\Http\Response
	 */
	public function manualFinalise(Request $request)
	{
		$evaluations = ProjectEvaluation::all();
		$finaliseCount = 0;

		foreach ($evaluations as $evaluation)
		{
			$finalise = $request[$evaluation->id . "_finalise"];

			if ($finalise != null)
			{
				$evaluation->is_finalised = true;
				$evaluation->is_deferred = false;

				$evaluation->save();

				$finaliseCount++;
			}
		}

		session()->flash('message', $finaliseCount . ' project evaluation(s) have been finalised.');
		session()->flash('message_type', 'success');

		return redirect()->action('ProjectEvaluationController@manualFinaliseView');
	}

	/**
	 * Update the specified resource in storage.
	 *
	 *
	 * @param  Project	$project
	 * @param  Request	$request
	 * @return \Illuminate\Http\Response
	 */
	public function finalise(ProjectEvaluation $evaluation, Request $request)
	{
		$project = $evaluation->getProject();
		$student = $evaluation->getStudent();

		if (empty($project))
		{
			session()->flash('message', 'The project evaluation must have a project before being updated.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		if (empty($student))
		{
			session()->flash('message', 'The project evaluation must have a student before being updated.');
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		$isProjectSupervisor = Auth::user()->id == $project->supervisor->id;
		$isProjectMarker = Auth::user()->id == $project->getSecondMarker()->id;

		if (!$isProjectSupervisor && !$isProjectMarker)
		{
			return parent::Unauthorised(__METHOD__);
			session()->flash('message_type', 'error');
			return redirect()->action('HomeController@index');
		}

		if ($evaluation->is_finalised)
		{
			session()->flash('message', 'This project evaluation has already been finalised.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		if (!empty($request->joint_report) && strlen($request->joint_report) < 30)
		{
			session()->flash('message', 'The joint report is too short.');
			session()->flash('message_type', 'error');
			return redirect()->action('ProjectEvaluationController@show', $student);
		}

		$questions = $evaluation->questions;

		for ($i = 0; $i < count($questions); $i++)
		{
			if ($questions[$i]->type == PEQValueTypes::PosterPresentation)
			{
				$value = $request->poster_final_mark;
			}
			elseif ($questions[$i]->type == PEQValueTypes::OralPresentation)
			{
				$value = $request->presentation_final_mark;
			}
			elseif ($questions[$i]->type == PEQValueTypes::Dissertation)
			{
				$value = $request->dissertation_final_mark;
			}
			else
			{
				continue;
			}

			$value = (int) max(0, min(100, $value));

			$valueAccessor = 'finalValue';
			$commentAccessor = 'finalComment';

			$questions[$i]->$valueAccessor = $value;

			if ($questions[$i]->type == PEQValueTypes::Dissertation)
			{
				if (!empty($request->joint_report))
				{
					$questions[$i]->$commentAccessor = $request->joint_report;
				}
				else
				{
					$questions[$i]->$commentAccessor = "Not required.";
				}
			}
		}

		$evaluation->update(array(
			'is_finalised' => true,
			'is_deferred'  => false,
			'questions'    => $questions,
		));

		session()->flash('message', 'The project evaluation for "' . $project->title . '" has been finalised.');
		session()->flash('message_type', 'success');

		$student = $evaluation->getStudent();
		return redirect()->action('ProjectEvaluationController@show', $student);
	}

	/**
	 * Un-finalises a project evaluation.
	 *
	 *
	 * @param  ProjectEvaluation	$evaluation
	 * @return \Illuminate\Http\Response
	 */
	public function undoFinalise(ProjectEvaluation $evaluation)
	{
		$evaluation->is_finalised = false;
		$evaluation->save();


		session()->flash('message', 'The project evaluation has been un-finalised');
		session()->flash('message_type', 'warning');

		$student = $evaluation->getStudent();
		return redirect()->action('ProjectEvaluationController@show', $student);
	}

	/**
	 * Deletes a project evaluation.
	 *
	 *
	 * @param  ProjectEvaluation	$evaluation
	 * @return \Illuminate\Http\Response
	 */
	public function delete(ProjectEvaluation $evaluation)
	{
		$student = $evaluation->getStudent();

		$transaction = new Transaction();
		$transaction->fill(array(
			'type'             => $type,
			'action'           => $action,
			'student'		   => $student->id,
			'admin'            => Auth::user()->id,
			'transaction_date' => new Carbon()
		));

		$evaluation->delete();
		$transaction->save();

		session()->flash('message', 'The project evaluation for "' . $student->user->getfullName() . '" has been deleted');
		session()->flash('message_type', 'danger');

		return response()->json(array(
			'successful' => true,
		));
	}

	/**
	 * Defers a project evaluation.
	 *
	 *
	 * @param  ProjectEvaluation	$evaluation
	 * @return \Illuminate\Http\Response
	 */
	public function defer(ProjectEvaluation $evaluation, Request $request)
	{
		parent::logInfo(__METHOD__, "Project evaluation deferred", ['evaluation' => $evaluation]);

		$evaluation->is_deferred = true;
		$evaluation->save();

		session()->flash('message', 'The project evaluation has been deferred');
		session()->flash('message_type', 'warning');

		$student = $evaluation->getStudent();
		return redirect()->action('ProjectEvaluationController@show', $student);
	}

	/**
	 * Defers a project evaluation.
	 *
	 * @param  ProjectEvaluation	$evaluation
	 * @return \Illuminate\Http\Response
	 */
	public function undefer(ProjectEvaluation $evaluation, Request $request)
	{
		parent::logInfo(__METHOD__, "Project evaluation un-deferred", ['evaluation' => $evaluation]);

		$evaluation->is_deferred = false;
		$evaluation->save();

		session()->flash('message', 'The project evaluation is now in-progress');
		session()->flash('message_type', 'success');

		$student = $evaluation->getStudent();
		return redirect()->action('ProjectEvaluationController@show', $student);
	}

	/**
	 * Exports the project evaluation data as CSV.
	 *
	 *
	 * @param  Request	$request
	 * @return \Illuminate\Http\Response A CSV file
	 */
	public function export(Request $request)
	{
		parent::logInfo(__METHOD__, "Export started");

		$students = Student::all();
		$results = array();

		foreach ($students as $student)
		{
			$ar = array();

			$ar["regNo"] = $student->registration_number;
			$ar["fName"] = $student->user->first_name;
			$ar["lName"] = $student->user->last_name;
			$ar["prog"] = $student->user->getProgrammeName();

			if (!empty($student->project))
			{
				$ar["proj"] = $student->project->title;
			}
			else
			{
				$ar["proj"] = '-';
			}

			if (!empty($student->project->evaluation) && $student->project->evaluation->is_finalised)
			{
				$eval = $student->project->evaluation;

				if ($eval->hasPosterPresentationQuestion())
				{
					$ar["posterMark"] = $eval->getPosterPresentationQuestion()->finalValue;
				}
				else
				{
					$ar["posterMark"] = 'n/a';
				}

				if ($eval->hasOralPresentationQuestion())
				{
					$ar["presentationMark"] = $eval->getOralPresentationQuestion()->finalValue;
				}
				else
				{
					$ar["presentationMark"] = 'n/a';
				}

				if ($eval->hasDissertationQuestion())
				{
					$ar["dissertationMark"] = $eval->getDissertationQuestion()->finalValue;
				}
				else
				{
					$ar["dissertationMark"] = 'n/a';
				}
			}
			else
			{
				$ar["posterMark"] = '-';
				$ar["presentationMark"] = '-';
				$ar["dissertationMark"] = '-';
			}

			array_push($results, $ar);
		}

		$filepath = "../storage/app/ProjectEvaluationData.csv";
		$file = fopen($filepath, 'w');

		fputcsv($file, array(
			'Candidate Number', 'First name', 'Last name', 'Programme', 'Project Title',
			'Agreed Poster Mark', 'Agreed Presentation Mark', 'Agreed Dissertation Mark',
		));

		foreach ($results as $result)
		{
			fputcsv($file, $result);
		}

		fclose($file);

		header('Content-Description: File Transfer');
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename=ProjectEvaluationData.csv');
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($filepath));

		ob_clean();
		flush();
		readfile($filepath);
		unlink($filepath);

		parent::logInfo(__METHOD__, "Export finished");

		return;
	}

	/**
	 * An overall view of project evaluations.
	 *
	 *
	 * @param  Project                                                    $project
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function studentFeedback(Request $request)
	{
		$student = new Student();
		$user = new User();

		if (isset($request->pe_hide_incomplete))
		{
			Cookie::queue('pe_hide_incomplete', $request->pe_hide_incomplete, 525600);
		}
		else
		{
			$request->pe_hide_incomplete = Cookie::get('pe_hide_incomplete');
		}

		$students = Student::select($student->getTable() . '.*')
			->join($user->getTable() . ' as user', 'user.id', '=', $student->getTable() . '.id')
			->orderBy('last_name', 'asc')
			->get();

		if ($request->pe_hide_incomplete)
		{
			$students = $students->filter(function ($student)
			{
				$eval = $student->getEvaluation();

				if (empty($eval))
				{
					return false;
				}

				if ($eval->is_deferred)
				{
					return false;
				}

				return $eval->is_finalised;
			});
		}

		return view('evaluation.feedback')
			->with("students", $students)
			->with('pe_hide_incomplete', $request->pe_hide_incomplete);
	}

	/**
	 * An overall view of project evaluations.
	 *
	 *
	 * @param  Project                                                    $project
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function all(Request $request)
	{
		$userTable = (new User())->getTable();
		$studentTable = (new Student())->getTable();

		$students = Student::select($studentTable . '.*')
			->join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
			->orderBy('last_name', 'asc')
			->get();

		$students = $students->sortBy(function ($student)
		{
			if (empty($student->project))
			{
				return 4;
			}

			if (empty($student->project->evaluation))
			{
				return 3;
			}

			if ($student->project->evaluation->is_deferred)
			{
				return 2;
			}

			if (!$student->project->evaluation->is_finalised)
			{
				return 1;
			}

			return 0;
		});

		return view('evaluation.all')
			->with("students", $students);
	}

	/**
	 * Exports the student feedback in all project evaluations as CSV.
	 *
	 *
	 * @param  Request	$request
	 * @return \Illuminate\Http\Response A CSV file
	 */
	public function exportStudentFeedback(Request $request)
	{

		$students = Student::all();
		$results = array();

		foreach ($students as $student)
		{
			$ar = array();

			$ar["regNo"] = $student->registration_number;
			$ar["fName"] = $student->user->first_name;
			$ar["lName"] = $student->user->last_name;
			$ar["prog"] = $student->user->getProgrammeName();

			if (!empty($student->project))
			{
				$ar["proj"] = $student->project->title;

				$ar["supervisor"] = $student->project->supervisor->getFullName();

				if (!empty($student->getSecondMarker()))
				{
					$ar["marker"] = $student->getSecondMarker()->getFullName();
				}
				else
				{
					$ar["marker"] = '-';
				}

				if (!empty($student->project->evaluation) && $student->project->evaluation->is_finalised)
				{
					$ar["feedback"] = $student->project->evaluation->getStudentFeedbackQuestion()->supervisorComment;
				}
				else
				{
					$ar["feedback"] = '-';
				}
			}
			else
			{
				$ar["proj"] = '-';
				$ar["supervisor"] = '-';
				$ar["marker"] = '-';
			}

			array_push($results, $ar);
		}

		$filepath = "../storage/app/ProjectEvaluationStudentFeedbackData.csv";
		$file = fopen($filepath, 'w');

		fputcsv($file, array(
			'Candidate Number', 'Student First name', 'Student Last name', 'Programme',
			'Project Title', 'Supervisor Name', 'Marker Name', 'Feedback',
		));

		foreach ($results as $result)
		{
			fputcsv($file, $result);
		}

		fclose($file);

		header('Content-Description: File Transfer');
		header('Content-Type: text/csv');
		header('Content-Disposition: attachment; filename=ProjectEvaluationStudentFeedbackData.csv');
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($filepath));

		ob_clean();
		flush();
		readfile($filepath);
		unlink($filepath);

		return;
	}

	/**
	 * 
	 * A helper method to log project evaluation changes to the transaction table.
	 * 
	 * @return [type]
	 */
	private function logEvaluationTransaction($action, $studentId, $projectId)
	{
		if (empty($action))
		{
			return parent::logError(__METHOD__, "Required parameter (\$action) is missing");
		}

		if (empty($studentId))
		{
			return parent::logError(__METHOD__, "Required parameter (\$student) is missing");
		}

		$transaction = new Transaction();
		$transaction->fill(array(
			'type'             => 'evaluation',
			'action'           => $action,
			'student'          => $studentId,
			'transaction_date' => new Carbon()
		));

		if (!empty($projectId))
		{
			$transaction->project = $projectId;
		}

		if (Auth::user()->id == $project->supervisor->id)
		{
			$transaction->supervisor = Auth::user()->id;
		}
		else if (Auth::user()->id == $project->getSecondMarker()->id)
		{
			$transaction->admin = Auth::user()->id;
		}
		else
		{
			$transaction->admin = Auth::user()->id;
		}
	}
}
