<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Cookie;

class Accessibility{
	
	/**
	 * Handle an incoming request.
	 *
	 * 
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if($request->query("largeFont") != null){
			Cookie::queue('accessibility-font', $request->query("largeFont"), 525600);
		}

		if($request->query("highContrast") != null){
			Cookie::queue('accessibility-contrast', $request->query("highContrast"), 525600);
		}

		return $next($request);
	}
}
