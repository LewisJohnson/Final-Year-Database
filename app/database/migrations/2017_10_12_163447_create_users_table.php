<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('first_name', 128)->nullable(false);
            $table->string('last_name', 128)->nullable(false);
            $table->string('username', 12)->nullable(false);
            $table->string('password', 128)->nullable(false);
            $table->enum('access_type', ['student', 'staff', 'supervisor', 'admin']);
            $table->string('email', 128)->unique()->nullable(false);
            $table->datetime('lastlogin')->nullable(true);
            $table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
