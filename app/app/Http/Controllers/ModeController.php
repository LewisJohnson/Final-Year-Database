<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

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
