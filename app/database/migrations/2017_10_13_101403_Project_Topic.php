<?php
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
		foreach (departments() as $key => $department) {
			foreach (department_sections() as $key => $section) {
				Schema::create($department.'_project_topics_'.$section, function (Blueprint $table) {
					$table->uuid('project_id');
					$table->uuid('topic_id');
					$table->boolean('primary')->default(0);
					$table->primary(['project_id', 'topic_id']);
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
		foreach (departments() as $key => $department) {
			foreach (department_sections() as $key => $section) {
				Schema::dropIfExists($department.'_project_topics_'.$section);
			}
		}
	}
}
