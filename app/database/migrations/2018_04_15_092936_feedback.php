<?php
/**
 * Copyright (C) University of Sussex 2018.
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
			$table->text('comment')->nullable(false);
			$table->string('email', 128)->nullable(true);
			$table->string('page', 256)->nullable(true);
			$table->string('department', 256)->nullable(true);
			$table->string('education_level', 256)->nullable(true);
			$table->primary('id');
		});

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		//
	}
}
