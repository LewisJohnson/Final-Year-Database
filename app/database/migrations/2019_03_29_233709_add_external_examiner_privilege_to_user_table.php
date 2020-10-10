<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExternalExaminerPrivilegeToUserTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		$projectAdminLevels = "";

		foreach (get_education_levels(true) as $key => $level)
		{
			$projectAdminLevels .= "'admin_" . $level . "',";
		}

		foreach (get_departments() as $key => $department)
		{
			$tableName = $department . '_users';

			Schema::table($tableName, function (Blueprint $table) use ($tableName, $projectAdminLevels)
			{
				DB::statement("ALTER TABLE `" . $tableName . "` CHANGE COLUMN `privileges` `privileges` SET('student', 'staff', 'supervisor', " . $projectAdminLevels . " 'admin_system', 'external_marker');");
			});
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//lol.
	}
}
