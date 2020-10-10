<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProjectEvaluationDateToMode extends Migration
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
					$table->dateTimeTz('project_evaluation_date')->nullable();
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
					$table->dropColumn('project_evaluation_date');
				});
			}
		}
	}
}
