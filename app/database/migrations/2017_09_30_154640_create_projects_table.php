<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return voidm
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('project_id')->unique()->nullable(false);
            $table->string('title')->nullable(false);
            $table->mediumText('description')->nullable(false);
            $table->string('skills', 128)->nullable(false);
            $table->string('author_programme', 128)->nullable(false);
            $table->enum('status', ['on-offer', 'withdrawn', 'student-proposed', 'archived'])->nullable(false);
            $table->unsignedInteger('supervisor_id')->nullable(true);
            $table->unsignedInteger('student_id')->nullable(true);
            $table->boolean('student_proposed_topic')->nullable(false);
            $table->dateTime('start_date')->nullable(false);
            $table->timestamp('created_at')->useCurrent = true;
            $table->timestamp('updated_at')->useCurrent = true;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
