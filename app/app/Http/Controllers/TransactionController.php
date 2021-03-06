<?php
/**
 * University of Sussex.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by Lewis Johnson <lewisjohnsondev@gmail.com>
 */
namespace SussexProjects\Http\Controllers;

use Illuminate\Http\Request;
use SussexProjects\Transaction;

/**
 * The transaction controller.
 * Handles most functions related to transactions.
 */
class TransactionController extends Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->middleware('admin');
	}

	/**
	 * A list of all transactions sorted by transaction time.
	 *
	 * @return \Illuminate\View\View
	 */
	public function index(Request $request)
	{
		$type = $request->query('type') ?? 'project';

		$transactions = Transaction::where('type', $type)
			->orderBy('transaction_date', 'desc')
			->paginate(50);

		return view('admin.transactions')
			->with('transactions', $transactions)
			->with('transaction_type', ucfirst($type));
	}

}
