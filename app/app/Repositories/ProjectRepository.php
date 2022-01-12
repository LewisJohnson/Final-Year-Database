<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Repositories;

use SussexProjects\Interfaces\IProjectRepository;
use SussexProjects\Project;
use SussexProjects\Student;
use SussexProjects\User;
use SussexProjects\Mode;

class ProjectRepository implements IProjectRepository
{
	/**
	 * Returns a list of accepted projects without a second marker.
	 *
	 * @return array(Project) The next accepted project without a second marker.
	*/
	public function getAcceptedProjectsWithoutSecondMarker()
	{
		$projectTable = (new Project())->getTable();
		$studentTable = (new Student())->getTable();
		$userTable = (new User())->getTable();
		$projectYear = Mode::getProjectYear();

		$projects = Project::join($studentTable.' as student', $projectTable.'.id', '=', 'student.project_id')
			->join($userTable.' as user', 'user.id', '=', 'student.id')
			->where('user.active_year', $projectYear)
			->where('student.project_status', 'accepted')
			->whereNull($projectTable.'.marker_id')
			->select($projectTable.'.*')
			->get();

		return $projects;
	}
}