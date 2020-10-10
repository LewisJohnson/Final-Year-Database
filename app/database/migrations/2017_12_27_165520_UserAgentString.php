<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserAgentString extends Migration
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
			Schema::create($department . '_user_agent_strings', function (Blueprint $table)
			{
				$table->uuid('id');
				$table->text('user_agent');
				$table->text('referrer')->nullable();
				$table->boolean('first_visit');
				$table->primary('id');
			});
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		foreach (get_departments() as $key => $department)
		{
			Schema::dropIfExists($department . '_user_agent_strings');
		}
	}
}
