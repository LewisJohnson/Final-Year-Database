<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectEvaluationDifferencePercentageToModeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach(get_departments() as $key => $department) {
            foreach(get_education_levels() as $key => $level) {
                Schema::table($department.'_mode_'.$level['shortName'], function (Blueprint $table) {
                    $table->unsignedTinyInteger('project_evaluation_percentage_difference')->default(10);
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach(get_departments() as $key => $department) {
            foreach(get_education_levels() as $key => $level) {
                Schema::table($department.'_mode_'.$level['shortName'], function (Blueprint $table){
                    $table->dropColumn('project_evaluation_percentage_difference');
                });
            }
        }
    }
}
