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
				$table->unsignedTinyInteger('project_load_masters');
				$table->unsignedTinyInteger('project_load_ug');
				$table->boolean('take_students_masters');
				$table->boolean('take_students_ug');
				$table->boolean('accept_email_masters');
				$table->boolean('accept_email_ug');
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
