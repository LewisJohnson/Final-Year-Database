<?php

use Illuminate\Database\Migrations\Migration;

class MoveMarkerIdFromStudentTableToProjectTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		foreach (get_departments() as $key => $department)
		{
			foreach (get_education_levels() as $key => $level)
			{
				$studentTableName = $department . '_students_' . $level['shortName'];
				$projectTableName = $department . '_projects_' . $level['shortName'];

				// Select the project and marker from the student table
				$sql =
					<<<EOT
SELECT project_id, marker_id FROM $studentTableName
WHERE project_status = 'accepted'
AND project_id IS NOT NULL
EOT;
				// Store the values
				$markerIds = DB::select($sql);

				// Bind the marker ID to the project
				foreach ($markerIds as $marker)
				{
					$sql =
						<<<EOT
UPDATE $projectTableName
SET marker_id = '$marker->marker_id'
WHERE id = '$marker->project_id'
EOT;
					DB::statement($sql);
				}
			}
		}
	}
}
