<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use SussexProjects\Mail\StudentAccepted;
use SussexProjects\Mail\StudentRejected;
use SussexProjects\Mode;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\Transaction;
use SussexProjects\User;
use SussexProjects\Interfaces\IFactoryRepository;

/**
 * The supervisor controller.
 * Handles all functions related to supervisors.
 */
class SupervisorController extends Controller
{

	private $supervisorRepository;
	private $secondMarkerPivotRepository;

	public function __construct(IFactoryRepository $factoryRepository)
	{
		parent::__construct();
		$this->middleware('auth');

		$this->supervisorRepository = $factoryRepository->getSupervisorRepository();
		$this->secondMarkerPivotRepository = $factoryRepository->getSecondMarkerPivotRepository();
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function projectReport()
	{
		return view('supervisors.project-report');
	}

	/**
	 * Display the most popular projects.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function projectPopularity()
	{
		return view('supervisors.project-popularity')
			->with("projects", Auth::user()->supervisor->getPopularProjects());
	}

	/**
	 * The supervisor report.
	 *
	 *
	 * @param  \Illuminate\Http\Request                                   $request
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function report(Request $request)
	{

		if (isset($request->sr_hide_closed))
		{
			Cookie::queue('sr_hide_closed', $request->sr_hide_closed, 525600);
		}
		else
		{
			$request->sr_hide_closed = Cookie::get('sr_hide_closed');
		}

		if ($request->sr_hide_closed)
		{
			$supervisors = Supervisor::getAllSupervisorsQuery()
				->where('take_students_' . get_el_short_name(), true)
				->get();
		}
		else
		{
			$supervisors = Supervisor::getAllSupervisorsQuery()->get();
		}

		return view('supervisors.report')
			->with('supervisors', $supervisors)
			->with('sr_hide_closed', $request->sr_hide_closed);
	}

	/**
	 * A table of all accepted students.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function acceptedStudentsTable(Request $request)
	{

		// We don't need to specify a student year because you can't accept students from any year but active
		$acceptedStudents = Auth::user()->supervisor->getAcceptedStudents();
		$showEvaluationButton = Mode::getProjectEvaluationDate()->lte(\Carbon\Carbon::now());

		return view('supervisors.partials.accepted-students-table')
			->with('acceptedStudents', $acceptedStudents)
			->with('showEvaluationButton', $showEvaluationButton);
	}

	/**
	 * Accepts a student for their selected project.
	 *
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response JSON
	 */
	public function acceptStudent(Request $request)
	{
		if (Mode::getSupervisorAcceptDate()->gt(Carbon::now()))
		{
			return response()->json(array(
				'successful' => false,
				'message'    => 'You are not allowed to accept students until ' . Mode::getSupervisorAcceptDate(true) . '.',
			));
		}

		$this->validate(request(), [
			'student_id' => 'required',
			'project_id' => 'required',
		]);

		$student = Student::findOrFail($request->student_id);
		$project = Project::findOrFail($request->project_id);

		if ($project->id != $student->project_id)
		{
			return parent::logError(__METHOD__, 'Project ID and student project ID do not match up.');
		}

		if ($project->getAcceptedStudent() != null)
		{
			return parent::logError(__METHOD__, 'This project has already been allocated to another student.');
		}

		if (count($project->getStudentsWithProjectSelected()) > 1)
		{
			return response()->json(array(
				'successful' => false,
				'message'    => 'You must reject all other students for "' . $project->title . '" before accepting ' . $student->user->getFullName(),
			));
		}

		$secondMarkerPivotRepository = $this->secondMarkerPivotRepository;

		DB::transaction(function () use ($request, $student, $project, $secondMarkerPivotRepository)
		{
			$transaction = new Transaction();

			if ($project->status != "student-proposed")
			{
				$project->status = 'withdrawn';
			}

			$student->project_status = 'accepted';
			$project->save();
			$student->save();

			// Save a transaction
			$transaction->fill(array(
				'type'             => 'student',
				'action'           => 'accepted',
				'project'          => $student->project_id,
				'student'          => $student->id,
				'supervisor'       => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();

			// Update second marker pivot table
			$secondMarkerPivotRepository->update($student->id, null, $project->id);

			return null;
		});

		$emailSuccess = true;

		parent::logInfo(__METHOD__, "Accepted student", [
			"student_id" => $student->id,
			"student_name" => $student->user->getFullName(),
			"project_id" => $project->id,
			"project_title" => $project->title,
		]);

		try
		{
			// Send accepted email
			Mail::to($student->user->email)
				->send(new StudentAccepted(Auth::user()->supervisor, $student));
		}
		catch (\Exception $e)
		{
			$emailSuccess = false;
		}

		return response()->json(array(
			'successful' => true,
			'email_successful' => $emailSuccess,
			'message'    => $student->user->first_name . ' has been accepted.',
		));
	}

	/**
	 * Rejects a student for their selected project.
	 *
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response JSON
	 */
	public function rejectStudent(Request $request)
	{
		$student = Student::findOrFail(request('student_id'));
		$projectId = $student->project->id;

		DB::transaction(function () use ($request, $student, $projectId)
		{
			$transaction = new Transaction();
			$transaction->fill(array(
				'type'             => 'student',
				'action'           => 'rejected',
				'project'          => $student->project_id,
				'student'          => $student->id,
				'supervisor'       => Auth::user()->supervisor->id,
				'transaction_date' => new Carbon(),
			));
			$transaction->save();

			if ($student->project->status == "student-proposed")
			{
				$student->project->supervisor_id = null;
				$student->project->save();
			}

			$student->reject_count = ++$student->reject_count;
			$student->project_id = null;
			$student->project_status = 'none';
			$student->save();

			//todo: update second marker pivot
			//todo: delete evaluation
		});

		$emailSuccess = true;

		try
		{
			// Send declined email
			Mail::to($student->user->email)
				->send(new StudentRejected(Auth::user()->supervisor, $student, $projectId));
		}
		catch (\Exception $e)
		{
			$emailSuccess = false;
		}

		return response()->json(array(
			'successful'       => true,
			'email_successful' => $emailSuccess,
			'message'          => $student->user->first_name . ' has been rejected.',
		));
	}

	/**
	 * Updates the students share name to other students preference.
	 *
	 *
	 * @param  \Illuminate\Http\Request
	 * @return \Illuminate\Http\Response
	 */
	public function receiveEmails(Request $request)
	{
		$educationLevels = get_education_levels(true);

		if (in_array($request->education_level, $educationLevels))
		{
			Auth::user()->supervisor->setAcceptingEmails(isset($request["accept_emails_" . $request->education_level]) ? 1 : 0, $request->education_level);
		}
		else
		{
			return response()->json(array(
				'successful' => false,
				'message'    => 'Incorrect parameters.',
			));
		}

		if (isset($request["accept_emails_" . $request->education_level]))
		{
			$message = "You have opted in to " . $request->education_level . " emails.";
		}
		else
		{
			$message = "You have opted out of " . $request->education_level . " emails.";
		}

		return response()->json(array(
			'successful' => true,
			'message'    => $message,
		));
	}

	public static function sumOfProjectLoads()
	{
		return Supervisor::getAllSupervisorsQuery()->sum('project_load_' . get_el_short_name());
	}
}
