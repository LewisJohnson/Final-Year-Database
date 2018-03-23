<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class User extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		$projectAdminLevels = "";
		$guestLevels = "";

		foreach(get_education_levels(true) as $key => $level) {
			$guestLevels.="'guest_".$level."',";
			$projectAdminLevels.="'admin_".$level."',";
		}

		$departments = get_departments();
		
		foreach(array_push($departments,"test"); as $key => $department) {
			$tableName = $department.'_users';
			// if(!Schema::hasTable($tableName)) {
			Schema::create($tableName, function (Blueprint $table) {
				$table->uuid('id')->unique()->nullable(false);
				$table->string('first_name', 128)->nullable(false);
				$table->string('last_name', 128)->nullable(false);
				$table->string('username', 32)->unique()->nullable(false);
				$table->string('password', 128)->nullable(false);
				$table->string('programme');
				$table->string('email', 128)->unique()->nullable(false);
				$table->dateTimeTz('last_login')->nullable(true);
				$table->rememberToken();
				$table->primary('id');
			});

			$privilegesSql = "ALTER TABLE `".$tableName."` ADD COLUMN `privileges` SET(".$guestLevels." 'student', 'staff', 'supervisor', ".$projectAdminLevels." 'admin_system') NOT NULL AFTER `id`;";
			DB::statement($privilegesSql);
		}
		// }
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
