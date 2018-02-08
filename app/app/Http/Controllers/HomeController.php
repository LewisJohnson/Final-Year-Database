<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller{

	public function index(Request $request){
		if($request->query("largeFont") == "true"){
			Cookie::queue('largeFont', "true", 525600);
		}
		if($request->query("largeFont") == "false"){
			Cookie::queue('largeFont', "false", 525600);
		}

		if($request->query("highContrast") == "true"){
			Cookie::queue('highContrast', "true", 525600);
		}

		if($request->query("highContrast") == "false"){
			Cookie::queue('highContrast', "false", 525600);
		}

		return view('index');
	}

	public function help(Request $request){
		return view('help.help');
	}

	public function information(Request $request){
		return view('help.information');
	}

	public function about(Request $request){
		return view('help.about');
	}

	public function noJs(Request $request){
		return view('no-js');
	}

	public function seenCookieBanner(){
		Cookie::queue('cookie-banner-seen', "true", 525600);
	}

	public function setDatabaseType(Request $request){
		if($request->db_type == "ug"){
			Session::put("db_type", "ug");
			return redirect()->action('HomeController@index');
		}

		if($request->db_type == "masters"){
			Session::put("db_type", "masters");
			return redirect()->action('HomeController@index');
		}
		return abort(400, "Invalid Request.");
	}
}
