<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Mode extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create('mode_ug', function (Blueprint $table) {
			$table->string('department_name')->unique();
		});
		Schema::create('mode_ug', function (Blueprint $table) {
			$table->smallInteger('project_year')->unique();
			$table->dateTime('start_date');
			$table->string('mode');
		});

		Schema::create('mode_masters', function (Blueprint $table) {
			$table->smallInteger('project_year')->unique();
			$table->dateTime('start_date');
			$table->string('mode');
		});
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
