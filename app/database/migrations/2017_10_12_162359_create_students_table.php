<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->increments('student_id');
            $table->unsignedInteger('registration_number')->nullable(false);
            $table->string('programme')->nullable(false);
            $table->enum('project_status', ['none', 'selected', 'proposed'])->default('none');
            $table->unsignedInteger('project_id')->nullable(true);
            $table->boolean('share_project')->default(0);
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
