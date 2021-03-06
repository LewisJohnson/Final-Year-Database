<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Supervisor extends Migration
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
			Schema::create($department . '_supervisors', function (Blueprint $table) use ($department)
			{
				$table->uuid('id')->unique();
				$table->string('title', 6);

				foreach (get_education_levels() as $key => $level)
				{
					$table->unsignedTinyInteger('project_load_' . $level['shortName'])->default(0);
					$table->boolean('take_students_' . $level['shortName'])->default(0);
					$table->boolean('accept_email_' . $level['shortName'])->default(0);
				}

				$table->primary('id');
				$table->foreign('id')->references('id')->on($department . '_users')->onDelete('cascade');
			});
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
			Schema::dropIfExists($department . '_supervisors');
		}
	}
}
