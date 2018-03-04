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
			foreach (department_sections() as $key => $section) {
				Schema::create($department.'_students_'.$section, function (Blueprint $table) {
					$table->unsignedBigInteger('id')->unique();
					$table->string('registration_number');
					$table->enum('project_status', ['none', 'selected', 'proposed', 'accepted'])->default('none');
					$table->unsignedBigInteger('project_id')->nullable(true);
					$table->boolean('share_name')->default(1);
					$table->unsignedBigInteger('marker_id')->nullable(true);
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
				Schema::dropIfExists($department.'_students_'.$section);
			}
		}
	}
}