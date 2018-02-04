<?php

if (! function_exists('env_json')) {
	function env_json($key = null, $value = null) {
		$config = json_decode(Storage::disk('local')->get(config("app.config_dir")), true);

		if($key === null){
			return $config;
		}

		if(preg_match('/^[a-zA-Z.]+/', $key) != 1){ 
			return; 
		}

		if($value === null){
			$exp = explode(".", $key);
			$code = '$config';

			foreach ($exp as $level) {
				$code .= "['$level']";
			}
			eval("\$result = $code;");
			return $result;
		}

		if(isset($key) && isset($value)){

			$exp = explode(".", $key);
			$code = '$config';

			foreach ($exp as $level) {
				$code .= "['$level']";
			}

			if(preg_match('/(true|false|[\\d]+)/', $value) > 0){ 
				$code .= "['value'] = ".$value;
			} else{
				$code .= "['value'] = '".$value."'";
			}
			eval($code.";");
			Storage::disk('local')->put(config("app.config_dir"), json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ));

			return;
		}
	}
}