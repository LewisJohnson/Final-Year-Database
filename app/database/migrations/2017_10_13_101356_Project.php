<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Project extends Migration
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
				Schema::create($department . '_projects_' . $level['shortName'], function (Blueprint $table) use ($department, $level)
				{
					$table->uuid('id')->unique();
					$table->string('title', 255);
					$table->mediumText('description');
					$table->string('skills', 255);
					$table->enum('status', ['on-offer', 'withdrawn', 'student-proposed', 'archived']);
					$table->uuid('supervisor_id')->nullable(true);
					$table->uuid('student_id')->nullable(true);
					$table->timestampsTz();
					$table->primary('id');

					$table->foreign('supervisor_id')->references('id')->on($department . '_supervisors')->onDelete('cascade');
					$table->foreign('student_id')->references('id')->on($department . '_students_' . $level['shortName'])->onDelete('cascade');
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
				Schema::dropIfExists($department . '_projects_' . $level['shortName']);
			}
		}
	}
}
