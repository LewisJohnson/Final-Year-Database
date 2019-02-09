<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

class EngineeringSeeder extends Seeder{

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run(){

		Session::put('education_level', current(get_education_levels()));
		Session::put('department', 'engineering');
		
		// factory(SussexProjects\Student::class, 200)->create();
		// factory(SussexProjects\Supervisor::class, 50)->create();
		// factory(SussexProjects\Project::class, 200)->create();
		// factory(SussexProjects\Topic::class, 53)->create();
		// factory(SussexProjects\ProjectTopic::class, 200)->states('primary')->create();
		factory(SussexProjects\ProjectTopic::class, 800)->states('extra')->create();

		// $eng_adminId = (string) Str::orderedUuid();
		// DB::statement("INSERT INTO `engineering_users` (`id`, `privileges`, `first_name`, `last_name`, `username`, `programme`, `email`) VALUES ('".$eng_adminId."', 'admin_ug,admin_pg', 'Admin', 'Account', 'admin', 'none', 'admin@susx.com');");
	}
}