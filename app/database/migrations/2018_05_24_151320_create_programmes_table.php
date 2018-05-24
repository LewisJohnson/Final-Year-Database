<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProgrammesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (get_departments() as $key => $department) {
			Schema::create($department.'_programme', function (Blueprint $table) {
				$table->uuid('id')->unique();
				$table->string('name')->unique();
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
		foreach (get_departments() as $key => $department) {
			foreach (get_education_levels() as $key => $level) {
				Schema::dropIfExists($department.'_programme');
			}
		}
	}
}
