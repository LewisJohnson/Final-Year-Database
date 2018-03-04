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
			foreach (department_sections() as $key => $section) {
				Schema::create($department.'_topics_'.$section, function (Blueprint $table) {
					$table->increments('id');
					$table->string('name')->unique();
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
				Schema::dropIfExists($department.'_topics_'.$section);
			}
		}
	}
}
