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
		// 'guest', 'student', 'staff', 'supervisor', 'admin_ug', 'admin_pg', 'admin_system'
		// Admin: 1 [id 1 & 2]
		// Supervisors: 40 [id 3 - 43]
		// Students: 300 [id 44 - 344] (150 UG, 150 MSc)
		// Projects: 600 (300 UG, 300 MSc)

		// First 100 students select projects 1 - 100
		// factory(SussexProjects\User::class, 344)->create();
		// factory(SussexProjects\Supervisor::class, 40)->create();

		// factory(SussexProjects\StudentUg::class, 150)->create();
		// factory(SussexProjects\StudentMasters::class, 150)->create();

		// factory(SussexProjects\ProjectUg::class, 300)->create();
		// factory(SussexProjects\ProjectMasters::class, 300)->create();

		// factory(SussexProjects\TopicUg::class, 53)->create();
		// factory(SussexProjects\TopicMasters::class, 53)->create();


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