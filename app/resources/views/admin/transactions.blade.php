@extends('layouts.admin')
@section('content')
<div class="centered width-800">
<h2>Transactions</h2>

<ul class="table-list table-list--margined shadow-2dp">
	<li>
		<h3>Id</h3>
		<h3>Type</h3>
		<h3>Project Id</h3>
		<h3>Supervisor Id</h3>
		<h3>Student Id</h3>
		<h3>Admin Id</h3>
		<h3>Date</h3>
	</li>
	@foreach($transactions as $transaction)
	<li>
		<p>{{ $transaction->id }}</p>
		<p>{{ $transaction->transaction_type }}</p>
		<p>{{ $transaction->project_id }}</p>
		<p>{{ $transaction->student_id }}</p>
		<p>{{ $transaction->supervisor_id }}</p>
		<p>{{ $transaction->admin_id }}</p>
		<p>{{ $transaction->transaction_date }}</p>
	</li>
	@endforeach
</ul>
</div>
@endsection