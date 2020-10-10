<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
Use Session;
use Illuminate\Support\Facades\Auth;

class ProjectAdmin{

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \Closure                 $next
	 *
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if(Auth::check() && Auth::user()->isAdminOfEducationLevel(get_el_short_name())){
			return $next($request);
		}

		// We don't need students knowing the route exists
		return abort(404);
	}
}
