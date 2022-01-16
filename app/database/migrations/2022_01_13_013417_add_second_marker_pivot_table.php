<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

 /**
	 * Adds a pivot table for second marker to Student / Project
	 * so we can assign a second marker to student before the student has a project
	 */
class AddSecondMarkerPivotTable extends Migration
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
				Schema::create($department . '_second_marker_pivot_' . $level['shortName'], function (Blueprint $table) use ($department, $level)
				{
					$table->uuid('student_id')->unique();
					$table->uuid('marker_id')->unique()->nullable(true);
					$table->uuid('project_id')->unique()->nullable(true);

					$table->foreign('student_id')->references('id')->on($department . '_students_' . $level['shortName'])->onDelete('cascade');
					$table->foreign('marker_id')->references('id')->on($department . '_users')->onDelete('cascade');
					$table->foreign('project_id')->references('id')->on($department . '_projects_' . $level['shortName'])->onDelete('set null');
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
		//
	}
}
