<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveMarkerIdFromStudentTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		foreach (get_departments() as $key => $department)
		{
			foreach (get_education_levels() as $key => $level)
			{
				$studentTableName = $department . '_students_' . $level['shortName'];

				if (Schema::hasColumn($studentTableName, 'marker_id'))
				{
					// Remove the marker id from the student table
					Schema::table($studentTableName, function (Blueprint $table) use ($department, $level)
					{
						$table->dropColumn('marker_id');
					});
				}
			}
		}
	}
}
