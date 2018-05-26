<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider{
	/**
	 * Bootstrap any application services.
	 *
	 * @return void
	 */
	public function boot(){
		Broadcast::routes();

		require base_path('routes/channels.php');
	}
}
