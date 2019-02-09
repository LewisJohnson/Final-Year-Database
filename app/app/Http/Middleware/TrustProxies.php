<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Middleware;

use Fideloper\Proxy\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware{

	/**
	 * The trusted proxies for this application.
	 *
	 * @var array
	 */
	protected $proxies;

	/**
	 * The current proxy header mappings.
	 *
	 * @var array
	 */
	protected $headers = Request::HEADER_X_FORWARDED_ALL;
}
