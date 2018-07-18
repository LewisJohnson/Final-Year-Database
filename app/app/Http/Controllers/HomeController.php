<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use SussexProjects\Feedback;

/**
 * The home controller.
 * Handles all index based routes and pages.
 * Also handles cookie banner and database type.
 */
class HomeController extends Controller{

	/**
	 * Displays the home page.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function dbFixView(){
		$projects = Project::all();

		$projects = $projects->filter(function ($project) {
			return preg_match('/‘*/', $project->description);
		});

		return view('dbfix')->with('projects', $projects);
	}

	/**
	 * Displays the home page.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(){
		return view('index');
	}

	/**
	 * Displays the help page.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function help(){
		return view('help.help');
	}

	/**
	 * Displays the feedback form.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function showFeedbackForm(){
		return view('forms.feedback');
	}

	/**
	 * Log feedback to database.
	 *
	 * @return \Illuminate\Http\Response
	 * @internal param Request $request
	 */
	public function feedback(){
		$this->validate(request(), ['comment' => 'required']);

		$feedback = new Feedback;
		$feedback->comment = request('comment');

		if(Auth::check()){
			if(empty(request('anonymous'))){
				// Record user email if not anonymous
				$feedback->email = Auth::user()->email;
			}
		} else {
			if(!empty(request('email'))){
				// Record guest email if it exists
				$feedback->email = request('email');
			}
		}

		if(!empty(request('page'))){
			$feedback->page = request('page');
		}

		if(!empty(Session::get('department'))){
			$feedback->department = Session::get('department');
		}

		if(!empty(Session::get('education_level'))){
			$feedback->education_level = Session::get('education_level')["shortName"];
		}

		$feedback->save();

		return response()->json(array(
			'successful' => true, 'message' => 'Thank you for your feedback.'
		));
	}

	/**
	 * Displays the about page.
	 *
	 * @return \Illuminate\Http\Response
	 * @internal param Request $request
	 */
	public function about(){
		return view('help.about');
	}

	/**
	 * Gets a rendered HTML snippet.
	 * Snippets must be in the view/snippets directory.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function snippet(Request $request){
		$snippetName = $request->query('snippet');
		if(preg_match('/^[a-z-]*$/', $snippetName)){
			return view('snippets.'.$snippetName);
		}

		return abort(404);
	}

	/**
	 * Sets the department type.
	 * e.g. Informatics or engineering.
	 *
	 * @return \Illuminate\Http\Response
	 * @internal param Request $request
	 */
	public function setDepartmentView(){
		return view('set-department');
	}

	/**
	 * Sets the department type.
	 * e.g. Informatics or engineering.
	 *
	 * @param  \Illuminate\Http\Request $request
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function setDepartment(Request $request){
		if(in_array($request->department, get_departments())){
			if(Auth::user()){
				Auth::logout();
				session()->flash("message", "You have been logged out.");
				session()->flash('message_type', 'notification');
			}
			Session::put("department", $request->department);
		} else {
			session()->flash("message", "Sorry, something went wrong.");
			session()->flash('message_type', 'error');
		}

		return redirect()->action('HomeController@index');
	}
}
