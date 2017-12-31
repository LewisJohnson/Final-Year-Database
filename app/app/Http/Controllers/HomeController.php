<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Db;
use SussexProjects\UserAgentString;

class HomeController extends Controller{

	public function index(Request $request){
		// vb = visited before cookie
		// 525600 = 1 year
		if(empty(Cookie::get('vb'))){
			DB::transaction(function ($request) use ($request) {
				$userAgentString = new UserAgentString;
				$userAgentString->user_agent = $request->header('User-Agent');
				$userAgentString->first_visit = "1";
				$userAgentString->save();
				Cookie::queue('vb', '1', 525600);
			});

		} else {
			DB::transaction(function ($request) use ($request) {
				$userAgentString = new UserAgentString;
				$userAgentString->user_agent = $request->header('User-Agent');
				$userAgentString->first_visit = "0";
				$userAgentString->save();
			});
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

}
