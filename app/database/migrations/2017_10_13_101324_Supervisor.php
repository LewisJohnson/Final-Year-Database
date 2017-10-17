<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Supervisor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('supervisors', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 6);
            $table->string('contact_type');
            $table->unsignedTinyInteger('project_load');
            $table->boolean('take_students');
        });

        Schema::table('supervisors', function(Blueprint $table) {
            // $table->foreign('supervisor_id')
            //     ->references('user_id')->on('users')
            //     ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('supervisors');
    }
}
