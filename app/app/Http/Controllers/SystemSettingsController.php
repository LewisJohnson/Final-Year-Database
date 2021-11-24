<?php

namespace SussexProjects\Http\Controllers;

use Log;
use Illuminate\Http\Request;
use SussexProjects\Feedback;
use SussexProjects\UserAgentString;
use SussexProjects\SystemSettings;

class SystemSettingsController extends Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->middleware('auth');
	}

	/**
	 * System administrator dashboard view.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		return view('systemSettings.index');
	}

	/**
	 * Updates the system configuration
	 * The view for this request is systemDashboard()
	 *
	 *
	 * @param  Request                     $request
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request)
	{
		foreach ($request->all() as $key => $value)
		{
			if (SystemSettings::get($key) == false)
			{
				Log::error("SystemSettingsController::update - failed to find key (".$key.")");
			}

			SystemSettings::set($key, $value);
		}

		return redirect()->action('SystemSettingsController@index');
	}
}
