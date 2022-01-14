<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveMarkerIdFromProjectTable extends Migration
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
				$projectTable = $department . '_projects_' . $level['shortName'];

				if (Schema::hasColumn($projectTable, 'marker_id'))
				{
					// Remove the project id from the project evaluation table
					Schema::table($projectTable, function (Blueprint $table) use ($projectTable)
					{
						$table->dropForeign($projectTable . '_marker_id_foreign');
						$table->dropColumn('marker_id');
					});
				}
			}
		}
	}
}
