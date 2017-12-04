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

		// DB::table('users')->insert([
		// 	'id' => 1,
		// 	'first_name' => 'UG',
		// 	'last_name' => 'Admin',
		// 	'access_type' => "ug_admin",
		// 	'username' => 'ug_admin',
		// 	'email' => 'ug_admin@susx.ac.uk',
		// 	'password' => bcrypt('admin')
		// ]);


		// DB::table('supervisors')->insert([
		// 	'id' => 1,
		// 	'title' => 'Prof.',
		// 	'project_load_masters' => 5,
		// 	'project_load_ug' => 3,
		// 	'take_students_masters' => true,
		// 	'accept_email_masters' => true,
		// 	'take_students_ug' => true,
		// 	'accept_email_ug' => true,
		// ]);

		// DB::table('users')->insert([
		// 	 'id' => 2,
		// 	 'first_name' => 'MSc',
		// 	 'last_name' => 'Admin',
		// 	 'access_type' => "masters_admin",
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

		// change to 'god' admin
	//	  DB::table('users')->insert([
	//		  'id' => 3,
	//		  'first_name' => 'UG',
	//		  'last_name' => 'Admin',
	//		  'access_type' => "ug_administrator",
	//		  'username' => 'ug_admin',
	//		  'email' => 'god_admin@susx.ac.uk',
	//		  'password' => bcrypt('admin')
	//	  ]);

 		// factory(App\User::class, 300)->create();
		// factory(App\Student::class, 300)->create();
		// factory(App\TopicUg::class, 10)->create();
		factory(SussexProjects\ProjectUg::class, 200)->create();
		// factory(App\Supervisor::class, 5)->create();
		


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
	}
}