<?php
namespace SussexProjects\Http\Controllers\Auth;

use SussexProjects\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller{

	public function change(Request $request){

		if(!Auth::user()->isSupervisorOrSuperior()){
			abort(404);
		}

		if(request('auth_type') == 'supervisor_ug'){
			Session::put('auth_type', 'ug'); //ug, masters, department, system
			Session::put('db_type', 'ug');
			Session::put('auth_level', 'supervisor');
		}

		if(request('auth_type') == 'supervisor_masters'){
			Session::put('auth_type', 'masters'); //ug, masters, department, system
			Session::put('db_type', 'masters');
			Session::put('auth_level', 'supervisor');
		}

		if(request('auth_type') == 'admin_ug'){
			Session::put('auth_type', 'ug'); //ug, masters, department, system
			Session::put('db_type', 'ug');
			Session::put('auth_level', 'admin');
		}

		if(request('auth_type') == 'admin_masters'){
			Session::put('auth_type', 'masters');
			Session::put('db_type', 'masters');
			Session::put('auth_level', 'admin');
		}

		if(request('auth_type') == 'admin_system'){
			Session::put('auth_type', 'system');
			Session::put('auth_level', 'admin');
		}

		$msg = "Authentication changed to ".$this->getPrettyAuthName().".";

		session()->flash('message', $msg);
		session()->flash('message_type', 'success');
		return redirect()->action('HomeController@index');
	}

	public function getPrettyAuthName(){
		//todo: make this pretty 
		return Session::get('auth_type')." ".Session::get('auth_level');
	}

	public function show(){
		return view('auth.change-auth');
	}
}
