<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Repositories;

use SussexProjects\Interfaces\ISecondMarkerPivotRepository;
use SussexProjects\SecondMarkerPivot;
use DB;

class SecondMarkerPivotRepository implements ISecondMarkerPivotRepository
{
	/**
	 * 
	 * Gets the Second Marker pivot via Student ID.
	 * Will create one if it does not exist.
	 * 
	 * @param GUID $studentId
	 * 
	 * @return SecondMarkerPivot
	 */
	public function getOrCreate($studentId)
	{
		$secondMarkerPivot = SecondMarkerPivot::firstOrCreate(['student_id' => $studentId]);

		if (empty($secondMarkerPivot))
		{
			DB::transaction(function () use ($secondMarkerPivot, $studentId)
			{
				$secondMarkerPivot->student_id = $studentId;
				$secondMarkerPivot->save();

				SecondMarkerPivot::where('id', $id)->update($request->except(['_method', '_token']));
			});
		}

		return $secondMarkerPivot;
	}

	/**
	 * 
	 * Used to update the Marker or Project of a pivot
	 * 
	 * @param mixed $studentId A student ID
	 * @param mixed $markerId A Marker ID
	 * @param mixed $projectId A Project ID
	 * 
	 * @return SecondMarkerPivot
	 */
	public function update($studentId, $markerId = null, $projectId = null)
	{
		$secondMarkerPivot = $this->getOrCreate($studentId);

		DB::transaction(function () use ($secondMarkerPivot, $markerId, $projectId)
		{
			if (!empty($markerId))
			{
				$secondMarkerPivot->marker_id = $markerId;
			}

			if (!empty($projectId))
			{
				$secondMarkerPivot->project_id = $projectId;
			}

			$secondMarkerPivot->save();
		});

		return $secondMarkerPivot;
	}

	/**
	 * 
	 * Clears a Project for a pivot
	 * 
	 * @param mixed $studentId A student ID
	 * 
	 * @return SecondMarkerPivot
	 */
	public function clearProject($studentId)
	{
		$secondMarkerPivot = $this->getOrCreate($studentId);

		DB::transaction(function () use ($secondMarkerPivot)
		{
			$secondMarkerPivot->project_id = NULL;
			$secondMarkerPivot->save();
		});

		return $secondMarkerPivot;
	}

	/**
	 * 
	 * Clears a Second Marker for a pivot
	 * 
	 * @param mixed $studentId A student ID
	 * 
	 * @return SecondMarkerPivot
	 */
	public function clearSecondMarker($studentId)
	{
		$secondMarkerPivot = $this->getOrCreate($studentId);

		DB::transaction(function () use ($secondMarkerPivot)
		{
			$secondMarkerPivot->marker_id = NULL;
			$secondMarkerPivot->save();
		});

		return $secondMarkerPivot;
	}
}
