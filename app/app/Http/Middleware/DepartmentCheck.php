<?php
namespace SussexProjects\Http\Middleware;

use Closure;
use Session;

class DepartmentCheck{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if(Session::get("department") !== null){
			return $next($request);
		} else {
			if($request->path() !== 'set-department'){
				return redirect('set-department');
			} else {
				return $next($request);
			}
		}
	}
}
