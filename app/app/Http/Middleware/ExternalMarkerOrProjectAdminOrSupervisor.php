<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class ExternalMarkerOrProjectAdminOrSupervisor
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \Closure                 $next
	 *
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if(Auth::check()){
			if(Auth::user()->isExternalMarker() || Auth::user()->isAdminOfEducationLevel() || Auth::user()->isSupervisor()){
				return $next($request);
			}
		}

		return abort(404);
	}
}
