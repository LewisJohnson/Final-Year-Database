<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use SussexProjects\Feedback;
use SussexProjects\UserAgentString;

/**
 * The admin controller.
 * Methods in this controller are used for project and system administrators.
 *
 * @see SussexProjects\User
 */
class SystemAdminController extends Controller{

	public function __construct(){
		parent::__construct();
		$this->middleware('auth');
	}

	/**
	 * User feedback view.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function feedback(){
		return view('admin.feedback')
			->with('feedback', Feedback::orderBy('date', 'desc')->get());
	}

	/**
	 * Destroy user feedback view.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function destroyFeedback(Request $request){
		Feedback::find($request->feedback_id)->delete();
		return view('admin.feedback')->with('feedback', Feedback::orderBy('date', 'desc')->get());
	}

	/**
	 * System administrator dashboard view.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function systemDashboardView(){
		return view('admin.system.dashboard');
	}

	/**
	 * Updates the system configuration
	 * The view for this request is systemDashboard()
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function updateSystemConfiguration(Request $request){
		foreach($request->all() as $key => $value){
			if(substr($key, -4, 4) != "json"){
				// This is to convert strings to PHP booleans
				if($value === "true"){
					$value = true;
				}
				if($value === "false"){
					$value = false;
				}

				get_config_json($request[$key."-json"], $value);
			}
		}

		return redirect()->action('SystemAdminController@systemDashboardView');
	}

	/**
	 * User agent string view.
	 *
	 * @param \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function userAgentView(Request $request){
		if($request->query("unique") == "1"){
			$userAgents = UserAgentString::where('first_visit', 1);
		} else {
			$userAgents = UserAgentString::where('first_visit', 0);
		}

		if($request->query("page")){
			return view('system.partials.user-agent-row')->with('userAgents', $userAgents->paginate($this->paginationCount));
		} else {
			return view('system.user-agent')->with('userAgents', $userAgents->paginate($this->paginationCount));
		}
	}
}
