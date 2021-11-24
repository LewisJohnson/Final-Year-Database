<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSystemSettingsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('system_settings', function (Blueprint $table)
		{
			$table->increments('id');
			$table->string('section');
			$table->string('name')->unique();
			$table->string('type');
			$table->text('description');
			$table->text('value');
			$table->timestamps();
		});

		foreach (get_departments() as $key => $department)
		{
			foreach (get_education_levels() as $key => $level)
			{
				Schema::create($department.'_system_settings_'.$level['shortName'], function (Blueprint $table) use ($department, $level)
				{
					$table->increments('id');
					$table->string('section');
					$table->string('name')->unique();
					$table->string('type');
					$table->text('description');
					$table->text('value');
					$table->timestamps();
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
		Schema::dropIfExists('system_settings');

		foreach (get_departments() as $key => $department)
		{
			foreach (get_education_levels() as $key => $level)
			{
				Schema::dropIfExists($department . '_system_settings_' . $level['shortName']);
			}
		}
	}
}
