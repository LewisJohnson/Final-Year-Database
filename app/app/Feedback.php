<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects;

use Illuminate\Database\Eloquent\Model;

/**
 * The feedback model.
 *
 * @see SussexProjects\Http\Controllers\HomeController
 */
class Feedback extends Model
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
	 * The columns to be parsed as dates.
	 *
	 * @var array
	 */
	protected $dates = ['date'];

	/**
	 * The table to retrieve data from.
	 *
	 * @return string
	 */
	public function getTable()
	{
		return 'feedback';
	}
}
