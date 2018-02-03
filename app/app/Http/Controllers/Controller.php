<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Auth;
use View;

class Controller extends BaseController
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	// The amount of paginated items per page
	public $paginationCount;
	public $restoreTimeInMinutes;
	public $user;

	public function __construct(){
		$this->paginationCount = 25;
		$this->restoreTimeInMinutes = 60;
		$this->middleware(function($request, $next) {
			$this->user = Auth::user();
			view()->share('user', $this->user);
			return $next($request);
		});
	}
}
