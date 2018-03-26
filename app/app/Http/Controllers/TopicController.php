<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use SussexProjects\Topic;
use SussexProjects\ProjectTopic;
use SussexProjects\Transaction;

/**
 * The topic controller.
 *
 * Handles all functions related to topics.
 * 
*/
class TopicController extends Controller{

	public function __construct(){
		$this->middleware('auth');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request){
		$result = DB::transaction(function() use ($request) {
			$topic = Topic::create(['name' => $request->topic_name]);
			$transaction = new Transaction;

			$transaction->fill(array(
				'type' =>'created',
				'action' =>'deleted',
				'topic' => $topic->name,
				'transaction_date' => new Carbon
			));

			$transaction->save();
			return $topic;
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
		$result = DB::transaction(function() use ($request) {
			$topic = Topic::findOrFail($request->topic_id);
			$transaction = new Transaction;

			$transaction->fill(array(
				'type' =>'topic',
				'action' =>'updated',
				'topic' => $topic->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();

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
		$result = DB::transaction(function() use ($request) {
			$projectTopic = ProjectTopic::where('topic_id', $request->topic_id);
			$topic = Topic::findOrFail($request->topic_id);
			$transaction = new Transaction;

			$transaction->fill(array(
				'type' =>'topic',
				'action' =>'deleted',
				'topic' => $topic->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();
			$projectTopic->delete();
			$topic->delete();
		});

		return $result;
	}
}
