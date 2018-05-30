<?php
/**
 * Copyright (C) University of Sussex 2018.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace SussexProjects\Http\Controllers;

use SussexProjects\Transaction;

/**
 * The transaction controller.
 * Handles most functions related to transactions.
 */
class TransactionController extends Controller{

	public function __construct(){
		parent::__construct();
		$this->middleware('admin');
	}

	/**
	 * A list of all transactions sorted by transaction time.
	 *
	 * @return \Illuminate\View\View
	 */
	public function index(){
		$topicTransactions = Transaction::where('type', 'topic')
			->orderBy('transaction_date', 'desc')->get();
		$projectTransactions = Transaction::where('type', 'project')
			->orderBy('transaction_date', 'desc')->get();
		$studentTransactions = Transaction::where('type', 'student')
			->orderBy('transaction_date', 'desc')->get();
		$markerTransactions = Transaction::where('type', 'marker')
			->orderBy('transaction_date', 'desc')->get();

		return view('admin.transactions')
			->with('topicTransactions', $topicTransactions)
			->with('projectTransactions', $projectTransactions)
			->with('studentTransactions', $studentTransactions)
			->with('markerTransactions', $markerTransactions);
	}

	/**
	 * A list of all projects with transaction.
	 * The user then selects a project to view it's transactions.
	 *
	 * @return \Illuminate\Http\Response
	 */
	//	public function byProject(){
	//		// $projects = Project::all();
	//		// return view('projects.index')
	//		// 	->with('projects', $projects)
	//		// 	->with('view', 'transaction');
	//	}
}
