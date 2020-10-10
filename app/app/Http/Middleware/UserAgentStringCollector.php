<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cookie;
use SussexProjects\UserAgentString;

class UserAgentStringCollector{

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \Closure                 $next
	 *
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if(!get_config_json('user_agent.collect_user_agent.value')){
			return $next($request);
		}

		// Don't collect AJAX requests
		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
			return $next($request);
		}

		// Only collect GET requests
		if($_SERVER['REQUEST_METHOD'] !== 'GET'){
			return $next($request);
		}

		$userAgentString = new UserAgentString;
		$userAgentString->user_agent = $request->header('User-Agent');

		if(isset($_SERVER["HTTP_REFERER"]) && get_config_json('user_agent.collect_referrer.value')){
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
