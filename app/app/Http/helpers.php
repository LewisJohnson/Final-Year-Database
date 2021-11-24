<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

if (!function_exists('lang_sess'))
{
	/**
	 * Returns the education level specific language key
	 * associated to the parameters key.
	 *
	 *
	 * @param  string      $key The key to search for.
	 * @return string|null The located language string, otherwise the key name.
	 */
	function lang_sess($key = null)
	{
		$key = str_replace('"', '', $key);
		$key = str_replace('\'', '', $key);
		$key = 'messages_' . get_el_short_name() . '.' . $key;
		$string = Lang::get($key);

		if ($string != $key)
		{
			return $string;
		}

		return null;
	}
}

if (!function_exists('get_education_levels'))
{
	/**
	 * Retrieves a list of education levels configured in the system configuration file.
	 *
	 *
	 * @param  boolean  $shortName If only the short-hand names should be returned.
	 * @param  boolean  $longName  If only the long-hand names should be returned.
	 * @return string[] A list of education levels.
	 */
	function get_education_levels($shortName = null, $longName = null)
	{
		$config = json_decode(Storage::disk('local')->get(config("app.system_config_file")), true);

		if ($shortName)
		{
			$ar = array();
			foreach (data_get($config, 'educationLevels') as $key => $level)
			{
				array_push($ar, $level['shortName']);
			}

			return $ar;
		}

		if ($longName)
		{
			$ar = array();
			foreach (data_get($config, 'educationLevels') as $key => $level)
			{
				array_push($ar, $level['longName']);
			}

			return $ar;
		}

		return data_get($config, 'educationLevels');
	}
}

if (!function_exists('get_education_level'))
{
	/**
	 * Alias of get_education_levels.
	 *
	 *
	 * @param  boolean  $shortName If only the short-hand names should be returned.
	 * @param  boolean  $longName  If only the long-hand names should be returned.
	 * @return string[] A list of education levels.
	 */
	function get_education_level($shortName = null, $longName = null)
	{
		return call_user_func_array('get_education_level', func_get_args());
	}
}

if (!function_exists('get_el_short_name'))
{
	function get_el_short_name()
	{
		return Session::get('education_level')["shortName"];
	}
}

if (!function_exists('get_el_long_name'))
{
	function get_el_long_name()
	{
		return Session::get('education_level')["longName"];
	}
}

if (!function_exists('get_departments'))
{
	/**
	 * Retrieves a list of departments configured in the system configuration file.
	 *
	 * @return string[] A list of departments.
	 */
	function get_departments()
	{
		$config = json_decode(Storage::disk('local')->get(config("app.system_config_file")), true);

		return data_get($config, 'departments');
	}
}

if (!function_exists('ldap_guest'))
{
	/**
	 * Determines if the current user is an exclusively LDAP authenticated guest.
	 *
	 * @return boolean True if LDAP guest, false otherwise
	 */
	function ldap_guest()
	{
		if (empty(Session::get('ldap_guest')))
		{
			return false;
		}

		if (Auth::check())
		{
			return false;
		}

		return Session::get('ldap_guest');
	}
}
