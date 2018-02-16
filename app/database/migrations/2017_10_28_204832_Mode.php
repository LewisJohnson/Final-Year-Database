<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Mode extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (department_sections() as $key => $value) {
			Schema::create('mode_'.$value, function (Blueprint $table) {
				$table->smallInteger('project_year')->unique();
				$table->dateTimeTz('start_date');
				$table->string('mode');
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
			Schema::dropIfExists('mode_'.$value);
		}
	}
}
