<?php
namespace SussexProjects;

/**
 * The masters transaction model.
 * 
 * @see SussexProjects\Http\Controllers\TransactionController
*/
class TransactionMasters extends Transaction {

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	protected $table = 'transactions_masters';
}
