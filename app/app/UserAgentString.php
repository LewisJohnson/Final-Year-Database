<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Session;

/**
 * The user agent model.
 *
 * @see SussexProjects\Http\Controllers\UserAgentStringController
 */
class UserAgentString extends Model
{
	use Traits\Uuids;

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;
	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	/**
	 * The table to retrieve data from.
	 *
	 * @throws Exception Database not found
	 * @return string    Table string
	 */
	public function getTable()
	{
		if (Session::get('department') !== null)
		{
			return Session::get('department') . '_user_agent_strings';
		}
		else
		{
			throw new Exception('Database not found.');
		}
	}
}