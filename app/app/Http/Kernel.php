<?php

namespace SussexInformaticsProjects\Http;

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
        \SussexInformaticsProjects\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
        \SussexInformaticsProjects\Http\Middleware\TrustProxies::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
            \SussexInformaticsProjects\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\Session\Middleware\AuthenticateSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \SussexInformaticsProjects\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            //todo: change throttle to lower (5)
            'throttle:60,1',
            'bindings',
        ],

        'masters' => [
            'SussexInformaticsProjects\Http\Middleware\Admin_Masters',
            'SussexInformaticsProjects\Http\Middleware\Supervisor_Masters',
            'SussexInformaticsProjects\Http\Middleware\Student_Masters',
        ],

        'ug' => [
            'SussexInformaticsProjects\Http\Middleware\Admin_Ug',
            'SussexInformaticsProjects\Http\Middleware\Supervisor_Ug',
            'SussexInformaticsProjects\Http\Middleware\Student_Ug',
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
        'guest' => \SussexInformaticsProjects\Http\Middleware\RedirectIfAuthenticated::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,

        'Admin_Masters' => 'SussexInformaticsProjects\Http\Middleware\Admin_Masters',
        'Supervisor_Masters' => 'SussexInformaticsProjects\Http\Middleware\Supervisor_Masters',
        'Student_Masters' => 'SussexInformaticsProjects\Http\Middleware\Studen_Masters',

        'Admin_Ug' => 'SussexInformaticsProjects\Http\Middleware\Admin_Ug',
        'Supervisor_Ug' => 'SussexInformaticsProjects\Http\Middleware\Supervisor_Ug',
        'Student_Ug' => 'SussexInformaticsProjects\Http\Middleware\Student_Ug',
    ];
}
