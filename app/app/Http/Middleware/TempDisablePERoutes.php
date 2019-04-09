<?php

namespace SussexProjects\Http\Middleware;

use Closure;

class TempDisablePERoutes
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		return redirect('/not-ready');
	}
}
