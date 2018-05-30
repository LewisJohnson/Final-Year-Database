<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Session;

class SuccessfulLogin{
	/**
	 * Create the event listener.
	 */
	public function __construct(){
	}

	/**
	 * Handles a successful login event.
	 *
	 * @param  Login $event
	 *
	 * @return void
	 */
	public function handle(Login $event){
		// todo: CHECK WITH IDAP to see if they are guest
		// todo: Set education level with IDAP

		// Set education level
		Session::put('education_level', current($event->user->allowedEducationLevel()));

		// Set users last login and save
		$event->user->last_login = new Carbon;
		$event->user->save();
	}
}
