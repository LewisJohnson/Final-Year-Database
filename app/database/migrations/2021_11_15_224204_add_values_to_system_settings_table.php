<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddValuesToSystemSettingsTable extends Migration
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
			foreach (get_education_levels() as $key => $level)
			{
				$tableName = $department.'_system_settings_'.$level['shortName'];

				Schema::table($tableName, function (Blueprint $table) use ($tableName)
				{
					$insertInto = "INSERT INTO `".$tableName."` (`section`, `name`, `type`, `description`, `value`, `created_at`, `updated_at`) ";

					DB::statement($insertInto.
						"VALUES ('Style', 'logo_url', 'string', 'The logo shown on the desktop header. The URL may be relative or absolute.', 'https://www.informatics.sussex.ac.uk/courses/Final-Year-Database/app/public/images/logo.png', UTC_TIMESTAMP(), UTC_TIMESTAMP());");

					DB::statement($insertInto.
						"VALUES ('Style', 'theme_colour', 'string', 'The theme colour used for the header. This may be HEX or RGB.', '#1D4289', UTC_TIMESTAMP(), UTC_TIMESTAMP());");

					DB::statement($insertInto.
						"VALUES ('Style', 'footer_rainbow', 'bool', 'Determines if a rainbow is shown in the footer.', 'false', UTC_TIMESTAMP(), UTC_TIMESTAMP());");

					DB::statement($insertInto.
						"VALUES ('Style', 'footer_accessibility_buttons', 'bool', 'Determines if accessibility buttons are shown in the footer.', 'true', UTC_TIMESTAMP(), UTC_TIMESTAMP());");

					DB::statement($insertInto.
						"VALUES ('Telemetry', 'collect_user_agent', 'bool', 'Determines if the user agent strings are collected.', 'false', UTC_TIMESTAMP(), UTC_TIMESTAMP());");

					DB::statement($insertInto.
						"VALUES ('Telemetry', 'collect_referrer', 'bool', 'Determines if referrer URLs are collected alongside the User Agent Strings.', 'false', UTC_TIMESTAMP(), UTC_TIMESTAMP());");
				});
			}
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('system_settings', function (Blueprint $table) {
			//
		});
	}
}
