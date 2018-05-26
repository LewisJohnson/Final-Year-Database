<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Providers;

use App;
use DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider{
	/**
	 * Bootstrap any application services.
	 *
	 * @return void
	 */
	public function boot(){
		Schema::defaultStringLength(191);
	}

	/**
	 * Register any application services.
	 *
	 * @return void
	 */
	public function register(){
		//
	}
}
