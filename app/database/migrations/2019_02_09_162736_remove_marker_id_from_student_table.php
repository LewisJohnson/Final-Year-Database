<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveMarkerIdFromStudentTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		foreach(get_departments() as $key => $department) {
			foreach(get_education_levels() as $key => $level) {
				$studentTableName = $department.'_students_'.$level['shortName'];
				// Remove the marker id from the student table
				Schema::table($studentTableName, function (Blueprint $table) use ($department, $level){
					$table->dropColumn('marker_id');
				});
			}
		}
	}
}
