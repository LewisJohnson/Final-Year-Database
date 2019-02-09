<?php
/**
 * Copyright (C) University of Sussex 2019.
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

		foreach(get_education_levels(true) as $key => $level) {
			$projectAdminLevels.="'admin_".$level."',";
		}

		foreach(get_departments() as $key => $department) {
			$tableName = $department.'_users';
			Schema::create($tableName, function (Blueprint $table) use ($department) {
				$table->uuid('id')->unique();
				$table->string('first_name');
				$table->string('last_name');
				$table->string('username')->unique();
				$table->string('email')->unique();
				$table->string('programme')->nullable();
				$table->dateTimeTz('last_login')->nullable();
				$table->rememberToken();

				$table->primary('id');
				$table->foreign('programme')->references('id')->on($department.'_programmes');
			});

			$privilegesSql = "ALTER TABLE `".$tableName."` ADD COLUMN `privileges` SET('student', 'staff', 'supervisor', ".$projectAdminLevels." 'admin_system') AFTER `id`;";
			DB::statement($privilegesSql);
		}

		// Create test table
		Schema::create("test_users", function (Blueprint $table) {
			$table->uuid('id')->unique()->nullable(false);
			$table->string('first_name', 128)->nullable(false);
			$table->string('last_name', 128)->nullable(false);
			$table->string('username', 32)->unique()->nullable(false);
			$table->string('programme');
			$table->string('email', 128)->unique()->nullable(false);
			$table->dateTimeTz('last_login')->nullable(true);
			$table->rememberToken();
			$table->primary('id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		foreach(get_departments() as $key => $department) {
			Schema::dropIfExists($department.'_users');
		}
		Schema::dropIfExists('test_users');
	}
}
