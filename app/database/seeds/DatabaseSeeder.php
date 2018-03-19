<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class DatabaseSeeder extends Seeder{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run(){

		$adminId = (string) Str::orderedUuid();

		DB::statement("INSERT INTO `informatics_users` (`id`, `privileges`, `first_name`, `last_name`, `username`, `password`, `programme`, `email`) VALUES ('".$adminId."', 'supervisor,admin_ug,admin_pg', 'Lewis', 'Johnson', 'lj234', '".bcrypt('password')."', 'none', 'lj234@susx.com');");

		DB::table('informatics_supervisors')->insert([
			 'id' => $adminId,
			 'title' => 'Prof.',
			 'project_load_pg' => 8,
			 'project_load_ug' => 6,
			 'take_students_pg' => true,
			 'accept_email_pg' => true,
			 'take_students_ug' => true,
			 'accept_email_ug' => true,
		]);
	}
}