<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Transaction extends Migration
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
				Schema::create($department . '_transactions_' . $level['shortName'], function (Blueprint $table)
				{
					$table->uuid('id');
					$table->enum('type', ['topic', 'project', 'student', 'marker']);
					$table->enum('action', ['proposed', 'selected', 'accepted', 'rejected', 'deleted', 'updated', 'created', 'undo', 'marker-assigned']);
					$table->string('project')->nullable();
					$table->string('student')->nullable();
					$table->string('supervisor')->nullable();
					$table->string('marker')->nullable();
					$table->string('topic')->nullable();
					$table->string('admin')->nullable();
					$table->dateTimeTz('transaction_date');
					$table->primary('id');
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
				Schema::dropIfExists($department . '_transactions_' . $level['shortName']);
			}
		}
	}
}
