<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

class DatabaseSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run(){
		// Admin: 1 [id 1 & 2]
		// Supervisors: 40 [id 3 - 43]
		// Students: 300 [id 44 - 344] (150 UG, 150 MSc)
		// Projects: 600 (300 UG, 300 MSc)

		// First 100 students select projects 1 - 100
		factory(SussexProjects\User::class, 344)->create();
		factory(SussexProjects\Supervisor::class, 40)->create();

		factory(SussexProjects\StudentUg::class, 150)->create();
		factory(SussexProjects\StudentMasters::class, 150)->create();

		factory(SussexProjects\ProjectUg::class, 300)->create();
		factory(SussexProjects\ProjectMasters::class, 300)->create();

		factory(SussexProjects\TopicUg::class, 53)->create();
		factory(SussexProjects\TopicMasters::class, 53)->create();
	}
}

		// for ($i=1; $i < 100; $i++) {
		// 	for ($j=1; $j < rand(2, 10); $j++) { 
		// 		if($j == 1){
		// 			DB::table('project_topics')->insert([
			//  			'project_id' => $i,
			//  			'topic_id' => $j,
			//  			'primary' => true
			//  		]);
		// 		} else {
		// 			DB::table('project_topics')->insert([
			//  			'project_id' => $i,
			//  			'topic_id' => $j,
			//  			'primary' => false
			//  		]);
		// 		}
		// 	}
		// }

		// DB::table('users')->insert([
		// 	 'id' => 2,
		// 	 'first_name' => 'MSc',
		// 	 'last_name' => 'Admin',
		// 	 'access_type' => "admin_masters",
		// 	 'username' => 'msc_admin',
		// 	 'email' => 'msc_admin@susx.ac.uk',
		// 	 'password' => bcrypt('admin')
		// ]);

		// DB::table('supervisors')->insert([
		// 	 'id' => 2,
		// 	 'title' => 'Prof.',
		// 	 'project_load_masters' => 8,
		// 	 'project_load_ug' => 6,
		// 	 'take_students_masters' => true,
		// 	 'accept_email_masters' => true,
		// 	 'take_students_ug' => true,
		// 	 'accept_email_ug' => true,
		// ]);