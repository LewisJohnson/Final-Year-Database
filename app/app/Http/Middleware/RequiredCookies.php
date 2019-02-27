<?php
/**
 * Copyright (C) University of Sussex 2019.
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

		// View: All
		// Action: Toggles accessible font
		if(Cookie::get('accessibility_font') == null){
			Cookie::queue('accessibility_font', false, 525600);
		}

		// View: All
		// Action: Toggles accessible contrast
		if(Cookie::get('accessibility_contrast') == null){
			Cookie::queue('accessibility_contrast', false, 525600);
		}

		// View: Home (Student), Project (Student)
		// Action: A list of favourite projects
		if(empty(Cookie::get('favourite_projects'))){
			Cookie::queue('favourite_projects', null, 525600);
		}

		// View: My Projects 
		// Action: Toggles the display of archived projects
		if(Cookie::get('mp_hide_archived') == null){
			Cookie::queue('mp_hide_archived', true, 525600);
		}

		// View: My Projects 
		// Action: Toggles the display of archived projects
		if(Cookie::get('sr_hide_closed') == null){
			Cookie::queue('sr_hide_closed', true, 525600);
		}

		return $next($request);
	}
}
