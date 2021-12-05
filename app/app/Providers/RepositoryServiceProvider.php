<?php

namespace SussexProjects\Providers;

use Illuminate\Support\ServiceProvider;
use SussexProjects\Repositories\ProjectRepository;
use SussexProjects\Interfaces\IProjectRepository;

class RepositoryServiceProvider extends ServiceProvider
{
	/**
	 * Bootstrap services.
	 *
	 * @return void
	 */
	public function boot()
	{
		//
	}

	/**
	 * Register services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->bind(IProjectRepository::class, ProjectRepository::class);
	}
}
