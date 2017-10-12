<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_topics', function (Blueprint $table) {
            $table->unsignedInteger('project_id')->nullable(false);
            $table->unsignedInteger('topic_id')->nullable(false);
            $table->boolean('primary')->default(0);
            $table->primary(['project_id', 'topic_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_topics');
    }
}
