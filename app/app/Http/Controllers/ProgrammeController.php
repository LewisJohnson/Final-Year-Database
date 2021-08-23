<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use SussexProjects\Programme;

/**
 * The programme controller.
 * Handles all functions related to programmes.
 */
class ProgrammeController extends Controller
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
			'programme_name' => 'required|min:2|max:191',
		]);

		$result = DB::transaction(function () use ($request)
		{
			$programme = Programme::create(['name' => $request->programme_name]);

			return $programme;
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
			'programme_name' => 'required|min:2|max:191',
		]);

		$result = DB::transaction(function () use ($request)
		{
			$programme = Programme::findOrFail($request->programme_id);
			$programme->name = $request->programme_name;
			$programme->save();
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
			'programme_id' => 'required',
		]);

		$result = DB::transaction(function () use ($request)
		{
			$programme = Programme::findOrFail($request->programme_id);
			$programme->delete();
		});

		return $result;
	}
}
