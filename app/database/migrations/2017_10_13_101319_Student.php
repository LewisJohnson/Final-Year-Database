<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Student extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (departments() as $key => $department) {
			foreach (education_levels() as $key => $level) {
				Schema::create($department.'_students_'.$level['shortName'], function (Blueprint $table) {
					$table->uuid('id')->unique();
					$table->string('registration_number');
					$table->enum('project_status', ['none', 'selected', 'proposed', 'accepted'])->default('none');
					$table->uuid('project_id')->nullable(true);
					$table->boolean('share_name')->default(1);
					$table->uuid('marker_id')->nullable(true);
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
				Schema::dropIfExists($department.'_students_'.$level['shortName']);
			}
		}
	}
}