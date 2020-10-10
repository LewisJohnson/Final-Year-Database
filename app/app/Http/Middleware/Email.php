<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;

class Email{

	public function handle($request, Closure $next){
		// Check to see if query param is set
		if($request->query('utm_medium') != null){
			if($request->query('utm_medium') == 'email'){
				Session::put('after_login', $request->getPathInfo());
			}
		}

		return $next($request);
	}
}
