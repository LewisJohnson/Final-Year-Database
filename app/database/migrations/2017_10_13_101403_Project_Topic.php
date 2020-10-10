<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProjectTopic extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach(get_departments() as $key => $department) {
			foreach(get_education_levels() as $key => $level) {
				Schema::create($department.'_project_topics_'.$level['shortName'], function (Blueprint $table) use ($department, $level){
					$table->uuid('project_id');
					$table->uuid('topic_id');
					$table->boolean('primary')->default(0);
					$table->primary(['project_id', 'topic_id']);

					$table->foreign('project_id')->references('id')->on($department.'_projects_'.$level['shortName'])->onDelete('cascade');
					$table->foreign('topic_id')->references('id')->on($department.'_topics_'.$level['shortName'])->onDelete('cascade');
				});
			}
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		foreach(get_departments() as $key => $department) {
			foreach(get_education_levels() as $key => $level) {
				Schema::dropIfExists($department.'_project_topics_'.$level['shortName']);
			}
		}
	}
}
