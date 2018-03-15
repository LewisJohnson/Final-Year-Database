<?php
namespace SussexProjects\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;
use Session;

class Supervisor{
	
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if (Auth::check() && Auth::user()->isSupervisor()){
			return $next($request);
		}

		// We don't need students knowing the route exists
		abort(404);
	}
}
