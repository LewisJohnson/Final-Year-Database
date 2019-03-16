<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectEvaluationThresholdsToModeTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		foreach(get_departments() as $key => $department) {
			foreach(get_education_levels() as $key => $level) {
				Schema::table($department.'_mode_'.$level['shortName'], function (Blueprint $table) {
					$table->text('thresholds')->nullable();
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
		foreach(get_departments() as $key => $department) {
			foreach(get_education_levels() as $key => $level) {
				Schema::table($department.'_mode_'.$level['shortName'], function (Blueprint $table){
					$table->dropColumn('thresholds');
				});
			}
		}
	}
}