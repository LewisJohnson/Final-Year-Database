<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Student extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		$departments = get_departments();

		foreach (get_departments() as $key => $department) {
			foreach (get_education_levels() as $key => $level) {
				Schema::create($department.'_students_'.$level['shortName'], function (Blueprint $table) use ($department){
					$table->uuid('id')->unique();
					$table->string('registration_number')->unique();
					$table->enum('project_status', ['none', 'selected', 'proposed', 'accepted'])->default('none');
					$table->uuid('project_id')->nullable(true);
					$table->boolean('share_name')->default(1);
					$table->uuid('marker_id')->nullable(true);
					$table->primary('id');

					$table->foreign('id')->references('id')->on($department.'_users');
				});
			}
		}

		Schema::create("test_students", function (Blueprint $table) {
			$table->uuid('id')->unique();
			$table->string('registration_number');
			$table->enum('project_status', ['none', 'selected', 'proposed', 'accepted'])->default('none');
			$table->uuid('project_id')->nullable(true);
			$table->boolean('share_name')->default(1);
			$table->uuid('marker_id')->nullable(true);
			$table->primary('id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		foreach (get_departments() as $key => $department) {
			foreach (get_education_levels() as $key => $level) {
				Schema::dropIfExists($department.'_students_'.$level['shortName']);
			}
		}
	}
}