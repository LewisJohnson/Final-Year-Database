<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;

/**
 * The mode controller.
 * 
 * Handles all mode functions.
 * 
*/
class ModeController extends Controller{
	public function __construct(){ 
		$this->middleware('auth'); 
	}
}
