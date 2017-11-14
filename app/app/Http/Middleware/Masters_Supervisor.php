<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;
use Closure;

class Masters_Supervisor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
        // if ( Auth::check() && Auth::user()->isMastersSupervisor()){
        //     return $next($request);
        // }
return $next($request);
        return redirect('/');
    }
}
