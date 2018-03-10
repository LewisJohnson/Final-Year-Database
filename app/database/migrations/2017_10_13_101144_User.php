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
			Schema::create($department.'_users', function (Blueprint $table) {
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

			$dbname = $department.'_users';
			DB::statement("ALTER TABLE `".$dbname."` ADD COLUMN `privileges` SET('guest', 'student', 'staff', 'supervisor', 'admin_ug', 'admin_pg', 'admin_system') NOT NULL DEFAULT 'guest' AFTER `id`;");
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
