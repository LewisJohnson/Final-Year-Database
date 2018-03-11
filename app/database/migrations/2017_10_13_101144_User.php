<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class User extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (departments() as $key => $department) {
			$tableName = $department.'_users';

			if (!Schema::hasTable($tableName)) {
				Schema::create($tableName, function (Blueprint $table) {
					$table->uuid('id')->unique();
					$table->string('first_name', 128);
					$table->string('last_name', 128);
					$table->string('username', 32)->unique();
					$table->string('password', 128);
					$table->string('programme');
					$table->string('email', 128)->unique();
					$table->dateTimeTz('last_login')->nullable(true);
					$table->rememberToken();
					$table->primary('id');
				});

				DB::statement("ALTER TABLE `".$tableName."` ADD COLUMN `privileges` SET('guest', 'student', 'staff', 'supervisor', 'admin_ug', 'admin_pg', 'admin_system') NOT NULL DEFAULT 'guest' AFTER `id`;");
			}
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		Schema::dropIfExists('users');
	}
}
