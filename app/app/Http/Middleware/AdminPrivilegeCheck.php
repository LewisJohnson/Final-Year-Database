<?php
namespace SussexProjects\Http\Middleware;

use Closure;
use Session;
use Auth;

class AdminPrivilegeCheck{
	
	/**
	 * This middleware checks if the project admin is allowed to perform the current task.
	 * 
	 * This is needed because if an admin is also a supervisor, they are allowed to access
	 * all education levels (e.g. undergraduate and postgraduate), therefore they can 
	 * perform post and undergraduate tasks, without this middleware.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if (Auth::check()){
			if(Auth::user()->isAdminOfEducationLevel(Session::get('education_level'))){
				return $next($request);
			}
		}
		
		return abort(403, 'You are not allowed to perform this action');
	}
}
