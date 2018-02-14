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
		Schema::create('topics_ug', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name')->unique();
		});

		Schema::create('topics_masters', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name')->unique();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		Schema::dropIfExists('topics');
	}
}
