<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller{

	public function index(Request $request){
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
