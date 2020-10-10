<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use SussexProjects\Mode;

class Student
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
		if (Auth::check() && Auth::user()->isStudent())
		{
			if (Auth::user()->active_year != Mode::getProjectYear())
			{
				return abort(403, "You are not part of the current project year. If you think this is a mistake, contact an administrator.");
			}

			return $next($request);
		}

		return abort(404);
	}
}
