<?php

namespace SussexProjects\Http\Middleware;

use Closure;
use Session;
	
class SetEducationLevel{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){

		if($request->query("educationLevel") != null){
			if(in_array($request->query("educationLevel"), education_levels(true))){
				Session::put("education_level", $request->query("educationLevel"));
			}
		}

		return $next($request);
	}
}
