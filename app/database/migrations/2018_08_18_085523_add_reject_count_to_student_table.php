<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRejectCountToStudentTable extends Migration
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
				Schema::table($department . '_students_' . $level['shortName'], function (Blueprint $table)
				{
					$table->unsignedSmallInteger('reject_count')->default(0);
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
				Schema::table($department . '_students_' . $level['shortName'], function (Blueprint $table)
				{
					$table->dropColumn('reject_count');
				});
			}
		}
	}
}
