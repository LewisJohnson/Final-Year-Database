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
		foreach (departments() as $key => $department) {
			foreach (education_levels() as $key => $level) {
				Schema::create($department.'_projects_'.$level['shortName'], function (Blueprint $table) {
					$table->uuid('id');
					$table->string('title', 255);
					$table->mediumText('description');
					$table->string('skills', 255);
					$table->enum('status', ['on-offer', 'withdrawn', 'student-proposed', 'archived']);
					$table->unsignedBigInteger('supervisor_id')->nullable(true);
					$table->unsignedBigInteger('student_id')->nullable(true);
					$table->timestampsTz();
					$table->primary('id');
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
			foreach (education_levels() as $key => $level) {
				Schema::dropIfExists($department.'_projects_'.$level['shortName']);
			}
		}
	}
}
