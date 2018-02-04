<?php
namespace SussexProjects\Http\Middleware;

use Auth;
use Closure;
use Session;

class Admin{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){

		if (Auth::check() && Auth::user()->isSupervisorOrSuperior()){
			if(config_json('system.authorisation_access.value') === "strict" && Session::get('auth_level') != "admin"){
				abort(403, 'Forbidden action. Change your authentication before accessing this page.');
			}

			if(config_json('system.authorisation_access.value') === "warn" && Session::get('auth_level') != "admin"){
				session()->flash('message', 'Your access level is currently set to '.Session::get('auth_level').'. Change authentication to admin to remove this warning.');
				session()->flash('message_type', 'warning');
			}

			return $next($request);
		}

		// We don't need students knowing the route exists 
		abort(404);
	}
}
