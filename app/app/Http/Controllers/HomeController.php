<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use SussexProjects\Feedback;
use SussexProjects\Project;
use SussexProjects\Topic;
use SussexProjects\User;

/**
 * The home controller.
 * Handles all index based routes and pages.
 * Also handles cookie banner and database type.
 */
class HomeController extends Controller
{

	/**
	 * Displays the home page.
	 *
	 * @return \Illuminate\View\View
	 */
	public function index()
	{
		return view('index');
	}

	/**
	 * Displays the help page.
	 *
	 * @return \Illuminate\View\View
	 */
	public function help()
	{
		return view('help.help');
	}

	/**
	 * Displays the feedback form.
	 *
	 * @return \Illuminate\View\View
	 */
	public function showFeedbackForm()
	{
		return view('forms.feedback');
	}

	/**
	 * Log feedback to database.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function feedback()
	{
		$this->validate(request(), ['comment' => 'required']);

		$feedback = new Feedback();
		$feedback->comment = request('comment');
		$feedback->date = new Carbon();

		if (Auth::check())
		{
			if (empty(request('anonymous')))
			{
				// Record user email if not anonymous
				$feedback->email = Auth::user()->email;
			}
		}
		else
		{
			if (!empty(request('email')))
			{
				// Record guest email if it exists
				$feedback->email = request('email');
			}
		}

		if (!empty(request('page')))
		{
			$feedback->page = request('page');
		}

		if (!empty(Session::get('department')))
		{
			$feedback->department = Session::get('department');
		}

		if (!empty(Session::get('education_level')))
		{
			$feedback->education_level = get_el_short_name();
		}

		$feedback->save();

		return response()->json(array(
			'successful' => true,
			'message'    => 'Thank you for your feedback.',
		));
	}

	/**
	 * Universal search.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function search(Request $request)
	{
		$searchTerm = $request->get("search_term");

		$projects = Project::where('title', 'LIKE', '%' . $searchTerm . '%')
			->limit(5)
			->get();

		$topics = Topic::where('name', 'LIKE', '%' . $searchTerm . '%')
			->limit(5)
			->get();

		return response()->json(array(
			'successful' => true,
			'results'    => array(
				'projects' => $projects->toJson(),
				'topics'   => $topics->toJson(),
			),
		));
	}

	/**
	 * Displays the about page.
	 *
	 * @return \Illuminate\View\View
	 */
	public function about()
	{
		return view('help.about');
	}

	/**
	 * Gets a rendered HTML snippet.
	 * Snippets must be in the view/snippets directory.
	 *
	 *
	 * @param  \Illuminate\Http\Request $request
	 * @return \Illuminate\View\View
	 */
	public function snippet(Request $request)
	{
		$snippetName = $request->query('snippet');
		if (preg_match('/^[a-z-]*$/', $snippetName))
		{
			return view('snippets.' . $snippetName);
		}

		return abort(404);
	}

	/**
	 * A view where the user can select a department.
	 * e.g. Informatics or engineering.
	 *
	 * @return \Illuminate\View\View
	 */
	public function setDepartmentView()
	{
		if (Auth::check())
		{
			return redirect()->action('HomeController@index');
		}

		return view('set-department');
	}

	/**
	 * Sets the department type.
	 * e.g. Informatics or engineering.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function setDepartment(Request $request)
	{
		if (in_array($request->department, get_departments()))
		{
			if (Auth::user())
			{
				Auth::logout();
				session()->flash("message", "You have been logged out.");
				session()->flash('message_type', 'bg-warning');
			}
			Session::put("department", $request->department);
		}
		else
		{
			session()->flash("message", "The department you selected was invalid.");
			session()->flash('message_type', 'error');
		}

		return redirect()->action('HomeController@index');
	}
}
