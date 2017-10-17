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
 		factory(App\User::class, 30)->create();
 		factory(App\Topic::class, 10)->create();
 		factory(App\Project::class, 100)->create();
        factory(App\Supervisor::class, 5)->create();
        factory(App\Student::class, 20)->create();
        
 		DB::table('users')->insert([
    		'first_name' => 'Lewis',
    		'last_name' => 'Johnson',
    		'access_type' => "admin",
    		'username' => 'admin',
            'email' => 'admin@sussex.ac.uk',
            'password' => bcrypt('admin'),
            'remember_token' => str_random(10),
        ]);

        for ($i=1; $i < 100; $i++) {
        	for ($j=1; $j < rand(2, 10); $j++) { 
        		if($j == 1){
        			DB::table('project_topics')->insert([
	        			'project_id' => $i,
	        			'topic_id' => $j,
	        			'primary' => true
	        		]);
        		} else {
        			DB::table('project_topics')->insert([
	        			'project_id' => $i,
	        			'topic_id' => $j,
	        			'primary' => false
	        		]);
        		}
        	}
        }
    }
}
// $faker->numberBetween(1,100)