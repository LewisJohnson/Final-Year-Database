<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserAgentString extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (get_departments() as $key => $department) {
			Schema::create($department.'_user_agent_strings', function (Blueprint $table) {
				$table->uuid('id');
				$table->text('user_agent');
				$table->text('referrer')->nullable(true);
				$table->boolean('first_visit');
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
			Schema::dropIfExists($department.'_user_agent_strings');
		}
	}
}
