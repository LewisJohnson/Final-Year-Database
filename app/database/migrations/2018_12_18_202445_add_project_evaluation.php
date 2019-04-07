<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectEvaluation extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		foreach(get_departments() as $key => $department) {
			foreach(get_education_levels() as $key => $level) {
				Schema::create($department.'_project_evaluation_'.$level['shortName'], function (Blueprint $table) use ($department, $level){
					$table->uuid('id')->unqiue();
					$table->uuid('project_id');
					$table->boolean('supervisor_submitted')->default(0);
					$table->boolean('marker_submitted')->default(0);
					$table->boolean('is_finalised')->default(0);
					$table->mediumText('questions');

					$table->primary('id');
					$table->foreign('project_id')->references('id')->on($department.'_projects_'.$level['shortName'])->onDelete('CASCADE');
				});

				DB::statement("ALTER TABLE `".$department.'_project_evaluation_'.$level['shortName']."` ADD `project_year` YEAR NOT NULL;");
			}
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		foreach(get_departments() as $key => $department) {
			foreach(get_education_levels() as $key => $level) {
				Schema::table($department.'_project_evaluation_'.$level['shortName'], function (Blueprint $table) use ($department, $level){
					$table->dropForeign($department.'_project_evaluation_'.$level['shortName'].'_project_id_foreign');
				});

				Schema::drop($department.'_project_evaluation_'.$level['shortName']);
			}
		}
	}
}
