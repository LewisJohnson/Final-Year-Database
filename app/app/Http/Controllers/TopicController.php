<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use SussexProjects\ProjectTopicMasters;
use SussexProjects\ProjectTopicUg;
use SussexProjects\Topic;
use SussexProjects\TopicUg;
use SussexProjects\TopicMasters;
use SussexProjects\TransactionUg;
use SussexProjects\TransactionMasters;
use SussexProjects\ProjectTopic;
use Session;
use DB;

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
		//todo: add topic created transaction to DB
		$result = DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				$topic = TopicUg::create(['name' => $request->topic_name]);
				$transaction = new TransactionUg;
			} elseif(Session::get("db_type") == "masters") {
				$topic = TopicMasters::create(['name' => $request->topic_name]);
				$transaction = new TransactionMasters;
			}

			$transaction->fill(array(
				'transaction_type' =>'created',
				'topic_id' => $topic->id,
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
		// todo: add topic updated transaction to DB
		// Problem with the topic update transaction is that the new name will be used, because it's linked to the Id.
		$result = DB::transaction(function ($request) use ($request) {
			if(Session::get("db_type") == "ug"){
				$topic = TopicUg::findOrFail($request->topic_id);
				// $transaction = new TransactionUg;
			} else {
				$topic = TopicMasters::findOrFail($request->topic_id);
				// $transaction = new TransactionMasters;
			}

			// $transaction->fill(array(
			// 	'transaction_type' =>'updated',
			// 	'topic_id' => $topic->id,
			// 	'transaction_date' => new Carbon
			// ));

			// $transaction->save();

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
				$projectTopic = ProjectTopicUg::where('topic_id', $request->topic_id);
				$topic = TopicUg::findOrFail($request->topic_id);
				$transaction = new TransactionUg;
			} else {
				$projectTopic = ProjectTopicMasters::where('topic_id', $request->topic_id);
				$topic = TopicMasters::findOrFail($request->topic_id);
				$transaction = new TransactionMasters;
			}

			$transaction->fill(array(
				'transaction_type' =>'deleted',
				'topic_id' => $topic->id,
				'transaction_date' => new Carbon
			));

			$transaction->save();
			$projectTopic->delete();
			$topic->delete();
		});

		return $result;
	}
}
