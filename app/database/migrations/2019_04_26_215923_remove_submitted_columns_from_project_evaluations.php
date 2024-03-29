<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveSubmittedColumnsFromProjectEvaluations extends Migration
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
				Schema::table($department . '_project_evaluation_' . $level['shortName'], function (Blueprint $table) use ($department, $level)
				{
					$table->dropColumn('supervisor_submitted')->default(0);
					$table->dropColumn('marker_submitted')->default(0);
				});
			}
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		foreach (get_departments() as $key => $department)
		{
			foreach (get_education_levels() as $key => $level)
			{
				Schema::table($department . '_project_evaluation_' . $level['shortName'], function (Blueprint $table) use ($department, $level)
				{
					$table->boolean('supervisor_submitted')->default(0);
					$table->boolean('marker_submitted')->default(0);
				});
			}
		}
	}
}