<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Interfaces;

interface ISupervisorRepository
{
	public function rejectStudent($studentId);
	public function acceptStudent($studentId, $projectId);
	public function getSupervisorsWithLazyScore($isSetupView, $maxStudentsPerSupervisor, $supervisorToIgnoreId);
}
