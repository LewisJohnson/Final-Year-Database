<?php
namespace SussexInformaticsProjects\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;

class Admin_Ug
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
        if (Auth::check() && Auth::user()->isUgAdmin()){
            return $next($request);
        }
        return redirect('/');
    }
}
