<?php
namespace SussexProjects;

/**
 * The undergraduate transaction model.
 * 
 * @see SussexProjects\Http\Controllers\TransactionController
*/
class TransactionUg extends Transaction{

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	protected $table = 'transactions_ug';
}
