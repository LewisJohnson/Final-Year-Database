<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;

class ModeController extends Controller{
	public function __construct(){ 
		$this->middleware('auth'); 
	}
}
