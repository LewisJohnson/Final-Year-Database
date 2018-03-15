<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

if (!function_exists('lang_sess')){
    function lang_sess($key = null, $value = null){
        $key = str_replace('"', '',$key);
        $key = str_replace('\'', '',$key);

        $key = 'messages_'.Session::get('education_level').'.'.$key;
        return Lang::get($key);
    }
}

if (!function_exists('get_config_json')){
	function get_config_json($key = null, $value = null) {
		// todo: add per department config file
		if(empty(Session::get('department'))){
			$config = json_decode(Storage::disk('local')->get(config("app.default_department_config_file")), true);
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
			Storage::disk('local')->put($fileDir, json_encode($config, JSON_PRETTY_PRINT));
			return;
		}
	}
}

if (!function_exists('get_education_levels')){
	function get_education_levels($shortName = null, $longName = null) {
		$config = json_decode(Storage::disk('local')->get(config("app.system_config_file")), true);

		if($shortName){
			$ar = array();
			foreach (data_get($config, 'educationLevels') as $key => $level) {
				array_push($ar, $level['shortName']);
			}
			return $ar;
		}

		if($longName){
			$ar = array();
			foreach (data_get($config, 'educationLevels') as $key => $level) {
				array_push($ar, $level['longName']);
			}
			return $ar;
		}

		return data_get($config, 'educationLevels');
	}
}

if (!function_exists('get_departments')){
	function get_departments() {
		$config = json_decode(Storage::disk('local')->get(config("app.system_config_file")), true);
		return data_get($config, 'departments');
	}
}
