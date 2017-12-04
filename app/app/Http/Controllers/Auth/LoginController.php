<?php

namespace SussexProjects\Http\Controllers\Auth;

use SussexProjects\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Carbon;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    protected $username = 'username';

    /**
     * Create a new controller instance.
     *
     * @return void
     */ 
    public function __construct(){
        $this->middleware('guest')->except('logout');
    }

    protected function redirectTo(){
        return '/authChange';
    }
}
