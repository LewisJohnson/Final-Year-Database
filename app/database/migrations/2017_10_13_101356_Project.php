<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Project extends Migration
{
    /**
     * Run the migrations.
     *
     * @return voidm
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('project_type', ['masters', 'final']);
            $table->string('title', 255);
            $table->mediumText('description');
            $table->string('skills', 255);
            $table->string('author_programme', 255);
            $table->enum('status', ['on-offer', 'withdrawn', 'student-proposed', 'archived']);
            $table->unsignedBigInteger('supervisor_id')->nullable(true);
            $table->unsignedBigInteger('student_id')->nullable(true);
            $table->boolean('student_proposed_project')->default(0);
            $table->dateTime('start_date');
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
