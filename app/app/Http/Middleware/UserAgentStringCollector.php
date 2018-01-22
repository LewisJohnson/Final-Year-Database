<?php
namespace SussexProjects\Http\Middleware;

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

		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
			// Don't collect AJAX requests
			return $next($request);
		}
		// 525600 = 1 year
		if(empty(Cookie::get('vb'))){
			DB::transaction(function ($request) use ($request) {
				$userAgentString = new UserAgentString;
				$userAgentString->user_agent = $request->header('User-Agent');
				$userAgentString->first_visit = "1";
				if(isset($_SERVER["HTTP_REFERER"])){
					$userAgentString->referrer = $_SERVER["HTTP_REFERER"];
				}
				$userAgentString->save();
				Cookie::queue('vb', '1', 525600);
			});
		} else {
			DB::transaction(function ($request) use ($request) {
				$userAgentString = new UserAgentString;
				$userAgentString->user_agent = $request->header('User-Agent');
				$userAgentString->first_visit = "0";
				if(isset($_SERVER["HTTP_REFERER"])){
					$userAgentString->referrer = $_SERVER["HTTP_REFERER"];
				}
				$userAgentString->save();
			});
		}
		return $next($request);
	}
}
