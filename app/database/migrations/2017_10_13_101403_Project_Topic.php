<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProjectTopic extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_topics', function (Blueprint $table) {
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('topic_id');
            $table->boolean('primary')->default(0);
            $table->primary(['project_id', 'topic_id']);
        });

        Schema::table('project_topics', function($table) {
            // $table->foreign('project_id')
            //     ->references('project_id')->on('projects')
            //     ->onDelete('cascade');

            // $table->foreign('topic_id')
            //     ->references('topic_id')->on('topics')
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
        Schema::dropIfExists('project_topics');
    }
}
