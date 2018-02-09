<?php
namespace SussexProjects\Http\Middleware;

use Auth;
use Closure;
use Session;

class SystemAdmin
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if (Auth::check() && Auth::user()->isSystemAdmin()){
				return $next($request);
		}

		abort(404);
	}
}