<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use SussexProjects\Mode;
/**
 * The mode controller.
 * Handles all mode functions.
 */
class ModeController extends Controller{
	public function __construct(){
		parent::__construct();
		$this->middleware('auth');
	}

	/**
	 * Amend parameters view.
	 *
	 * @return \Illuminate\View\View
	 */
	public function index(){
		return view('admin.parameters');
	}

	/**
	 * Update parameters.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request){
		$mode = Mode::first();

		if(isset($request->project_selection)){
			$mode->project_selection = $request->project_selection;
		}

		if(isset($request->supervisor_accept)){
			$mode->supervisor_accept = $request->supervisor_accept;
		}

		if(isset($request->project_year)){
			$mode->project_year = $request->project_year;
		}

		$mode->thresholds = $request->thresholds;

		$mode->save();

		session()->flash('message', 'Parameters have been updated successfully.');
		session()->flash('message_type', 'success');

		return redirect()->action('ModeController@index');
	}
}
