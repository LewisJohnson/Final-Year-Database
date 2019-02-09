<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;

class CheckDepartment{

	/**
	 * This middleware checks to see if a department is set.
	 * Redirects if it is not
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \Closure                 $next
	 *
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if(Session::get("department") !== null){
			return $next($request);
		} else {
			if($request->path() !== 'set-department'){
				return redirect('set-department');
			} else {
				return $next($request);
			}
		}
	}
}
