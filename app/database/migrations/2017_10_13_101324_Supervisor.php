<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Supervisor extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (departments() as $key => $department) {
			Schema::create($department.'_supervisors', function (Blueprint $table) {
				$table->uuid('id')->unique();
				$table->string('title', 6);
				foreach (department_sections() as $key => $section) {
					$table->unsignedTinyInteger('project_load_'.$section);
					$table->boolean('take_students_'.$section);
					$table->boolean('accept_email_'.$section);
				}
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
		foreach (departments() as $key => $department) {
			Schema::dropIfExists($department.'_supervisors');
		}
	}
}
