<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Interfaces;

interface ISecondMarkerPivotRepository
{
	public function getOrCreate($studentId);

	public function update($studentId, $markerId, $projectId);

	public function clearProject($studentId);

	public function clearSecondMarker($studentId);
}
