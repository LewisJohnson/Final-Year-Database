<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;

/**
 * The transaction model.
 * 
 * @see SussexProjects\Http\Controllers\TransactionController
*/
class Transaction extends Model{

	/**
	 * The table to retrieve data from.
	 *
	 * @var string
	 */
	protected $table = null;

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;
	
	/**
	 * The attributes that are not mass assignable.
	 *
	 * @var array
	 */
	protected $guarded = ['id'];
	
	/**
	 * The columns to be parsed as dates.
	 *
	 * @var array
	 */
	protected $dates = ['transaction_date'];
}
