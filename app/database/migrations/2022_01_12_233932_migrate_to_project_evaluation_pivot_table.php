<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigrateToProjectEvaluationPivotTable extends Migration
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
				$projectEvaluationTableName = $department . '_project_evaluation_' . $level['shortName'];
				$pivotTable = $department . '_proj_eval_pivot_' . $level['shortName'];
				$studentTableName = $department . '_students_' . $level['shortName'];

				// Select the project IDs
				$sql =
<<<EOT
	SELECT 
		pe.id as pe_id, 
		student.id as student_id, 
		pe.project_id as project_id
	FROM $projectEvaluationTableName pe
		LEFT JOIN $studentTableName student ON pe.project_id = student.project_id
EOT;
				// Store the values
				$data = DB::select($sql);

				// Insert data into new pivot table
				foreach ($data as $d)
				{
					$sql =
<<<EOT
	INSERT INTO $pivotTable VALUES ('$d->pe_id', '$d->student_id', '$d->project_id')
EOT;
					DB::statement($sql);
				}
			}
		}
	}
}
