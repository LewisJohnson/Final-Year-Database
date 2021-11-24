<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
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
class SystemAdminController extends Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->middleware('auth');
	}

	/**
	 * User feedback view.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function feedback()
	{
		$feedback = Feedback::orderBy('date', 'desc')->paginate(25);
		return view('admin.feedback')
			->with('feedback', $feedback);
	}

	/**
	 * Destroy user feedback view.
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function destroyFeedback(Request $request)
	{
		Feedback::find($request->feedback_id)->delete();

		return response()->json(array(
			'successful' => true,
		));
	}

	/**
	 * User agent string view.
	 *
	 *
	 * @param  \Illuminate\Http\Request                                   $request
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function userAgentView(Request $request)
	{
		if ($request->query("unique") == "1")
		{
			$userAgents = UserAgentString::where('first_visit', 1);
		}
		else
		{
			$userAgents = UserAgentString::where('first_visit', 0);
		}

		if ($request->query("page"))
		{
			return view('system.partials.user-agent-row')->with('userAgents', $userAgents->paginate($this->paginationCount));
		}
		else
		{
			return view('system.user-agent')->with('userAgents', $userAgents->paginate($this->paginationCount));
		}
	}
}
