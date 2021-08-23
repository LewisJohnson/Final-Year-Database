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
use Illuminate\Support\Facades\DB;
use SussexProjects\ProjectTopic;
use SussexProjects\Topic;
use SussexProjects\Transaction;

/**
 * The topic controller.
 * Handles all functions related to topics.
 */
class TopicController extends Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->middleware('auth');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		$validated = $request->validate([
			'topic_name' => 'required|min:2|max:191',
		]);

		$result = DB::transaction(function () use ($request)
		{
			$topic = Topic::create(['name' => $request->topic_name]);
			$transaction = new Transaction();

			$transaction->fill(array(
				'type'             => 'topic',
				'action'           => 'created',
				'topic'            => $topic->name,
				'admin'            => Auth::user()->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();

			return $topic;
		});

		return $result->toJson();
	}

	/**
	 * Update the specified resource in storage.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request)
	{
		$validated = $request->validate([
			'topic_name' => 'required|min:2|max:191',
		]);

		$result = DB::transaction(function () use ($request)
		{
			$topic = Topic::findOrFail($request->topic_id);
			$transaction = new Transaction();

			$topic->name = $request->topic_name;
			$topic->save();

			$transaction->fill(array(
				'type'             => 'topic',
				'action'           => 'updated',
				'topic'            => $topic->name . " -> " . $request->topic_name,
				'admin'            => Auth::user()->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();
		});

		return $result;
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 *
	 * @param  \Illuminate\Http\Request    $request
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Request $request)
	{
		$validated = $request->validate([
			'topic_id' => 'required|min:2|max:191',
		]);

		$result = DB::transaction(function () use ($request)
		{
			$projectTopic = ProjectTopic::where('topic_id', $request->topic_id);
			$topic = Topic::findOrFail($request->topic_id);
			$transaction = new Transaction();

			$projectTopic->delete();
			$topic->delete();

			$transaction->fill(array(
				'type'             => 'topic',
				'action'           => 'deleted',
				'topic'            => $topic->name,
				'admin'            => Auth::user()->id,
				'transaction_date' => new Carbon(),
			));

			$transaction->save();
		});

		return $result;
	}
}
