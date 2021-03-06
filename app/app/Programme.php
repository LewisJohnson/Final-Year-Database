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
 * The programme model.
 *
 * @see SussexProjects\Http\Controllers\ProgrammeController
 */
class Programme extends Model
{
	use Traits\Uuids;

	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = false;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	public $fillable = ['name'];

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = false;

	/**
	 * A HTML data-list of all topics.
	 *
	 *
	 * @param  null     $userProgrammeId
	 * @return string
	 */
	public static function getSelectList($userProgrammeId = null)
	{
		$programmes = Programme::all();

		$rtnString = '<select class="form-control w-auto" name="programme">';
		$rtnString .= '<option value="">None</option>';
		foreach ($programmes as $prog)
		{
			if ($userProgrammeId == $prog->id)
			{
				$rtnString .= '<option selected value="' . $prog->id . '">' . $prog->name . '</option>';
			}
			else
			{
				$rtnString .= '<option value="' . $prog->id . '">' . $prog->name . '</option>';
			}
		}
		$rtnString .= '</select>';

		return $rtnString;
	}

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
			return Session::get('department') . '_programmes';
		}
		else
		{
			throw new Exception('Database not found.');
		}
	}
}
