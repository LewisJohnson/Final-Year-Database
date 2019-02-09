<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Feedback extends Migration{
	
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		Schema::create('feedback', function (Blueprint $table) {
			$table->uuid('id');
			$table->text('comment');
			$table->string('email')->nullable();
			$table->string('page')->nullable();
			$table->string('department')->nullable();
			$table->string('education_level')->nullable();
			$table->dateTimeTz('date');
			$table->primary('id');
		});

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		Schema::dropIfExists('feedback');
	}
}
