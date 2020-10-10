<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCopyActionToTransactionTable extends Migration
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
				$transactionTableName = $department . '_transactions_' . $level['shortName'];

				Schema::table($transactionTableName, function (Blueprint $table) use ($transactionTableName)
				{
					DB::statement("ALTER TABLE `" . $transactionTableName . "` CHANGE COLUMN `action` `action` ENUM('proposed','selected','accepted','rejected','deleted','updated','created','undo','marker-assigned','copy') NOT NULL");
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
		foreach (get_departments() as $key => $department)
		{
			foreach (get_education_levels() as $key => $level)
			{
				$transactionTableName = $department . '_transactions_' . $level['shortName'];

				Schema::table($transactionTableName, function (Blueprint $table) use ($transactionTableName)
				{
					DB::statement("ALTER TABLE `" . $transactionTableName . "` CHANGE COLUMN `action` `action` ENUM('proposed','selected','accepted','rejected','deleted','updated','created','undo','marker-assigned') NOT NULL");
				});
			}
		}
	}
}
