<?php

/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use SussexProjects\Transaction;
use Log;

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

	/**
	 * Call when a user is unauthorised to perform an action.
	 * The action will be logged.
	 * 
	 * @param mixed $class You must pass __METHOD__
	 * 
	 * @return [type]
	 */
	protected function unauthorised($class)
	{
		$user = Auth::user();

		Log::alert(
			"A user tried to perform an action they are unauthorised to.",
			[
				'class' => $class,
				'user-id' => $user->id,
				'user-full-name' => $user->getFullName()
			]
		);

		session()->flash('message', 'Sorry, you are not allowed to perform this action.');
		session()->flash('message_type', 'error');
		return redirect()->action('HomeController@index');
	}

	/**
	 * 
	 * Logs an error and redirects to the homepage.
	 * 
	 * @param mixed $class You must pass __METHOD__
	 * @param mixed $errorMessage The error message
	 * 
	 * @return [type]
	 */
	protected function logError($class, $errorMessage)
	{
		$user = Auth::user();

		Log::error(
			$errorMessage,
			[
				'class' => $class,
				'user-id' => $user->id,
				'user-full-name' => $user->getFullName()
			]
		);

		session()->flash('message', 'An error has occurred (' . $errorMessage . ') ');
		session()->flash('message_type', 'error');
		return redirect()->action('HomeController@index');
	}

	/**
	 * 
	 * Logs an error and DOES NOT redirect.
	 * 
	 * @param mixed $class You must pass __METHOD__
	 * @param mixed $errorMessage The error message
	 * @param array $context Objects to use as log context
	 * 
	 * @return [type]
	 */
	protected function logInfo($class, $message, $context = [])
	{
		$user = Auth::user();

		$con = [
			'class' => $class,
			'user-id' => $user->id,
			'user-full-name' => $user->getFullName()
		];

		if (!empty($context))
		{
			$con = array_merge($con, $context);
		}

		Log::info($message, $con);
	}

	/**
	 * 
	 * Logs a transaction to the database
	 * 
	 * @param mixed $type The transaction type (e.g. 'Project', 'Evaluation')
	 * @param mixed $action The transaction action (e.g. 'Added', 'Updated')
	 * 
	 * @return [type]
	 */
	protected function logAdminTransaction($type, $action)
	{
		$transaction = new Transaction();

		$transaction->fill(array(
			'type'             => $type,
			'action'           => $action,
			'admin'            => Auth::user()->id,
			'transaction_date' => new Carbon()
		));

		$transaction->save();
	}
}
