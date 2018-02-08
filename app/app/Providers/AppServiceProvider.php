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
	public function boot()
	{
		Schema::defaultStringLength(191);
		View::share('user', Auth::user());

		Blade::directive('lang_sess', function($key) {
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
