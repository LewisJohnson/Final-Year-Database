@extends('layouts.app')
@section('content')
<div class="centered width--1400">
	<h1>{{ $transaction_type }} Transactions</h1>

	<div class="button-group button-group--horizontal" style="position: relative;">
		<a class="button @if($transaction_type == "Project") {{'button--accent'}} @endif" href="{{ action('TransactionController@index', 'type=project') }}">Project</a>
		<a class="button @if($transaction_type == "Topic") {{'button--accent'}} @endif" href="{{ action('TransactionController@index', 'type=topic') }}">Topic</a>
		<a class="button @if($transaction_type == "Student") {{'button--accent'}} @endif" href="{{ action('TransactionController@index', 'type=student') }}">Student</a>
		<a class="button @if($transaction_type == "Marker") {{'button--accent'}} @endif" href="{{ action('TransactionController@index', 'type=marker') }}">Marker</a>

		<div class="checkbox" style="position: absolute; top: 65px; left: 0px">
			<input type="checkbox" id="showTransactionDetailOnHover" checked>
			<label style="margin-left: 5px;" for="showTransactionDetailOnHover">Enable detail on hover</label>
		</div>
	</div>

	<div class="table-responsive">
		<table id="transations-project" class="data-table table-column-toggle table--dark-head sort-table shadow-2dp">
			<thead>
				<tr>
					<th data-default="false" class="pointer">Id</th>
					<th data-default="true" class="pointer">Action</th>
					<th data-default="true" class="pointer">Project</th>
					<th data-default="true" class="pointer">Student</th>
					<th data-default="true" class="pointer">Supervisor</th>
					<th data-default="false" class="pointer">Marker</th>
					<th data-default="false" class="pointer">Admin</th>
					<th data-default="true" class="pointer">Date</th>
				</tr>
			</thead>
			<tbody>
				@foreach($transactions as $transaction)
					<tr>
						<td data-hover="{{ $transaction->id }}">{{ substr($transaction->id, 0, 7) }}</td>
						<td>{{ ucfirst($transaction->action) }}</td>

						@if($transaction->getProjectTitle() != '-')
							<td data-hover="{{ $transaction->project }}"><a href="{{ action('ProjectController@show', $transaction->project) }}">{{ $transaction->getProjectTitle() }}</a></td>
						@else
							<td data-hover="{{ $transaction->project }}">{{ $transaction->getProjectTitle() }}</td>
						@endif
						<td data-hover="{{ $transaction->student }}">{{ $transaction->getName($transaction->student) }}</td>
						<td data-hover="{{ $transaction->supervisor }}">{{ $transaction->getName($transaction->supervisor) }}</td>
						<td data-hover="{{ $transaction->marker }}"	>{{  $transaction->getName($transaction->marker) }}</td>
						<td data-hover="{{ $transaction->admin }}">{{ $transaction->getName($transaction->admin) }}</td>
						<td data-use-hover-value data-hover="{{ $transaction->transaction_date }}">{{ $transaction->transaction_date->format('M j, H:i') }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</div>
</div>
@endsection