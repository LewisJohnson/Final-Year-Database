<?php
namespace SussexProjects\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;

class SuccessfulLogin
{
	/**
	 * Create the event listener.
	 *
	 * @return void
	 */
	public function __construct(){}

	/**
	 * Handle the event.
	 *
	 * @param  Login  $event
	 * @return void
	 */
	public function handle(Login $event){
		if($event->user->isStudent()){
			Session::put('db_type', $event->user->studentType());

			if(empty(Cookie::get('favourite_projects'))){
				Cookie::queue('favourite_projects', null, 525600);
			}
		} else {
			// Just as a default
			Session::put('db_type', 'ug');
		}

		$event->user->last_login = new Carbon;
		$event->user->save();
	}
}
