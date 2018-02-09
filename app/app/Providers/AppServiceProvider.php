<?php

namespace SussexProjects\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Session;
use App;
class AppServiceProvider extends ServiceProvider
{
	/**
	 * Bootstrap any application services.
	 *
	 * @return void
	 */
	public function boot(){
		Schema::defaultStringLength(191);
		View::share('user', Auth::user());


		Blade::directive('lang_sess', function($key) {
			/*
			| WARNING
			|
			| Laravel will cache views which use @lang_sess. 
			| This means it may take some time for cached views to update.
			| This is okay for some views, but others will have to use the
			| lang_sess PHP helper function.
			|
			*/

			$key = str_replace('"', '',$key);
			$key = str_replace('\'', '',$key);
			$key = '"messages_'.Session::get("db_type").'.'.$key.'"';
			return "<?php echo Lang::get($key); ?>";
		});
	}

	/**
	 * Register any application services.
	 *
	 * @return void
	 */
	public function register()
	{
		//
	}
}
