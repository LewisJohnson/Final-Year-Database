<?php

namespace SussexProjects\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
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
        ],

        'api' => [
            //todo: change throttle to lower (5)
            'throttle:60,1',
            'bindings',
        ],

        'masters' => [
            'SussexProjects\Http\Middleware\Admin_Masters',
            'SussexProjects\Http\Middleware\Supervisor_Masters',
            'SussexProjects\Http\Middleware\Student_Masters',
        ],

        'ug' => [
            'SussexProjects\Http\Middleware\Admin_Ug',
            'SussexProjects\Http\Middleware\Supervisor_Ug',
            'SussexProjects\Http\Middleware\Student_Ug',
        ],
    ];

    /**
     * The application's route middleware.
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \SussexProjects\Http\Middleware\RedirectIfAuthenticated::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,

        'Admin_Masters' => 'SussexProjects\Http\Middleware\Admin_Masters',
        'Supervisor_Masters' => 'SussexProjects\Http\Middleware\Supervisor_Masters',
        'Student_Masters' => 'SussexProjects\Http\Middleware\Studen_Masters',

        'Admin_Ug' => 'SussexProjects\Http\Middleware\Admin_Ug',
        'Supervisor_Ug' => 'SussexProjects\Http\Middleware\Supervisor_Ug',
        'Student_Ug' => 'SussexProjects\Http\Middleware\Student_Ug',
    ];
}
