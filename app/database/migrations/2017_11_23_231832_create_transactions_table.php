<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up(){
		foreach (departments() as $key => $department) {
			foreach (education_levels() as $key => $level) {
				Schema::create($department.'_transactions_'.$level['shortName'], function (Blueprint $table) {
					$table->uuid('id');
					$table->enum('type', ['topic', 'project', 'student', 'marker']);
					$table->enum('action', ['proposed', 'selected', 'accepted', 'rejected', 'deleted', 'updated', 'created', 'undo', 'marker-assigned']);
					$table->string('project')->nullable('true');
					$table->string('student')->nullable('true');
					$table->string('supervisor')->nullable('true');
					$table->string('topic')->nullable('true');
					$table->string('admin')->nullable('true');
					$table->dateTimeTz('transaction_date');
					$table->primary('id');
				});
			}
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		foreach (departments() as $key => $department) {
			foreach (education_levels() as $key => $level) {
				Schema::dropIfExists($department.'_transactions_'.$level['shortName']);
			}
		}
	}
}
