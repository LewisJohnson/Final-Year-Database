<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;

class RedirectIfAuthenticated{
	
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @param  string|null  $guard
	 * @return mixed
	 */
	public function handle($request, Closure $next, $guard = null){
		if (Auth::guard($guard)->check()) {
			return redirect()->action('HomeController@index');
		}
		return $next($request);
	}
}
