<?php
namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Db;
use SussexProjects\UserAgentString;

class UserAgentStringCollector{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		// vb = visited before cookie
		// 525600 = 1 year
		if(empty(Cookie::get('vb'))){
			DB::transaction(function ($request) use ($request) {
				$userAgentString = new UserAgentString;
				$userAgentString->user_agent = $request->header('User-Agent');
				$userAgentString->first_visit = "1";
				$userAgentString->save();
				Cookie::queue('vb', '1', 525600);
			});
		} else {
			DB::transaction(function ($request) use ($request) {
				$userAgentString = new UserAgentString;
				$userAgentString->user_agent = $request->header('User-Agent');
				$userAgentString->first_visit = "0";
				$userAgentString->save();
			});
		}
		return $next($request);
	}
}
