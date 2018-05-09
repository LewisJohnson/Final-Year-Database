<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class SetEducationLevel{

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if(!Auth::check()){
			return $next($request);
		}

		// Check to see if query param is set
		if($request->query("educationLevel") != null){
			// Check to see if they are allowed in this education level
			if(in_array($request->query("educationLevel"), Auth::user()->allowedEducationLevel(true))){
				// Check to see if the education level is valid
				// We can't use in_array because we need the value to put into the session data
				foreach (get_education_levels() as $key => $level) {
					if($request->query("educationLevel") == $level["shortName"]){
						Session::put("education_level", $level);
					}
				}
			}
		}
		return $next($request);
	}
}