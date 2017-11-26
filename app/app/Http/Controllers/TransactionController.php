<?php
namespace SussexInformaticsProjects\Http\Controllers;

use Session;
use SussexInformaticsProjects\TransactionUg;
use SussexInformaticsProjects\TransactionMasters;

class TransactionController extends Controller{

	public function __construct(){ 
		$this->middleware('auth'); 
	}
	
	public function index(){
		$transactions = Session::get("db_type") == "ug" ? 
		TransactionUg::orderBy('transaction_date', 'desc')->get() : 
		TransactionMasters::orderBy('transaction_date', 'desc')->get();
		
		return view('admin.transactions')->with('transactions', $transactions);
	}
}
