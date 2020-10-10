<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * The controller to be inherited by all other controllers.
 * Includes properties and constants needed for all controllers.
 */
class Controller extends BaseController
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	/**
	 * The amount of items to show per page (If result is paginated).
	 *
	 * @var int
	 */
	public $paginationCount;

	/**
	 * @return mixed
	 */
	public function __construct()
	{

		$this->middleware(function ($request, $next)
		{
			return $next($request);
		});
	}
}
