<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Session;

/**
 * Successful login is called after a successful login event has occurred.
 */
class SuccessfulLogin
{

	/**
	 * Create the event listener.
	 */
	public function __construct()
	{
	}

	/**
	 * Sets the users education level and updates their last login time.
	 *
	 *
	 * @param  Login  $event
	 * @return void
	 */
	public function handle(Login $event)
	{
		// Set education level
		Session::put('education_level', current($event->user->allowedEducationLevel()));

		// Set users last login and save
		$event->user->last_login = new Carbon();
		$event->user->save();
	}
}
