<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use SussexProjects\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB; // todo: Remove
use Illuminate\Support\Facades\Auth; // todo: Remove
use Illuminate\Support\Facades\Session; // todo: Remove
use SussexProjects\User; // todo: Remove

class LoginController extends Controller{
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

	/**
	 * Where to redirect users after login.
	 *
	 * @var string
	 */
	protected $redirectTo = '/';

	/**
	 * Create a new controller instance.
	 */
	public function __construct(){
		parent::__construct();
		$this->middleware('guest')->except('logout');
	}

	/**
	 * Show the application's login form.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function showLoginForm(){
		if(request()->path() == 'login'){
			return view('auth.login')->with('view', 'main');
		} else {
			return view('auth.login');
		}
	}

	/**
	 * Handle an authentication attempt.
	 *
	 * @return string
	 */
	public function username(){
		return 'username';
	}
}
