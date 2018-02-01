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
		if (Auth::check() && Auth::user()->isSupervisorOrSuperior()){
			if(config('app.authorisation_access') == "strict" && Session::get('auth_level') != "supervisor"){
				abort(403, 'Forbidden action. Change your authentication before accessing this page.');
			}

			if(config('app.authorisation_access') == "warn" && Session::get('auth_level') != "supervisor"){
				session()->flash('message', 'Your access level is currently set to admin. Change authentication to supervisor to remove this warning.');
				session()->flash('message_type', 'warning');
			}

			return $next($request);
		}
		
		// We don't need students knowing the route exists 
		abort(404);
	}
}
