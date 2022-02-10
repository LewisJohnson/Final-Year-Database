<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Interfaces;

interface IFactoryRepository
{
	// pivots
	public function getProjectEvaluationPivotRepository();
	public function getSecondMarkerPivotRepository();

	// models
	public function getProjectRepository();
	public function getStudentRepository();
	public function getSupervisorRepository();
}