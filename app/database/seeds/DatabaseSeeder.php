<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
use Webpatser\Uuid\Uuid;

class DatabaseSeeder extends Seeder{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run(){
		DB::statement("INSERT INTO `informatics_users` (`id`, `privileges`, `first_name`, `last_name`, `username`, `password`, `programme`, `email`) VALUES ('1', 'supervisor,admin_ug,admin_pg', 'Lewis', 'Johnson', 'lj234', '$2y$10\$WY/ItPPqFwr8kumHrzImFeAwP1Vvy9uY.4BTP2sNG62hqpsanvO96', 'none', 'lj234@susx.com');");

		DB::table('informatics_supervisors')->insert([
			 'id' => 1,
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