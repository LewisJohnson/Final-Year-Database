<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Topic extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (departments() as $key => $department) {
			foreach (education_levels() as $key => $level) {
				Schema::create($department.'_topics_'.$level['shortName'], function (Blueprint $table) {
					$table->uuid('id');
					$table->string('name')->unique();
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
				Schema::dropIfExists($department.'_topics_'.$level['shortName']);
			}
		}
	}
}
