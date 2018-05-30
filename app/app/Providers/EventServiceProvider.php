<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider{
	/**
	 * The event listener mappings for the application.
	 *
	 * @var array
	 */
	protected $listen = ['Illuminate\Auth\Events\Login' => ['SussexProjects\Listeners\SuccessfulLogin']];

	/**
	 * Register any events for your application.
	 *
	 * @return void
	 */
	public function boot(){
		parent::boot();
	}
}
