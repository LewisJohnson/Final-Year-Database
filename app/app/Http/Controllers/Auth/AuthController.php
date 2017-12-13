<?php
namespace SussexProjects\Http\Controllers\Auth;

use SussexProjects\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Session;
use Auth;

class AuthController extends Controller{

		public function change(Request $request){
			Session::put('auth_type', $request->auth_type);
			
			if($request->auth_type === "admin_ug" || $request->auth_type === "ug_supervisor"){
				Session::put('db_type', 'ug');
			} else {
				Session::put('db_type', 'masters');
			}

			session()->flash('message', 'Authentication changed.');
			session()->flash('message_type', 'success');
			return redirect('/index');
		}

		public function show(){
			return view('auth.change-auth');
		}
}
