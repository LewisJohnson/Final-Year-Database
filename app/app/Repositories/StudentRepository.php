<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Repositories;

use SussexProjects\Interfaces\IStudentRepository;
use SussexProjects\SecondMarkerPivot;
use SussexProjects\Student;
use SussexProjects\User;
use SussexProjects\Mode;
use DB;

class StudentRepository implements IStudentRepository
{
	/**
	 * Returns a list of accepted projects without a second marker.
	 *
	 * @return array(Student) The next accepted project without a second marker.
	 */
	public function getStudentsWithoutSecondMarker($onlyAccepted)
	{
		$studentTable = (new Student())->getTable();
		$userTable = (new User())->getTable();
		$projectYear = Mode::getProjectYear();

		$students = Student::whereNotExists(
			function ($query) use ($studentTable)
			{
				$pivotTable = (new SecondMarkerPivot())->getTable();

				$query->select($studentTable . '.id')
					->from($pivotTable)
					->whereRaw('student_id = ' . $studentTable . '.id');
			}
		)
			->join($userTable . ' as user', 'user.id', '=', $studentTable . '.id')
			->where('user.active_year', $projectYear);

		if ($onlyAccepted)
		{
			$students->where('student.project_status', 'accepted');
		}

		return $students->get();
	}
}
