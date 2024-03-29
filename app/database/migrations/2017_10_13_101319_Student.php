<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Student extends Migration
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
				Schema::create($department . '_students_' . $level['shortName'], function (Blueprint $table) use ($department, $level)
				{
					$table->uuid('id')->unique();
					$table->string('registration_number')->unique();
					$table->enum('project_status', ['none', 'selected', 'proposed', 'accepted'])->default('none');
					$table->uuid('project_id')->nullable();
					$table->boolean('share_name')->default(1);
					$table->uuid('marker_id')->nullable();
					$table->primary('id');

					$table->foreign('id')->references('id')->on($department . '_users')->onDelete('cascade');
				});
			}
		}

		Schema::create("test_students", function (Blueprint $table)
		{
			$table->uuid('id')->unique();
			$table->string('registration_number');
			$table->enum('project_status', ['none', 'selected', 'proposed', 'accepted'])->default('none');
			$table->uuid('project_id')->nullable();
			$table->boolean('share_name')->default(1);
			$table->uuid('marker_id')->nullable();
			$table->primary('id');
		});
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
				Schema::dropIfExists($department . '_students_' . $level['shortName']);
			}
		}
	}
}
