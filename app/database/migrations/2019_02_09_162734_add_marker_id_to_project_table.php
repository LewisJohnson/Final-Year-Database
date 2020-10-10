<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMarkerIdToProjectTable extends Migration
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
				$projectTableName = $department . '_projects_' . $level['shortName'];

				if (!Schema::hasColumn($projectTableName, 'marker_id'))
				{
					// Add the marker id to the project table
					Schema::table($projectTableName, function (Blueprint $table) use ($department, $level)
					{
						$table->uuid('marker_id')->nullable(true);
						$table->foreign('marker_id')->references('id')->on($department . '_supervisors')->onDelete('SET NULL');
					});
				}
			}
		}
	}
}
