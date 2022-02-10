<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrateToSecondMarkerPivotTable extends Migration
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
				$projectTableName = $department . '_projects_' . $level['shortName'];
				$studentTableName = $department . '_students_' . $level['shortName'];
				$pivotTable = $department . '_second_marker_pivot_' . $level['shortName'];

				if (Schema::hasColumn($projectTableName, 'marker_id'))
				{
					// Select the project IDs
					$sql =
						<<<EOT
	SELECT 
		student.id AS student_id,
		proj.marker_id AS marker_id,
		proj.id AS project_id
	FROM $projectTableName proj
		LEFT JOIN $studentTableName student ON proj.id = student.project_id
		WHERE proj.marker_id IS NOT NULL
EOT;
					// Store the values
					$data = DB::select($sql);

					// Insert data into new pivot table
					foreach ($data as $d)
					{
						$sql =
							<<<EOT
	INSERT INTO $pivotTable VALUES ('$d->student_id', '$d->marker_id', '$d->project_id')
EOT;
						DB::statement($sql);
					}
				}
			}
		}
	}
}
