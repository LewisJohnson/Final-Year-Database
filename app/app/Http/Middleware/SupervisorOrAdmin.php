<?php
namespace SussexProjects\Http\Middleware;

use Auth;
use Closure;
use Session;

class SupervisorOrAdmin{
	
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if (Auth::check()){
			if(Auth::user()->isSupervisor() || Auth::user()->isSystemAdmin() || Auth::user()->isProjectAdmin()){
				return $next($request);
			}
		}

		abort(404);
	}
}
