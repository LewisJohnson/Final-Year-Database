<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModeSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		// Post grad
		DB::table('informatics_mode_pg')->insert([
			'project_selection' => '2021-05-01 00:00:00', 
			'supervisor_accept' => '2021-05-14 00:00:00',
			'marker_released_to_staff' => 0,
			'project_year' => '2021',
			'project_evaluation_date' => '2021-08-01 00:00:00',
			'project_evaluation_percentage_difference' => 10
		]);

		// Under grad
		DB::table('informatics_mode_ug')->insert([
			'project_selection' => '2021-05-01 00:00:00', 
			'supervisor_accept' => '2021-05-14 00:00:00',
			'marker_released_to_staff' => 0,
			'project_year' => '2021',
			'project_evaluation_date' => '2021-08-01 00:00:00',
			'project_evaluation_percentage_difference' => 10
		]);

		DB::table('informatics_mode_ug')->insert([
			'project_selection' => '2020-05-01 00:00:00', 
			'supervisor_accept' => '2020-05-14 00:00:00',
			'marker_released_to_staff' => 0,
			'project_year' => '2020',
			'project_evaluation_date' => '2020-08-01 00:00:00',
			'project_evaluation_percentage_difference' => 10
		]);

		DB::table('informatics_mode_ug')->insert([
			'project_selection' => '1970-01-01 00:00:00', 
			'supervisor_accept' => '1970-01-01 00:00:00',
			'marker_released_to_staff' => 0,
			'project_year' => '1970',
			'project_evaluation_date' => '1970-01-01 00:00:00',
			'project_evaluation_percentage_difference' => 0
		]);
	}
}
