<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveProjectIdFromProjectEvaluationTable extends Migration
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

				if (Schema::hasColumn($projectEvaluationTableName, 'project_id'))
				{
					// Remove the project id from the project evaluation table
					Schema::table($projectEvaluationTableName, function (Blueprint $table) use ($projectEvaluationTableName)
					{
						$table->dropForeign($projectEvaluationTableName . '_project_id_foreign');
						$table->dropColumn('project_id');
					});
				}
			}
		}
	}
}
