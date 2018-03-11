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
				foreach (education_levels() as $key => $level) {
					$table->unsignedTinyInteger('project_load_'.$level['shortName']);
					$table->boolean('take_students_'.$level['shortName']);
					$table->boolean('accept_email_'.$level['shortName']);
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
