<?php
namespace SussexProjects\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;

class SupervisorOrSuperior
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if (Auth::check() && Auth::user()->isSupervisorOrSuperior()){
			return $next($request);
		}
		return redirect('/');
	}
}
