<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Mode extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (get_departments() as $key => $department) {
			foreach (get_education_levels() as $key => $level) {
				Schema::create($department.'_mode_'.$level['shortName'], function (Blueprint $table) {
					$table->dateTimeTz('start_date');
				});

				DB::statement("ALTER TABLE `."department.'_mode_'.$level['shortName']".` ADD `project_year` YEAR NOT NULL");
			}
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		foreach (get_departments() as $key => $department) {
			foreach (get_education_levels() as $key => $level) {
				Schema::dropIfExists($department.'_mode_'.$level['shortName']);
			}
		}
	}
}
