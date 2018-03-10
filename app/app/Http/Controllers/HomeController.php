<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;

/**
 * The home controller.
 *
 * Handles all index based routes and pages.
 * Also handles cookie banner and database type.
 *
*/
class HomeController extends Controller{

	/**
	 * Displays the home page.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request){
		if($request->query("largeFont") == "true"){
			Cookie::queue('largeFont', "true", 525600);
		}
		if($request->query("largeFont") == "false"){
			Cookie::queue('largeFont', "false", 525600);
		}

		if($request->query("highContrast") == "true"){
			Cookie::queue('highContrast', "true", 525600);
		}

		if($request->query("highContrast") == "false"){
			Cookie::queue('highContrast', "false", 525600);
		}

		preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT'], $matches);
		if(count($matches)<2){
			preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT'], $matches);
		}

		if (count($matches)>1){
			//Then we're using IE
			return view('help.ie');
		}
		return view('index');
	}

	/**
	 * Displays the help page.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function help(Request $request){
		return view('help.help');
	}

	/**
	 * Displays the general information page.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function information(Request $request){
		return view('help.information');
	}

	/**
	 * Displays the about page.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function about(Request $request){
		return view('help.about');
	}


	/**
	 * Gets a rendered HTML snippet.
	 *
	 * Snippets must be in the view/snippets directory.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function snippet(Request $request){
		$snippetName = $request->query('snippet');
		if(preg_match('/^[a-z-]*$/', $snippetName)){
			return view('snippets.'.$snippetName);
		}

		abort(404);
	}

	/**
	 * Sets the database type.
	 *
	 * Undergraduate or postgraduate database.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function setDatabaseType(Request $request){
		if($request->db_type == "ug"){
			Session::put("db_type", "ug");
			return redirect()->action('HomeController@index');
		}

		if($request->db_type == "pg"){
			Session::put("db_type", "pg");
			return redirect()->action('HomeController@index');
		}
		return abort(400, "Invalid Request.");
	}


	/**
	 * Sets the department type.
	 *
	 * e.g. Informatics or engineering.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function setDepartmentView(Request $request){
		// Reset session department
		// Session::remove("department");
		return view('set-department');
	}

	/**
	 * Sets the department type.
	 *
	 * e.g. Informatics or engineering.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function setDepartment(Request $request){
		if(in_array($request->department, departments())){
			Session::put("department", $request->department);
		} else {
			session()->flash("message", "Sorry, something went wrong.");
			session()->flash('message_type', 'error');
		}

		return redirect()->action('HomeController@index');
	}
}
