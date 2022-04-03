<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Middleware;

use Closure;
use Cookie;

class Accessibility
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
		if ($request->query("large_font") != null)
		{
			Cookie::queue('accessibility_font', $request->query("large_font"), 525600);

			if ($request->query("accessibility_font") == "true")
			{
				view()->share('enable_font', 'true');
			}
		}

		if ($request->query("high_contrast") != null)
		{
			Cookie::queue('accessibility_contrast', $request->query("high_contrast"), 525600);

			if ($request->query("high_contrast") == "true")
			{
				view()->share('enable_contrast', 'true');
			}
		}

		if ($request->query("dark_mode") != null)
		{
			Cookie::queue('accessibility_dark_mode', $request->query("dark_mode"), 525600);

			if ($request->query("dark_mode") == "true")
			{
				view()->share('enable_dark_mode', 'true');
			}
		}

		return $next($request);
	}
}
