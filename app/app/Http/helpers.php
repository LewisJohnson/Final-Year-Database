<?php

if (!function_exists('config_json')) {
	function config_json($key = null, $value = null) {
		$config = json_decode(Storage::disk('local')->get(config("app.config_dir")), true);

		if($key === null){
			return $config;
		}

		if($value === null){
			return data_get($config, $key);
		}

		if(isset($key) && isset($value)){
			$key .= ".value";

			data_set($config, $key, $value);

			Storage::disk('local')->put(config("app.config_dir"), json_encode($config, JSON_PRETTY_PRINT ));
			return;
		}
	}
}

if (!function_exists('lang_sess')) {
	function lang_sess($key = null, $value = null) {;
		$key = str_replace('"', '',$key);
		$key = str_replace('\'', '',$key);

		$key = 'messages_'.Session::get("db_type").'.'.$key;
		return Lang::get($key);
	}
}

if (!function_exists('department_sections')) {
	function department_sections() {;
		return ['ug', 'masters'];
	}
}

if (!function_exists('departments')) {
	function departments() {;
		return ['informatics', 'engineering'];
	}
}
