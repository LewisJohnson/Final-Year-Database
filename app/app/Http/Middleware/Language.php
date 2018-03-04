<?php
namespace SussexProjects\Http\Middleware;

use Closure;
use Session;
use App;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;

class Language {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next){
		if(Session::has('department')){
			App::setLocale(Session::get('department'));
		}
		return $next($request);
	}
}