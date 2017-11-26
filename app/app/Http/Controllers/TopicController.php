<?php
namespace App\Http\Controllers;

use App\ProjectTopicMasters;
use App\ProjectTopicUg;
use Illuminate\Http\Request;
use App\Topic;
use App\TopicUg;
use App\TopicMasters;
use App\ProjectTopic;
use Session;
use DB;
use Illuminate\Support\Carbon;

class TopicController extends Controller{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(){
		if(Session::get("db_type") == "ug"){
			$topics = TopicUg::all();
		} else {
			$topics = TopicMasters::all();
		}
		return view('topics.index', compact('topics'));
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request){
		DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				$topic = new TopicUg;
			} else {
				$topic = new TopicMasters;
			}

			$topic->fill(array(
				'name' => request('name')
			));
			$topic->save();
			return $topic;
		});
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id){
		if(Session::get("db_type") == "ug"){
			$topic = TopicUg::where('id', $id)->first();
		} else {
			$topic = TopicMasters::where('id', $id)->first();
		}
		return view('topics.topic', compact('topic'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id){

		DB::transaction(function ($request, $id) use ($request, $id) {
			if(Session::get("db_type") == "ug"){
				$topic = TopicUg::where('id', $id)->first();
			} else {
				$topic = TopicMasters::where('id', $id)->first();
			}
			$topic->name = request('name');
			$topic->save();
			return 'true';
		});

        return 'false';
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id){
        DB::transaction(function ($id) use ($id) {
            if(Session::get("db_type") == "ug"){
                ProjectTopicUg::where('topic_id', $id)->delete();
                Topic::where('id', $id)->delete();
            } else {
                ProjectTopicMasters::where('topic_id', $id)->delete();
                TopicMasters::where('id', $id)->delete();
            }
            return 'true';
        });

		return 'false';
	}
}
