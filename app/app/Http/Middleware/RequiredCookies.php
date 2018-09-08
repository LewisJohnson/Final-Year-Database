<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Cookie;

class RequiredCookies{

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \Closure                 $next
	 *
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if(Cookie::get('accessibility_font') == null){
			Cookie::queue('accessibility_font', false, 525600);
		}

		if(Cookie::get('accessibility_contrast') == null){
			Cookie::queue('accessibility_contrast', false, 525600);
		}

		if(empty(Cookie::get('favourite_projects'))){
			Cookie::queue('favourite_projects', null, 525600);
		}

		if(Cookie::get('hide_archived') == null){
			Cookie::queue('hide_archived', false, 525600);
		}

		// TEMP COOKIES
		if(Cookie::get('seen_supervisor_notice') == null){
			Cookie::queue('seen_supervisor_notice', false, 525600);
		}

		return $next($request);
	}
}
