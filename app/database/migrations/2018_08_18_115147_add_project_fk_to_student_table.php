<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectFkToStudentTable extends Migration
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
				Schema::table($department.'_students_'.$level['shortName'], function (Blueprint $table) use ($department, $level){
					$table->foreign('project_id')->references('id')->on($department.'_projects_'.$level['shortName'])->onDelete('SET NULL');
				});
			}
		}
	}
}
