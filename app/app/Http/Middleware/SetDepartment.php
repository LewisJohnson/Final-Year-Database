<?php

/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */
namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;

class SetDepartment{
	/**
	 * Handle an incoming request.
	 * This middleware is mainly for emails, so we can link to a set department
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \Closure                 $next
	 *
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		// Check to see if query param is set
		if($request->query("department") != null){
			$departments = get_departments();
			// Check to see if departments exists
			if(in_array($request->query("department"), $departments)){
				Session::put("department", $request->query("department"));
			}
		}

		return $next($request);
	}
}
