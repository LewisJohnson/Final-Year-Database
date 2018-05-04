<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Supervisor extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (get_departments() as $key => $department) {
			Schema::create($department.'_supervisors', function (Blueprint $table) use ($department){
				$table->uuid('id')->unique();
				$table->string('title', 6);
				foreach (get_education_levels() as $key => $level) {
					$table->unsignedTinyInteger('project_load_'.$level['shortName']);
					$table->boolean('take_students_'.$level['shortName']);
					$table->boolean('accept_email_'.$level['shortName']);
				}
				$table->primary('id');
				$table->foreign('id')->references('id')->on($department.'_users')->onDelete('cascade');
			});
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		foreach (get_departments() as $key => $department) {
			Schema::dropIfExists($department.'_supervisors');
		}
	}
}
