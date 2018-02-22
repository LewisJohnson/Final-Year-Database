<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;


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
	 * Tells the server the user has acknowledge the cookie banner.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function seenCookieBanner(){
		Cookie::queue('cookie-banner-seen', "true", 525600);
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

		if($request->db_type == "masters"){
			Session::put("db_type", "masters");
			return redirect()->action('HomeController@index');
		}
		return abort(400, "Invalid Request.");
	}
}
