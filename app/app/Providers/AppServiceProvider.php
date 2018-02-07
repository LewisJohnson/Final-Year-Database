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
			$key = trim($key, '"');

			if(Session::get("db_type") == "ug"){
				$key = '"messages_ug.'.$key.'"';
				return "<?php echo Lang::get($key); ?>";
			} elseif (Session::get("db_type") == "masters") {
				$key = '"messages_masters.'.$key.'"';
				return "<?php echo Lang::get($key); ?>";
			}

<<<<<<< HEAD
			if(config('app.debug')){
				return "#{INVALID USE OF SESSION STRING}";
			}
=======
			// if(App::debug()){
			// 	return "#{INVALID USE OF SESSION STRING}";
			// }
>>>>>>> origin/master
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
