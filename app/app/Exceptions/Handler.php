<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Exceptions;

use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
	/**
	 * A list of the exception types that are not reported.
	 *
	 * @var array
	 */
	protected $dontReport = [];

	/**
	 * A list of the inputs that are never flashed for validation exceptions.
	 *
	 * @var array
	 */
	protected $dontFlash = ['password', 'password_confirmation'];

	/**
	 * Report or log an exception.
	 * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
	 *
	 *
	 * @param  \Exception $exception
	 * @return void
	 */
	public function report(Exception $exception)
	{
		parent::report($exception);
	}

	/**
	 * Render an exception into an HTTP response.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @param  \Exception                  $exception
	 * @return \Illuminate\Http\Response
	 */
	public function render($request, Exception $exception)
	{
		if ($exception && !env('APP_DEBUG'))
		{
			if ($exception instanceof \Illuminate\Database\QueryException || $exception instanceof \Illuminate\Database\PDOException)
			{
				session()->flash('message', 'Sorry, an SQL error occurred. Please try again.');
				session()->flash('message_type', 'error');

				if ($request->isMethod('post') && isset($_SERVER['HTTP_REFERER']))
				{
					return redirect($_SERVER['HTTP_REFERER']);
				}
				else
				{
					return redirect('/');
				}
			}
		}

		return parent::render($request, $exception);
	}
}
