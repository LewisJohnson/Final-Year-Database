<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;
/**
 * The user agent model.
 * 
 * @see SussexProjects\Http\Controllers\UserAgentStringController
*/

class UserAgentString extends Model{
	use Traits\Uuids;

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable(){
		if(Session::get('department') !== null){
			return Session::get('department').'_user_agent_strings';
		} else {
			throw new Exception('Database not found.');
		}
	}
	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;
}
