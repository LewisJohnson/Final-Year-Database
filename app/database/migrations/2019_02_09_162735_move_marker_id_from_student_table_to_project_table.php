<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MoveMarkerIdFromStudentTableToProjectTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		DB::beginTransaction();

		foreach(get_departments() as $key => $department) {
			foreach(get_education_levels() as $key => $level) {
				$studentTableName = $department.'_students_'.$level['shortName'];
				$projectTableName = $department.'_projects_'.$level['shortName'];

				// Select the project and marker from the student table
				$sql = 
<<<EOT
SELECT project_id, marker_id FROM $studentTableName
WHERE project_status = 'accepted'
AND project_id IS NOT NULL
EOT;
				// Store the values
				$markerIds = DB::select($sql);

				// Remove the marker id from the student table
				Schema::table($studentTableName, function (Blueprint $table) use ($department, $level){
					$table->dropColumn('marker_id');
				});
				
				// Add the marker id to the project table
				Schema::table($projectTableName, function (Blueprint $table) use ($department, $level){
					$table->uuid('marker_id')->nullable(true);
					$table->foreign('marker_id')->references('id')->on($department.'_supervisors')->onDelete('SET NULL');
				});

				// Bind the marker ID to the project
				foreach ($markerIds as $marker) {
					$sql = 
<<<EOT
UPDATE $projectTableName
SET marker_id = '$marker->marker_id'
WHERE id = '$marker->project_id'
EOT;
					DB::statement($sql);
				}
			}
		}

		DB::commit();
	}
}
