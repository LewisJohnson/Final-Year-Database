<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use App\TransactionUg;
use App\TransactionMasters;

class TransactionController extends Controller{

    public function index(){
		if(Session::get("db_type") == "ug"){
			$transactions = TransactionUg::all();
		} else {
			$transactions = TransactionMasters::all();
		}
        return view('admin.transactions')->with('transactions', $transactions);
    }
}
