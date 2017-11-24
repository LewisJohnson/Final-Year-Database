<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transactions_ug', function (Blueprint $table) {
			$table->increments('id');
			$table->enum('transaction_type', ['proposed', 'selected', 'accepted', 'rejected', 'deleted', 'edited', 'created', 'undo']);
			$table->unsignedBigInteger('project_id')->nullable('true');
			$table->unsignedBigInteger('student_id')->nullable('true');
			$table->unsignedBigInteger('supervisor_id')->nullable('true');
			$table->unsignedBigInteger('admin_id')->nullable('true');
			$table->dateTimeTz('transaction_date');
		});

		Schema::create('transactions_masters', function (Blueprint $table) {
			$table->increments('id');
			$table->enum('transaction_type', ['proposed', 'selected', 'accepted', 'rejected', 'deleted', 'edited', 'created', 'undo']);
			$table->unsignedBigInteger('project_id')->nullable('true');
			$table->unsignedBigInteger('student_id')->nullable('true');
			$table->unsignedBigInteger('supervisor_id')->nullable('true');
			$table->unsignedBigInteger('admin_id')->nullable('true');
			$table->dateTimeTz('transaction_date');
		});
	}

	/** 
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('transactions');
	}
}
