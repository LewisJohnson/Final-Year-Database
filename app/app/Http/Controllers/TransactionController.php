<?php
namespace SussexProjects\Http\Controllers;

use Session;
use SussexProjects\TransactionUg;
use SussexProjects\TransactionMasters;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectMasters;

class TransactionController extends Controller{

	public function __construct(){
		$this->middleware('admin');
	}

	public function index(){
		// This is by time
		$transactions = Session::get("db_type") == "ug" ?
			TransactionUg::orderBy('transaction_date', 'desc')->get() :
			TransactionMasters::orderBy('transaction_date', 'desc')->get();

		return view('admin.transactions')->with('transactions', $transactions);
	}

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
