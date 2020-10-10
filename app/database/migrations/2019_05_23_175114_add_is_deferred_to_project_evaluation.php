<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsDeferredToProjectEvaluation extends Migration
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
					$table->boolean('is_deferred')->default(0);
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
					$table->dropColumn('is_deferred');
				});
			}
		}
	}
}
