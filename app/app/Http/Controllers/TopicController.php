<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use SussexProjects\ProjectTopic;
use SussexProjects\Topic;
use SussexProjects\Transaction;
use SussexProjects\ProjectTopic;

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
		//todo: add topic created transaction to DB
		$result = DB::transaction(function() use ($request) {
			$topic = Topic::create(['name' => $request->topic_name]);
			$transaction = new Transaction;

			$transaction->fill(array(
				'action' =>'created',
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
		$result = DB::transaction(function() use ($request) {
			$topic = Topic::findOrFail($request->topic_id);
			// $transaction = new Transaction;

			// $transaction->fill(array(
			// 	'action' =>'updated',
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
		$result = DB::transaction(function() use ($request) {
			$projectTopic = ProjectTopic::where('topic_id', $request->topic_id);
			$topic = Topic::findOrFail($request->topic_id);
			$transaction = new Transaction;

			$transaction->fill(array(
				'action' =>'deleted',
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
