<?php

namespace SussexProjects\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Carbon;
use Session;
use Cookie;

class SuccessfulLogin
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Login  $event
     * @return void
     */
    public function handle(Login $event){
        Session::start();
        Session::put('db_type', "ug");
        Session::put('auth_type', $event->user->access_type);

        if(empty(Cookie::get('fp'))){
            Cookie::queue('fp', 'none', 525600);
        }

        $event->user->last_login = new Carbon;
        $event->user->save();
    }
}
