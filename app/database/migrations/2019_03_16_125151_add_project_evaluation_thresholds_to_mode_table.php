<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProjectEvaluationThresholdsToModeTable extends Migration
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
				Schema::table($department . '_mode_' . $level['shortName'], function (Blueprint $table)
				{
					$table->text('thresholds')->nullable();
					$table->mediumText('evaluation_questions')->nullable();
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
				Schema::table($department . '_mode_' . $level['shortName'], function (Blueprint $table)
				{
					$table->dropColumn('thresholds');
					$table->dropColumn('evaluation_questions');
				});
			}
		}
	}
}
