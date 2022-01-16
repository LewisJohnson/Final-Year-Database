<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddYearToUserTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		foreach (get_departments() as $key => $department)
		{
			$tableName = $department . '_users';

			Schema::table($tableName, function (Blueprint $table) use ($tableName)
			{
				DB::statement("ALTER TABLE `" . $tableName . "` ADD `active_year` YEAR NOT NULL DEFAULT '1970' AFTER `programme`;");
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
		$tableName = $department . '_users';

		Schema::table($tableName, function (Blueprint $table) use ($tableName)
		{
			DB::dropColumn("active_year");
		});
	}
}
