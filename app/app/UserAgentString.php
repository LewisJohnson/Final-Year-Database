<?php
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;

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
			return 'UNSET';
		}
	}
	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;
}
