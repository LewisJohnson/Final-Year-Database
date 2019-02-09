<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
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
