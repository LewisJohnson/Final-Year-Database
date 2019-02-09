<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Auth;

class LdapGuest {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @param  string[]  ...$guards
	 * @return mixed
	 *
	 * @throws \Illuminate\Auth\AuthenticationException
	 */
	public function handle($request, Closure $next){
		if(ldap_guest() || Auth::check()){
			return $next($request);
		}

		return redirect()->action('HomeController@index');
	}
}
