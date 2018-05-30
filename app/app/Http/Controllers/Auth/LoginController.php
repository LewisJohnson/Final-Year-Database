<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use SussexProjects\Http\Controllers\Controller;

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
	protected $redirectTo = '/home';

	/**
	 * Create a new controller instance.
	 */
	public function __construct(){
		parent::__construct();
		$this->middleware('guest')->except('logout');
	}

	/**
	 * Handle an authentication attempt.
	 *
	 * @return string
	 */
	public function username(){
		$login = request()->input('username');
		$field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
		request()->merge([$field => $login]);

		return $field;
	}
}
