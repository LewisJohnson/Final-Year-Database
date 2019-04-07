<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddViewCountToProjectTable extends Migration
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
				Schema::table($department.'_projects_'.$level['shortName'], function (Blueprint $table){
					$table->unsignedInteger('view_count')->default(0);
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
				Schema::table($department.'_projects_'.$level['shortName'], function (Blueprint $table){
					$table->dropColumn('view_count');
				});
			}
		}
	}
}
