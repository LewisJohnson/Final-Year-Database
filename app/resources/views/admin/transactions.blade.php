@extends('layouts.app')
@section('content')
<div class="centered width--1400">
	<h1>Transactions</h1>

	<h3>Project Transactions</h3>
	<div class="table-responsive">
		<table class="data-table shadow-2dp">
			<thead>
				<tr>
					<th>Id</th>
					<th>Action</th>
					<th>Project</th>
					<th>Student</th>
					<th>Supervisor</th>
					<th>Marker</th>
					<th>Admin</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				@foreach($projectTransactions as $transaction)
					<tr>
						<td>{{ $transaction->id }}</td>
						<td>{{ $transaction->action }}</td>
						<td>{{ $transaction->project }}</td>
						<td>{{ $transaction->student }}</td>
						<td>{{ $transaction->supervisor }}</td>
						<td>{{ $transaction->marker }}</td>
						<td>{{ $transaction->admin }}</td>
						<td>{{ $transaction->transaction_date }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</div>

	<h3>Student Transactions</h3>
	<div class="table-responsive">
		<table class="data-table shadow-2dp">
			<thead>
				<tr>
					<th>Id</th>
					<th>Action</th>
					<th>Project</th>
					<th>Student</th>
					<th>Supervisor</th>
					<th>Marker</th>
					<th>Admin</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				@foreach($studentTransactions as $transaction)
					<tr>
						<td>{{ $transaction->id }}</td>
						<td>{{ $transaction->action }}</td>
						<td>{{ $transaction->project }}</td>
						<td>{{ $transaction->student }}</td>
						<td>{{ $transaction->supervisor }}</td>
						<td>{{ $transaction->marker }}</td>
						<td>{{ $transaction->admin }}</td>
						<td>{{ $transaction->transaction_date }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</div>

	<h3>Marker Transactions</h3>
	<div class="table-responsive">
		<table class="data-table shadow-2dp">
			<thead>
				<tr>
					<th>Id</th>
					<th>Action</th>
					<th>Project</th>
					<th>Student</th>
					<th>Supervisor</th>
					<th>Marker</th>
					<th>Admin</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				@foreach($markerTransactions as $transaction)
					<tr>
						<td>{{ $transaction->id }}</td>
						<td>{{ $transaction->action }}</td>
						<td>{{ $transaction->project }}</td>
						<td>{{ $transaction->student }}</td>
						<td>{{ $transaction->supervisor }}</td>
						<td>{{ $transaction->marker }}</td>
						<td>{{ $transaction->admin }}</td>
						<td>{{ $transaction->transaction_date }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</div>

	<h3>Topic Transactions</h3>
	<div class="table-responsive">
		<table class="data-table shadow-2dp">
			<thead>
				<tr>
					<th>Id</th>
					<th>Action</th>
					<th>Project</th>
					<th>Student</th>
					<th>Supervisor</th>
					<th>Marker</th>
					<th>Admin</th>
					<th>Topic</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				@foreach($topicTransactions as $transaction)
					<tr>
						<td>{{ $transaction->id }}</td>
						<td>{{ $transaction->action }}</td>
						<td>{{ $transaction->project }}</td>
						<td>{{ $transaction->student }}</td>
						<td>{{ $transaction->supervisor }}</td>
						<td>{{ $transaction->marker }}</td>
						<td>{{ $transaction->admin }}</td>
						<td>{{ $transaction->topic }}</td>
						<td>{{ $transaction->transaction_date }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</div>
</div>
@endsection