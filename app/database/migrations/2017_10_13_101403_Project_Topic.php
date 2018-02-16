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
		foreach (department_sections() as $key => $value) {
			Schema::create('project_topics_'.$value, function (Blueprint $table) {
				$table->unsignedBigInteger('project_id');
				$table->unsignedBigInteger('topic_id');
				$table->boolean('primary')->default(0);
				$table->primary(['project_id', 'topic_id']);
			});
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		foreach (department_sections() as $key => $value) {
			Schema::dropIfExists('project_topics_'.$value);
		}
	}
}
