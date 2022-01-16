<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeTransactionsFromEnumToString extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
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
				$transactionsTableName = $department . '_transactions_' . $level['shortName'];

				/* 
					* I have no idea which version of MySQL ITS is running now so to be safe I used generic SQL
					*
					* 1. Add new columns with postfix
					* 2. Set new columns to old column values
					* 3. Drop old columns
					* 4. Add new columns with correct name
					* 5. Set new columns to postfix column values
					* 6. Drop postfix columns
				*/

				DB::statement("ALTER TABLE $transactionsTableName ADD COLUMN `type_s` VARCHAR(191) NOT NULL;");
				DB::statement("ALTER TABLE $transactionsTableName ADD COLUMN `action_s` VARCHAR(191) NOT NULL;");

				DB::statement("UPDATE $transactionsTableName SET `type_s` = CAST(`type` AS VARCHAR(191)) WHERE `id` = `id`;");
				DB::statement("UPDATE $transactionsTableName SET `action_s` = CAST(`action` AS VARCHAR(191)) WHERE `id` = `id`;");

				DB::statement("ALTER TABLE {$transactionsTableName} DROP COLUMN `type`;");
				DB::statement("ALTER TABLE $transactionsTableName DROP COLUMN `action`;");

				DB::statement("ALTER TABLE $transactionsTableName ADD COLUMN `type` VARCHAR(191) NOT NULL AFTER `id`;");
				DB::statement("ALTER TABLE $transactionsTableName ADD COLUMN `action` VARCHAR(191) NOT NULL AFTER `type`;");

				DB::statement("UPDATE $transactionsTableName SET `type` = `type_s` WHERE `id` = `id`;");
				DB::statement("UPDATE $transactionsTableName SET `action` = `action_s` WHERE `id` = `id`;");

				DB::statement("ALTER TABLE $transactionsTableName DROP COLUMN `type_s`;");
				DB::statement("ALTER TABLE $transactionsTableName DROP COLUMN `action_s`;");
			}
		}
	}
}
