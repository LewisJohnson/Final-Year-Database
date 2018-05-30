<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

if(!function_exists('lang_sess')){
	function lang_sess($key = null){
		$key = str_replace('"', '', $key);
		$key = str_replace('\'', '', $key);
		$key = 'messages_'.Session::get('education_level')["shortName"].'.'.$key;
		$string = Lang::get($key);

		if($string != $key){
			return $string;
		}

		return null;
	}
}

if(!function_exists('get_config_json')){
	function get_config_json($key = null, $value = null){
		if(Session::get('department') == null){
			$config = json_decode(Storage::disk('local')
				->get(config("app.default_department_config_file")), true);
		} else {
			$fileDir = config("app.department_config_dir")."\\".Session::get('department').".json";
			$config = json_decode(Storage::disk('local')->get($fileDir), true);
		}

		if($key === null){
			// If no key, return the whole file
			return $config;
		}

		if($value === null){
			// If only key, return value
			return data_get($config, $key);
		}

		if(isset($key) && isset($value)){
			// If key and value, set value
			$key .= ".value";
			data_set($config, $key, $value);
			Storage::disk('local')
				->put($fileDir, json_encode($config, JSON_PRETTY_PRINT));

			return true;
		}

		return null;
	}
}

if(!function_exists('get_education_levels')){
	function get_education_levels($shortName = null, $longName = null){
		$config = json_decode(Storage::disk('local')
			->get(config("app.system_config_file")), true);

		if($shortName){
			$ar = array();
			foreach(data_get($config, 'educationLevels') as $key => $level){
				array_push($ar, $level['shortName']);
			}

			return $ar;
		}

		if($longName){
			$ar = array();
			foreach(data_get($config, 'educationLevels') as $key => $level){
				array_push($ar, $level['longName']);
			}

			return $ar;
		}

		return data_get($config, 'educationLevels');
	}
}

if(!function_exists('get_education_level')){
	/**
	 * Alias of get_education_levels
	 *
	 * @param null $shortName
	 * @param null $longName
	 *
	 * @return string education level
	 */
	function get_education_level($shortName = null, $longName = null){
		return call_user_func_array('get_education_level', func_get_args());
	}
}

if(!function_exists('get_departments')){
	function get_departments(){
		$config = json_decode(Storage::disk('local')
			->get(config("app.system_config_file")), true);

		return data_get($config, 'departments');
	}
}
