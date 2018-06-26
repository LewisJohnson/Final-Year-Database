<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel{
	/**
	 * The application's global HTTP middleware stack.
	 * These middleware are run during every request to your application.
	 *
	 * @var array
	 */
	protected $middleware = [
		\Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
		\Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
		\SussexProjects\Http\Middleware\TrimStrings::class,
		\Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
		\SussexProjects\Http\Middleware\TrustProxies::class,

	];

	/**
	 * The application's route middleware groups.
	 *
	 * @var array
	 */
	protected $middlewareGroups = [
			'web' => [
				\SussexProjects\Http\Middleware\EncryptCookies::class,
				\Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
				\Illuminate\Session\Middleware\StartSession::class,
				\Illuminate\Session\Middleware\AuthenticateSession::class,
				\Illuminate\View\Middleware\ShareErrorsFromSession::class,
				\SussexProjects\Http\Middleware\VerifyCsrfToken::class,
				\Illuminate\Routing\Middleware\SubstituteBindings::class,
				\SussexProjects\Http\Middleware\RequiredCookies::class,
				\SussexProjects\Http\Middleware\Language::class,
				\SussexProjects\Http\Middleware\Accessibility::class,
				\SussexProjects\Http\Middleware\UserAgentStringCollector::class,
				\SussexProjects\Http\Middleware\SetDepartment::class,
				\SussexProjects\Http\Middleware\SetEducationLevel::class
			],

			'api' => ['throttle:5,1', 'bindings']
		];

	/**
	 * The application's route middleware.
	 * These middleware may be assigned to groups or used individually.
	 *
	 * @var array
	 */
	protected $routeMiddleware = [
		'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
		'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
		'admin' => \SussexProjects\Http\Middleware\Admin::class,
		'adminPrivilegeCheck' => \SussexProjects\Http\Middleware\AdminPrivilegeCheck::class,
		'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
		'can' => \Illuminate\Auth\Middleware\Authorize::class,
		'checkDepartment' => \SussexProjects\Http\Middleware\DepartmentCheck::class,
		'guest' => \SussexProjects\Http\Middleware\RedirectIfAuthenticated::class,
		'ldapGuest' => \SussexProjects\Http\Middleware\LdapGuest::class,
		'projectAdministrator' => \SussexProjects\Http\Middleware\ProjectAdmin::class,
		'systemAdministrator' => \SussexProjects\Http\Middleware\SystemAdmin::class,
		'supervisor' => \SussexProjects\Http\Middleware\Supervisor::class,
		'student' => \SussexProjects\Http\Middleware\Student::class,
		'staffOrProjectAdmin' => \SussexProjects\Http\Middleware\StaffOrProjectAdmin::class,
		'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
	];
}
