<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Repositories;

use SussexProjects\Interfaces\IProjectEvaluationRepository;
use SussexProjects\ProjectEvaluation;
use SussexProjects\ProjectEvaluationPivot;
use DB;

class ProjectEvaluationRepository implements IProjectEvaluationRepository
{

	/**
	 * @param mixed $studentId
	 * @param mixed $projectId
	 * 
	 * @return [type]
	 */
	public function get($studentId, $projectId)
	{
	}

	/**
	 * Delete's a p
	 * 
	 * @param mixed $studentId
	 * 
	 * @return [type]
	 */
	public function delete($studentId)
	{
		$pivot = ProjectEvaluationPivot::where('student_id', $studentId);


		$student->getEvaluation()->delete();
	}
	// /**
	//  * 
	//  * Gets the Second Marker pivot via Student ID.
	//  * Will create one if it does not exist.
	//  * 
	//  * @param GUID $studentId
	//  * 
	//  * @return ProjectEvaluationPivot
	//  */
	// public function getOrCreate($studentId)
	// {
	// 	$secondMarkerPivot = ProjectEvaluationPivot::firstOrCreate(['student_id' => $studentId]);

	// 	if (empty($secondMarkerPivot))
	// 	{
	// 		DB::transaction(function () use ($secondMarkerPivot, $studentId)
	// 		{
	// 			$secondMarkerPivot->student_id = $studentId;
	// 			$secondMarkerPivot->save();

	// 			ProjectEvaluationPivot::where('id', $id)->update($request->except(['_method', '_token']));
	// 		});
	// 	}

	// 	return $secondMarkerPivot;
	// }

	// /**
	//  * 
	//  * Used to update the Marker or Project of a pivot
	//  * 
	//  * @param mixed $studentId A student ID
	//  * @param mixed $markerId A Marker ID
	//  * @param mixed $projectId A Project ID
	//  * 
	//  * @return ProjectEvaluationPivot
	//  */
	// public function update($studentId, $markerId = null, $projectId = null)
	// {
	// 	$secondMarkerPivot = $this->getOrCreate($studentId);

	// 	DB::transaction(function () use ($secondMarkerPivot, $markerId, $projectId)
	// 	{
	// 		if (!empty($markerId))
	// 		{
	// 			$secondMarkerPivot->marker_id = $markerId;
	// 		}

	// 		if (!empty($projectId))
	// 		{
	// 			$secondMarkerPivot->project_id = $projectId;
	// 		}

	// 		$secondMarkerPivot->save();
	// 	});

	// 	return $secondMarkerPivot;
	// }

	// /**
	//  * 
	//  * Clears a Project for a pivot
	//  * 
	//  * @param mixed $studentId A student ID
	//  * 
	//  * @return SecondMarkerPivot
	//  */
	// public function clearProject($projEvalId)
	// {
	// 	$secondMarkerPivot = $this->getOrCreate($studentId);

	// 	DB::transaction(function () use ($secondMarkerPivot)
	// 	{
	// 		$secondMarkerPivot->project_id = NULL;
	// 		$secondMarkerPivot->save();
	// 	});

	// 	return $secondMarkerPivot;
	// }

	// /**
	//  * 
	//  * Clears a Second Marker for a pivot
	//  * 
	//  * @param mixed $studentId A student ID
	//  * 
	//  * @return SecondMarkerPivot
	//  */
	// public function clearStudent($projEvalId)
	// {
	// 	$secondMarkerPivot = $this->getOrCreate($studentId);

	// 	DB::transaction(function () use ($secondMarkerPivot)
	// 	{
	// 		$secondMarkerPivot->marker_id = NULL;
	// 		$secondMarkerPivot->save();
	// 	});

	// 	return $secondMarkerPivot;
	// }
}
