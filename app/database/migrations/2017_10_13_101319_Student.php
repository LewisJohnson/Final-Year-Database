<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Student extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('registration_number');
            $table->string('programme');
            $table->enum('project_status', ['none', 'selected', 'proposed', 'accepted'])->default('none');
            $table->unsignedBigInteger('project_id')->nullable(true);
            $table->boolean('share_project')->default(0);
        });

        Schema::table('students', function($table) {
            // $table->foreign('student_id')
            //     ->references('user_id')->on('users')
            //     ->onDelete('cascade');
                
            // $table->foreign('project_id')
            //     ->references('project_id')->on('projects');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
