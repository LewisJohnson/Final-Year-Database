<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class ProjectAdmin
{

	/**
	 * Handle an incoming request.
	 *
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @param  \Closure                 $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		if (Auth::check() && Auth::user()->isAdminOfEducationLevel())
		{
			return $next($request);
		}

		// We don't need students knowing the route exists
		return abort(404);
	}
}
