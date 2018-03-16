<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;
	
class SetEducationLevel{

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){

		// Check if they are allowed
		if($request->query("educationLevel") != null){
			if(in_array($request->query("educationLevel"), get_education_levels(true))){
				Session::put("education_level", $request->query("educationLevel"));
			}
		}
		return $next($request);
	}
}
