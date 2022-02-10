<?php

namespace SussexProjects\Providers;

use Illuminate\Support\ServiceProvider;
use SussexProjects\Interfaces\IFactoryRepository;
use SussexProjects\Repositories\FactoryRepository;

class RepositoryServiceProvider extends ServiceProvider
{
	/**
	 * Register services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->bind(IFactoryRepository::class, FactoryRepository::class);
	}
}
