<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

/**
 * The transaction model.
 * 
 * @see SussexProjects\Http\Controllers\TransactionController
*/
class Transaction extends Model{
	use Traits\Uuids;
	
	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_transactions_'.Session::get('education_level');
		} else {
			return 'UNSET';
		}
	}
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
