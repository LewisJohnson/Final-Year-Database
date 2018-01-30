<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserAgentString extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		Schema::create('user_agent_strings', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->text('user_agent');
			$table->text('referrer')->nullable(true);
			$table->boolean('first_visit');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		Schema::dropIfExists('user_agent_strings');
	}
}
