<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class User extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		Schema::create('users', function (Blueprint $table) {
			$table->increments('id');
			$table->string('first_name', 128);
			$table->string('last_name', 128);
			$table->string('username', 32)->unique();
			$table->string('password', 128);
			$table->enum('access_type', ['student', 'staff', 'supervisor', 'admin_ug', 'admin_masters', 'admin_system']);
			$table->string('email', 128)->unique();
			$table->dateTimeTz('last_login')->nullable(true);
			$table->rememberToken();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		Schema::dropIfExists('users');
	}
}
