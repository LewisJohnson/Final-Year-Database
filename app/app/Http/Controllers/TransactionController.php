<?php
namespace App\Http\Controllers;

use Session;
use App\TransactionUg;
use App\TransactionMasters;

class TransactionController extends Controller{
    public function index(){
        $transactions = Session::get("db_type") == "ug" ? TransactionUg::orderBy('transaction_date', 'desc')->get() : TransactionMasters::orderBy('transaction_date', 'desc')->get();
        return view('admin.transactions')->with('transactions', $transactions);
    }
}
