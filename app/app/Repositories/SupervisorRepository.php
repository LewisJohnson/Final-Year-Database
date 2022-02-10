<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Repositories;

use Log;
use DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use SussexProjects\User;
use SussexProjects\Mode;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\Supervisor;
use SussexProjects\Transaction;
use SussexProjects\Interfaces\ISupervisorRepository;
use SussexProjects\Interfaces\IFactoryRepository;

class SupervisorRepository extends BaseRepository implements ISupervisorRepository
{
	private $secondMarkerPivotRepository;

	public function __construct(IFactoryRepository $factoryRepository)
	{
		$this->secondMarkerPivotRepository = $factoryRepository->getSecondMarkerPivotRepository();
	}

	/**
	 * Returns a list of supervisors along with their lazy score.
	 * 
	 * @param mixed $isSetupView true if calling from a setup view
	 * @param mixed $maxStudentsPerSupervisor The max amount of students a supervisor can second mark
	 * @param mixed $supervisorToIgnoreId A supervisor ID to ignore (So we don't assign a supervisor to be the second marker of their own project)
	 * 
	 * @return array(Supervisor)
	 */
	public function getSupervisorsWithLazyScore($isSetupView, $maxStudentsPerSupervisor, $supervisorToIgnoreId)
	{
		$supervisors = Supervisor::getAllSupervisorsQuery()
			->where('project_load_' . get_el_short_name(), '>', 0)
			->get();

		// Set up the numbers
		foreach ($supervisors as $key => $supervisor)
		{
			if ($supervisor->id == $supervisorToIgnoreId)
			{
				unset($supervisors[$key]);
			}

			$supervisor->second_supervising_count = count($supervisor->getSecondMarkingStudents());
			$supervisor->accepted_student_count = count($supervisor->getAcceptedStudents());
		}

		if (!$isSetupView)
		{
			if (count($supervisors) > 1)
			{
				$supervisors = $supervisors->filter(function ($supervisor) use ($maxStudentsPerSupervisor)
				{
					return $supervisor->second_supervising_count < $maxStudentsPerSupervisor;
				});
			}
		}

		$studentCount = count(Student::getAllStudentsQuery()->get());
		$supervisorsWithZeroSecondSupervisingCount = $supervisors->where('second_supervising_count', 0)->count();

		foreach ($supervisors as $supervisor)
		{
			$loadMinusStudentCount = $supervisors->sum('project_load_' . get_el_short_name()) - $studentCount;
			$slack = floor($loadMinusStudentCount / max(1, $supervisorsWithZeroSecondSupervisingCount));

			$supervisor->project_load = $supervisor->getProjectLoad();
			$supervisor->target_load = ($supervisor->project_load * 2) - $supervisor->accepted_student_count;

			// Determine lazy score
			$supervisor->lazy_score = $supervisor->target_load - $supervisor->second_supervising_count - $slack;
		}

		return $supervisors;
	}

	/**
	 * @param mixed $supervisorId
	 * @param mixed $studentId
	 * @param mixed $projectId
	 * 
	 * @return [type]
	 */
	public function acceptStudent($studentId, $projectId)
	{
		$student = Student::findOrFail($studentId);
		$project = Project::findOrFail($projectId);

		$secondMarkerPivotRepo = $this->secondMarkerPivotRepository;

		DB::transaction(function () use ($student, $project, $secondMarkerPivotRepo)
		{
			$transaction = new Transaction();

			if ($project->status != "student-proposed")
			{
				$project->status = 'withdrawn';
			}

			$student->project_id = $project->id;
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
			$secondMarkerPivotRepo->update($student->id, null, $project->id);

			// Delete the students' project evaluation
			if (!empty($student->getEvaluation()))
			{
				$student->getEvaluation()->delete();
			}

			return null;
		});
	}

	/**
	 * @param mixed $supervisorId
	 * @param mixed $studentId
	 * 
	 * @return [type]
	 */
	public function rejectStudent($studentId)
	{
		$secondMarkerPivotRepo = $this->secondMarkerPivotRepository;
		$student = Student::findOrFail($studentId);

		DB::transaction(function () use ($student, $secondMarkerPivotRepo)
		{
			if (empty($student->project))
			{
				Log::error('Attempted to reject student without project assigned.');
				return null;
			}

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

			// Clear students second marker pivot project
			$secondMarkerPivotRepo->clearProject($student->id);

			// Delete the students' project evaluation
			if (!empty($student->getEvaluation()))
			{
				$student->getEvaluation()->delete();
			}
		});
	}
}
