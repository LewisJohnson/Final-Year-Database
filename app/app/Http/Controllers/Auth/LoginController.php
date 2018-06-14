<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
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
	protected $redirectTo = '/';

	/**
	 * Create a new controller instance.
	 */
	public function __construct(){
		parent::__construct();
		$this->middleware('guest')->except('logout');
	}

	protected function attemptLogin(Request $request){
		// If they entered an email, retrieve their username
		if (preg_match('/@/', $request->input('username'))){
			$parts = explode("@", $request->input('username'));
			$username = $parts[0];
		} else {
			$username = $request->input('username');
		}

		$userDN = $username."@ad.susx.ac.uk";
		$password = $request->input('password');
		$ldapUrl = env('LDAP_URL');

		$ds = ldap_connect($ldapUrl);
		ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
		ldap_set_option($ds, LDAP_OPT_REFERRALS, 0);

		if ($status = @ldap_bind($ds, $userDN, $password)) {

			ldap_unbind($ds);

			$user = User::where('username', $username)->first();

			if($user == null){
				Auth::loginUsingId('guest');
				Session::put('is-guest', true);
			} else {
				Auth::login($user, $request->filled('remember'));
			}
		} else {
			ldap_unbind($ds);
		}

		return redirect()->intended();
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
		$login = request()->input('username');
		$field = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
		request()->merge([$field => $login]);

		return $field;
	}
}
