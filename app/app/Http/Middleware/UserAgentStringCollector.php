<?php
namespace SussexProjects\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Db;
use SussexProjects\UserAgentString;
use Closure;

class UserAgentStringCollector{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if(!config_json('user_agent.collect_user_agent.value')){
			return $next($request);
		}

		// Don't collect AJAX requests
		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			return $next($request);
		}

		// Only collect GET requests
		if($_SERVER['REQUEST_METHOD'] !== 'GET'){
			return $next($request);
		}

		$userAgentString = new UserAgentString;
		$userAgentString->user_agent = $request->header('User-Agent');

		if(isset($_SERVER["HTTP_REFERER"]) && config_json('user_agent.collect_referrer.value')){
			$ref = mb_convert_encoding($_SERVER["HTTP_REFERER"], 'UTF-8', 'UTF-8');
			$ref = htmlentities($ref, ENT_QUOTES, 'UTF-8');
			$userAgentString->referrer = $ref;
		}

		if(empty(Cookie::get('vb'))){
			$userAgentString->first_visit = "1";
			Cookie::queue('vb', '1', 525600);
		} else {
			$userAgentString->first_visit = "0";
		}

		$userAgentString->save();
		return $next($request);
	}
}
