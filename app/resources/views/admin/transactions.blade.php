@extends('layouts.app')
@section('content')
<div class="centered mw-1400">
	<h1>{{ $transaction_type }} Transactions</h1>

	<div class="d-flex">
		<a class="btn external-link @if($transaction_type == "Project") {{'btn-primary'}} @else btn-light @endif" href="{{ action('TransactionController@index', 'type=project') }}" data-element-to-replace-with-loader-selector="#responsive-table">Project</a>
		<a class="btn external-link ml-2 @if($transaction_type == "Student") {{'btn-primary'}} @else btn-light @endif" href="{{ action('TransactionController@index', 'type=student') }}" data-element-to-replace-with-loader-selector="#responsive-table">Student</a>
		<a class="btn external-link ml-2 @if($transaction_type == "Marker") {{'btn-primary'}}  @else btn-light @endif" href="{{ action('TransactionController@index', 'type=marker') }}" data-element-to-replace-with-loader-selector="#responsive-table">Marker</a>
		<a class="btn external-link ml-2 @if($transaction_type == "Topic") {{'btn-primary'}}   @else btn-light @endif" href="{{ action('TransactionController@index', 'type=topic') }}" data-element-to-replace-with-loader-selector="#responsive-table">Topic</a>

		<div class="checkbox ml-auto">
			<input type="checkbox" id="showTransactionDetailOnHover">
			<label class="ml-1" for="showTransactionDetailOnHover">Enable detail on hover</label>
		</div>
	</div>


	<div class="table-responsive">
		<table id="transaction-table" class="table table-sm bg-white data-table table-column-toggle sort-table shadow-sm mt-3">
			<thead>
				<tr>
					<th data-default="false" class="cursor--pointer">Id</th>
					<th data-default="true" class="cursor--pointer">Action</th>
					<th data-default="{{ $transaction_type == "Topic" }}" class="cursor--pointer">Topic</th>
					<th data-default="{{ $transaction_type != "Topic" }}" class="cursor--pointer">Project</th>
					<th data-default="{{ $transaction_type != "Topic" }}" class="cursor--pointer">Student</th>
					<th data-default="true" class="cursor--pointer">Supervisor</th>
					<th data-default="false" class="cursor--pointer">Marker</th>
					<th data-default="{{ $transaction_type == "Topic" }}" class="cursor--pointer">Admin</th>
					<th data-default="true" class="cursor--pointer">Date</th>
				</tr>
			</thead>
			<tbody>
				@foreach($transactions as $transaction)
					<tr>
						<td data-hover="{{ $transaction->id }}">{{ substr($transaction->id, 0, 7) }}</td>
						<td>{{ ucfirst($transaction->action) }}</td>

						<td>{{ $transaction->topic }}</td>

						@if($transaction->action == "copy")
							@php
								$splitProj = explode('->', $transaction->project);
								$originalProject = \SussexProjects\Project::find(trim($splitProj[0]));
								$copiedProject =  \SussexProjects\Project::find(trim($splitProj[1]));
							@endphp

							<td data-hover="{{ $transaction->project }}">
								<a href="{{ action('ProjectController@show', $originalProject) }}">{{ $originalProject->title }}</a>
								<span>⮕</span>
								<a href="{{ action('ProjectController@show', $copiedProject) }}">{{ $copiedProject->title }}</a>
							</td>
						@elseif($transaction->action == "deleted")
							<td>
								{{ $transaction->project }}
							</td>
						@else
							@php
								$projTitle = $transaction->getProjectTitle();
							@endphp

							@if($projTitle != '-')
								<td data-hover="{{ $transaction->project }}"><a href="{{ action('ProjectController@show', $transaction->project) }}">{{ $projTitle }}</a></td>
							@else
								<td data-hover="{{ $transaction->project }}">{{ $projTitle }}</td>
							@endif
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
		
	{{ $transactions->links() }}
</div>
@endsection