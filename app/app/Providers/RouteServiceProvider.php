<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider{
	/**
	 * This namespace is applied to your controller routes.
	 * In addition, it is set as the URL generator's root namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'SussexProjects\Http\Controllers';

	/**
	 * Define your route model bindings, pattern filters, etc.
	 *
	 * @return void
	 */
	public function boot(){
		parent::boot();
	}

	/**
	 * Define the routes for the application.
	 *
	 * @return void
	 */
	public function map(){
		$this->mapApiRoutes();

		$this->mapWebRoutes();

		//
	}

	/**
	 * Define the "api" routes for the application.
	 * These routes are typically stateless.
	 *
	 * @return void
	 */
	protected function mapApiRoutes(){
		Route::prefix('api')->middleware('api')->namespace($this->namespace)
			->group(base_path('routes/api.php'));
	}

	/**
	 * Define the "web" routes for the application.
	 * These routes all receive session state, CSRF protection, etc.
	 *
	 * @return void
	 */
	protected function mapWebRoutes(){
		Route::middleware('web')->namespace($this->namespace)
			->group(base_path('routes/web.php'));
	}
}
