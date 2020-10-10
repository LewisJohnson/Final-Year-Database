<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider{
	/**
	 * The policy mappings for the application.
	 *
	 * @var array
	 */
	protected $policies = ['SussexProjects\Model' => 'SussexProjects\Policies\ModelPolicy'];

	/**
	 * Register any authentication / authorization services.
	 *
	 * @return void
	 */
	public function boot(){
		$this->registerPolicies();

		//
	}
}
