<?php
namespace SussexProjects\Http\Controllers;

use SussexProjects\ProjectTopicMasters;
use SussexProjects\ProjectTopicUg;
use Illuminate\Http\Request;
use SussexProjects\Topic;
use SussexProjects\TopicUg;
use SussexProjects\TopicMasters;
use SussexProjects\ProjectTopic;
use Session;
use DB;
use Illuminate\Support\Carbon;

class TopicController extends Controller{

	public function __construct(){ 
		$this->middleware('auth'); 
	}
	
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(){
		$topics = Session::get("db_type") == "ug" ? TopicUg::all() : TopicMasters::all();
		return view('topics.index', compact('topics'));
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request){
		//todo: add topic created transaction to DB
		$result = DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				return $topic = TopicUg::create(['name' => $request->topic_name]);
			} else {
				return $topic = TopicMasters::create(['name' => $request->topic_name]);
			}
		});
		
		return $result->toJson();
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request){
		//todo: add topic updated transaction to DB
		$result = DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				$topic = TopicUg::find($request->topic_id);
			} else {
				$topic = TopicMasters::find($request->topic_id);
			}
			$topic->name = $request->topic_name;
			$topic->save();
		});

		return $result;
	}

	/**
	 * Remove the specified resource from storage.
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Request $request){
		//todo: add topic destroyed transaction to DB
		$result = DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				ProjectTopicUg::where('topic_id', $request->topic_id)->delete();
				TopicUg::find($request->topic_id)->delete();
			} else {
				ProjectTopicMasters::where('topic_id', $request->topic_id)->delete();
				TopicMasters::find($request->topic_id)->delete();
			}
		});

		return $result;
	}
}