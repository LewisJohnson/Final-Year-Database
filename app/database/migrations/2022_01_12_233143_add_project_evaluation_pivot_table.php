<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

 /**
	 * Adds a pivot table from PE to Student / Project
	 * so we can create a project evaluations before student's have a project
	 */
class AddProjectEvaluationPivotTable extends Migration
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
				// Can't use _project_evaluation_pivot_ as the name is too long for unique constraint
				Schema::create($department . '_proj_eval_pivot_' . $level['shortName'], function (Blueprint $table) use ($department, $level)
				{
					$table->uuid('proj_eval_id')->unique();
					$table->uuid('student_id')->unique();
					$table->uuid('project_id')->unique()->nullable(true);

					$table->foreign('student_id')->references('id')->on($department . '_students_' . $level['shortName'])->onDelete('set null');
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
