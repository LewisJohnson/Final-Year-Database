<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use SussexProjects\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use SussexProjects\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
	 * Get the login attempt request.
	 *
	 * @param \Illuminate\Http\Request  $request
	 * @return boolean Successful login
	 */
	protected function attemptLogin(Request $request){
		Session::forget('ldap_guest');

		// If they entered an email, retrieve their username
		if (preg_match('/@/', $request->input('username'))){
			$parts = explode("@", $request->input('username'));
			$username = $parts[0];
		} else {
			$username = $request->input('username');
		}

		$ldapUsername = $username.env('LDAP_HOST');
		$ldapPassword = $request->input('password');
		$ldapUrl = env('LDAP_URL');

		$ldapConn = ldap_connect($ldapUrl) or die("Could not connect to LDAP server.");
		ldap_set_option($ldapConn, LDAP_OPT_PROTOCOL_VERSION, 3);
		ldap_set_option($ldapConn, LDAP_OPT_REFERRALS, 0);

		if($ldapConn){
			$ldapbind = @ldap_bind($ldapConn, $ldapUsername, $ldapPassword);
			if ($ldapbind){
				ldap_unbind($ldapConn);

				$user = User::where('username', $username)->first();

				if($user == null){
					Session::put('ldap_guest', true);
					Session::put('education_level', current(User::guestEducationLevel()));
					session()->flash('ldap_guest_message', true);
					session()->flash('message', 'Logged in as guest.');
					session()->flash('message_type', 'success');
				} else {
					Auth::login($user, $request->filled('remember'));
					Session::put('education_level', current($user->allowedEducationLevel()));
				}

				return true;
			}
		}

		return false;
	}

	/**
	 * Get the failed login response instance.
	 *
	 * @param \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	protected function sendFailedLoginResponse(Request $request){
		return response()->json(array(
			'successful' => false, 
			'message' => 'Incorrect username and/or password.'
		));
	}

	/**
	 * Get the successful login response instance.
	 *
	 * @param \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	protected function authenticated(Request $request, $user){
		if(Session::get('after_login') != null){
			$url = url(Session::get('after_login'));
			Session::forget('after_login');
		}

		if(!empty($url)){
			return response()->json(array(
				'successful' => true,
				'url' => $url
			));
		}

		return response()->json(array(
			'successful' => true
		));
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
