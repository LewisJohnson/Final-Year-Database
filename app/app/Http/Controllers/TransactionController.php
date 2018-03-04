<?php
namespace SussexProjects\Http\Controllers;

use Illuminate\Support\Facades\Session;
use SussexProjects\Transaction;
use SussexProjects\Project;

/**
 * The transaction controller.
 *
 * Handles most functions related to transactions.
 * 
*/
class TransactionController extends Controller{

	public function __construct(){
		$this->middleware('admin');
	}

	/**
	 * A list of all transactions sorted by transaction time.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(){
		$transactions = Session::get("db_type") == "ug" ?
			TransactionUg::orderBy('transaction_date', 'desc')->get() :
			TransactionMasters::orderBy('transaction_date', 'desc')->get();

		return view('admin.transactions')->with('transactions', $transactions);
	}

	/**
	 * A list of all projects with transaction.
	 * 
	 * The user then selects a project to view it's transactions.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function byProject(){
		if(Session::get("db_type") == "ug"){
			$projects = ProjectUg::all();
		} elseif(Session::get("db_type") == "masters") {
			$projects = ProjectMasters::all();
		}
		return view('projects.index')
			->with('projects', $projects)
			->with('view', 'transaction');
	}
}
