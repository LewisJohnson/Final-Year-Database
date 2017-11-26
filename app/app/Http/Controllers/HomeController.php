<?php
namespace SussexInformaticsProjects\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller{

	public function index(){
		return view('index');
	}

	public function help(){
		return view('help.help');
	}

	public function information(){
		return view('help.information');
	}

	public function about(){
		return view('help.about');
	}
}
