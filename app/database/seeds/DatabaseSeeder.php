<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use SussexProjects\SystemSettings;

class DatabaseSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		// Session::put('education_level', current(get_education_levels()));
		// Session::put('department', 'informatics');

		// factory(SussexProjects\Student::class, 200)->create();
		// factory(SussexProjects\Supervisor::class, 50)->create();
		// factory(SussexProjects\Project::class, 200)->create();
		// factory(SussexProjects\Topic::class, 53)->create();
		// factory(SussexProjects\ProjectTopic::class, 200)->states('primary')->create();
		// factory(SussexProjects\ProjectTopic::class, 800)->states('extra')->create();

		// $inf_adminId = (string) Str::orderedUuid();

		// DB::statement("INSERT INTO `informatics_users` (`id`, `privileges`, `first_name`, `last_name`, `username`, `programme`, `email`) VALUES ('" . $inf_adminId . "', 'admin_ug, admin_pg, admin_system', 'Admin', 'Account', 'admin', 'none', 'admin@susx.com');");

		$this->call([
			ModeSeeder::class,
			ProgrammeSeeder::class,
			SystemSettingsSeeder::class,
			SystemSettingsUGSeeder::class,
			SystemSettingsPGSeeder::class,
		]);
	}
}