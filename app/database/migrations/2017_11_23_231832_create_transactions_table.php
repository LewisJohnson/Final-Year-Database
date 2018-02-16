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
		foreach (department_sections() as $key => $value) {
			Schema::create('transactions_'.$value, function (Blueprint $table) {
				$table->increments('id');
				$table->enum('type', ['topic', 'project', 'student', 'marker']);
				$table->enum('action', ['proposed', 'selected', 'accepted', 'rejected', 'deleted', 'updated', 'created', 'undo', 'marker-assigned']);
				$table->string('project')->nullable('true');
				$table->string('student')->nullable('true');
				$table->string('supervisor')->nullable('true');
				$table->string('topic')->nullable('true');
				$table->string('admin')->nullable('true');
				$table->dateTimeTz('transaction_date');
			});
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down(){
		foreach (department_sections() as $key => $value) {
			Schema::dropIfExists('transactions_'.$value);
		}
	}
}
