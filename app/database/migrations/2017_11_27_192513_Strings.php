<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Strings extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){

		Schema::create('strings', function (Blueprint $table) {
			$table->string('key')->unique();
			$table->string('value');
		});

		Schema::create('strings_ug', function (Blueprint $table) {
			$table->string('key')->unique();;
			$table->string('value');
		});

		Schema::create('strings_masters', function (Blueprint $table) {
			$table->string('key')->unique();;
			$table->string('value');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		Schema::dropIfExists('strings');
		Schema::dropIfExists('strings_ug');
		Schema::dropIfExists('strings_masters');
	}
}
