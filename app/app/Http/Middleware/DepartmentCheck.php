<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;

class DepartmentCheck{
	
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
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
