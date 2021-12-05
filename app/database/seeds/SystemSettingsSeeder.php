<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SystemSettingsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$tableName = 'system_settings';

		DB::table($tableName)->insert([
			'section' => 'Style',
			'name' => 'logo_url',
			'type' => 'string',
			'description' => 'The logo shown on the desktop header. The URL may be relative or absolute.',
			'value' => 'https://www.informatics.sussex.ac.uk/courses/Final-Year-Database/app/public/images/logo.png',
			'created_at' => '2021-01-01 21:24:48',
			'updated_at' => '2021-01-01 21:24:48',
		]);

		DB::table($tableName)->insert([
			'section' => 'Style',
			'name' => 'theme_colour',
			'type' => 'string',
			'description' => 'The theme colour used for the header. This may be HEX or RGB.',
			'value' => '#494f6f',
			'created_at' => '2021-11-24 21:24:48',
			'updated_at' => '2021-11-24 21:24:48',
		]);

		DB::table($tableName)->insert([
			'section' => 'Style',
			'name' => 'footer_rainbow',
			'type' => 'bool',
			'description' => 'Determines if a rainbow is shown in the footer.',
			'value' => 'false',
			'created_at' => '2021-11-24 21:24:48',
			'updated_at' => '2021-11-24 21:24:48',
		]);

		DB::table($tableName)->insert([
			'section' => 'Style',
			'name' => 'footer_accessibility_buttons',
			'type' => 'bool',
			'description' => 'Determines if accessibility buttons are shown in the footer.',
			'value' => 'true',
			'created_at' => '2021-11-24 21:24:48',
			'updated_at' => '2021-11-24 21:24:48',
		]);

		DB::table($tableName)->insert([
			'section' => 'Telemetry',
			'name' => 'collect_user_agent',
			'type' => 'bool',
			'description' => 'Determines if the user agent strings are collected.',
			'value' => 'false',
			'created_at' => '2021-11-24 21:24:48',
			'updated_at' => '2021-11-24 21:24:48',
		]);

		DB::table($tableName)->insert([
			'section' => 'Telemetry',
			'name' => 'collect_referrer',
			'type' => 'bool',
			'description' => 'Determines if referrer URLs are collected alongside the User Agent Strings.',
			'value' => 'false',
			'created_at' => '2021-11-24 21:24:48',
			'updated_at' => '2021-11-24 21:24:48'
		]);
	}
}
