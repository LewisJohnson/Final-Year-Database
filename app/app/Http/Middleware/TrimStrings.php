<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */

namespace SussexProjects\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrimStrings as Middleware;

class TrimStrings extends Middleware{
	/**
	 * The names of the attributes that should not be trimmed.
	 *
	 * @var array
	 */
	protected $except = ['password', 'password_confirmation'];
}
