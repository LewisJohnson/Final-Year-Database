<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects;

use Exception;
use Log;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Session;

/**
 * The mode singleton model.
 *
 * @see SussexProjects\Http\Controllers\ModeController
 */
class SystemSettings extends Model
{
	/**
	 * Indicates if Laravel default time-stamp columns are used.
	 *
	 * @var string
	 */
	public $timestamps = true;

	/**
	 * Indicates if the IDs are auto-incrementing.
	 *
	 * @var bool
	 */
	public $incrementing = true;

	/**
	 * The columns to be parsed as dates.
	 *
	 * @var array
	 */
	protected $dates = ['created_at', 'updated_at'];

	/**
	 * The models primary key
	 *
	 * @var string
	 */
	protected $primaryKey = 'id';

	/**
	 * The table to retrieve data from.
	 *
	 * @throws Exception Database not found
	 * @return string    Table string
	 */
	public function getTable()
	{
		if (Session::get('department') !== null && Session::get('education_level') !== null)
		{
			return Session::get('department') . '_system_settings_' . get_el_short_name();
		}

		// Default system settings table
		return 'system_settings';
	}

	/**
	 * Gets a system setting
	 *
	 *
	 * @param  boolean  $name
	 * @return SystemSettings
	 */
	public static function get($name)
	{
		if (!isset($name))
		{
			Log::error("SystemSettings::get - name not set");
			throw new Exception("SystemSettings::get - name not set");
		}

		$result = SystemSettings::where('name', $name)->first();

		if ($result == null)
		{
			Log::error("SystemSettings::get - Invalid name provided (".$name.")");	
			return false;
		}

		return $result;
	}

	/**
	 * Gets a list of system settings by section
	 *
	 *
	 * @param  string  $section
	 * @return string
	 */
	public static function getBySection($section)
	{
		if (!isset($section))
		{
			Log::error("SystemSettings::getBySection - section not set");
			throw new Exception("SystemSettings::getBySection - section not set");
		}

		$result = SystemSettings::where('section', $section)->get();

		return $result;
	}

	/**
	 * Sets a system setting
	 *
	 *
	 * @param  string  $section
	 * @return string
	 */
	public static function set($name, $value)
	{
		if (!isset($name))
		{
			Log::error("SystemSettings::set - name not set");
			return false;
		}

		if (!isset($value))
		{
			Log::error("SystemSettings::set - value not set");
			return false;
		}

		$setting = SystemSettings::where('name', $name)->first();

		if ($setting == null)
		{
			Log::error("SystemSettings::set - Invalid name provided (".$name.")");	
			return false;
		}

		$setting->value = $value;
		$setting->save();

		return true;
	}
}