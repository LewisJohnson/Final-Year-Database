<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Repositories;

use SussexProjects\Interfaces\IFactoryRepository;


class FactoryRepository implements IFactoryRepository
{

	// pivots
	public function getProjectEvaluationPivotRepository()
	{
		return new ProjectEvaluationPivotRepository();
	}

	public function getSecondMarkerPivotRepository()
	{
		return new SecondMarkerPivotRepository($this);
	}

	// models
	public function getProjectRepository()
	{
		return new ProjectRepository();
	}

	public function getStudentRepository()
	{
		return new StudentRepository();
	}

	public function getSupervisorRepository()
	{
		return new SupervisorRepository($this);
	}
}
