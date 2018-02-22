<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Project extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (department_sections() as $key => $value) {
			Schema::create('projects_'.$value, function (Blueprint $table) {
				// $table->increments('id');
				$table->uuid('id');
				$table->string('title', 255);
				$table->mediumText('description');
				$table->string('skills', 255);
				$table->enum('status', ['on-offer', 'withdrawn', 'student-proposed', 'archived']);
				$table->unsignedBigInteger('supervisor_id')->nullable(true);
				$table->unsignedBigInteger('student_id')->nullable(true);
				$table->timestampsTz();
				$table->softDeletesTz();
				$table->timestampTz('destroy_at')->nullable(true);
				$table->primary('id');
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
			Schema::dropIfExists('projects_'.$value);
		}
	}
}
