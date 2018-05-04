@extends('layouts.app')
@section('content')
<div class="centered width--1400">
	<h1>Transactions</h1>
	<ins>Hover over table rows for more detail</ins>

	<h3>Project Transactions</h3>
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
				@foreach($projectTransactions as $transaction)
					<tr>
						<td data-hover="{{ $transaction->id }}">{{ substr($transaction->id, 0, 7) }}</td>
						<td>{{ ucfirst($transaction->action) }}</td>
						<td data-hover="{{ $transaction->project }}">@if(!empty($transaction->project)) {{ SussexProjects\Project::find($transaction->project)->title }} @endif</td>
						<td data-hover="{{ $transaction->student }}">@if(!empty($transaction->student)) {{ SussexProjects\Student::find($transaction->student)->user->getFullName() }} @endif</td>
						<td data-hover="{{ $transaction->supervisor }}">@if(!empty($transaction->supervisor)) {{ SussexProjects\Supervisor::find($transaction->supervisor)->user->getFullName() }} @endif</td>
						<td data-hover="{{ $transaction->marker }}">@if(!empty($transaction->marker)) {{ SussexProjects\User::find($transaction->marker)->getFullName() }} @endif</td>
						<td data-hover="{{ $transaction->admin }}">@if(!empty($transaction->admin)) {{ SussexProjects\User::find($transaction->admin)->getFullName() }} @endif</td>
						<td data-use-hover-value data-hover="{{ $transaction->transaction_date }}">{{ $transaction->transaction_date->toFormattedDateString() }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</div>

	<h3>Student Transactions</h3>
	<div class="table-responsive">
		<table id="transations-student" class="data-table table-column-toggle shadow-2dp">
			<thead>
				<tr>
					<th data-default="false" >Id</th>
					<th data-default="true" >Action</th>
					<th data-default="true" >Project</th>
					<th data-default="true" >Student</th>
					<th data-default="true" >Supervisor</th>
					<th data-default="true" >Marker</th>
					<th data-default="true" >Admin</th>
					<th data-default="true" >Date</th>
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

	<h3>Topic Transactions</h3>
	<div class="table-responsive">
		<table id="transations-topic" class="data-table table-column-toggle shadow-2dp">
			<thead>
				<tr>
					<th data-default="false" >Id</th>
					<th data-default="true" >Action</th>
					<th data-default="true" >Project</th>
					<th data-default="true" >Supervisor</th>
					<th data-default="true" >Admin</th>
					<th data-default="true" >Topic</th>
					<th data-default="true" >Date</th>
				</tr>
			</thead>
			<tbody>
				@foreach($topicTransactions as $transaction)
					<tr>
						<td>{{ $transaction->id }}</td>
						<td>{{ $transaction->action }}</td>
						<td>{{ $transaction->project }}</td>
						<td>{{ $transaction->supervisor }}</td>
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