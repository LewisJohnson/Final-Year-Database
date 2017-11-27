<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Student extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('students_ug', function (Blueprint $table) {
			$table->unsignedBigInteger('id')->unique();
			$table->unsignedInteger('registration_number');
			$table->string('programme');
			$table->enum('project_status', ['none', 'selected', 'proposed', 'accepted'])->default('none');
			$table->unsignedBigInteger('project_id')->nullable(true);
			$table->boolean('share_project')->default(0);
		});
		
		Schema::create('students_masters', function (Blueprint $table) {
			$table->unsignedBigInteger('id')->unique();
			$table->unsignedInteger('registration_number');
			$table->string('programme');
			$table->enum('project_status', ['none', 'selected', 'proposed', 'accepted'])->default('none');
			$table->unsignedBigInteger('project_id')->nullable(true);
			$table->boolean('share_project')->default(0);
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('students_ug');
		Schema::dropIfExists('students_masters');
	}
}
