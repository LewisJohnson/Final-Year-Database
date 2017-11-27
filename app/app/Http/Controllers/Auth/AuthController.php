<?php

namespace SussexProjects\Http\Controllers\Auth;

use SussexProjects\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Session;
use Auth;
class AuthController extends Controller
{
        public function change(Request $request){
        Session::put('auth_type', $request->auth_type);
        
        if($request->auth_type === "ug_admin" || $request->auth_type === "ug_supervisor"){
        	Session::put('db_type', 'ug');
        } else {
        	Session::put('db_type', 'masters');
        }

        return redirect()->back()->with('message', 'Authentication changed.')->with('message_type', 'notification');
    }
}
