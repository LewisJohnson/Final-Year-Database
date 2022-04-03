@extends('layouts.app')

@section('pageTitle')
Transactions - {{ $transaction_type }}
@endsection

@section('content')
@php
	$showTypeColumn = $transaction_type == 'All' ? 'true' : 'false';
@endphp

<div class="centered mw-1400 bg-white shadow-sm rounded p-4">
	<h2 class="main-title">Transactions <small class="text-muted">/ {{ $transaction_type }}</small></h2>

	@include('admin.partials.transactions-search')

	<div class="d-flex">
		<div class="btn-group">
			<a class="btn {{ $transaction_type == 'All' ? 'btn-primary' : 'btn-secondary' }}"
				href="{{ action('TransactionController@index', 'type=all') }}"
				data-element-to-replace-with-loader-selector="#responsive-table">All</a>

			<a class="btn border-left {{ $transaction_type == 'Project' ? 'btn-primary' : 'btn-secondary' }}"
				href="{{ action('TransactionController@index', 'type=project') }}"
				data-element-to-replace-with-loader-selector="#responsive-table">Project</a>

			<a class="btn border-left {{ $transaction_type == 'Student' ? 'btn-primary' : 'btn-secondary' }}"
				href="{{ action('TransactionController@index', 'type=student') }}"
				data-element-to-replace-with-loader-selector="#responsive-table">Student</a>

			<a class="btn border-left {{ $transaction_type == 'Marker' ? 'btn-primary' : 'btn-secondary' }}"
				href="{{ action('TransactionController@index', 'type=marker') }}"
				data-element-to-replace-with-loader-selector="#responsive-table">Marker</a>

			<a class="btn border-left {{ $transaction_type == 'Topic' ? 'btn-primary' : 'btn-secondary' }}"
				href="{{ action('TransactionController@index', 'type=topic') }}"
				data-element-to-replace-with-loader-selector="#responsive-table">Topic</a>
		</div>
		<div class="checkbox ml-auto" title="Shows the database value for most columns on hover">
			<input type="checkbox" id="showTransactionDetailOnHover">
			<label class="ml-1" for="showTransactionDetailOnHover">Enable detail on hover</label>
		</div>
	</div>

	<div class="table-responsive">
		<table id="transaction-table"
			class="table table-sm bg-white data-table table-column-toggle sort-table shadow-sm mt-3">
			<thead>
				<tr>
					<th data-default="false" class="cursor--pointer">Id</th>
					<th data-default="{{ $showTypeColumn }}" class="cursor--pointer">Type</th>
					<th data-default="true" class="cursor--pointer">Action</th>
					<th data-default="{{ $transaction_type == 'Topic' }}" class="cursor--pointer">Topic</th>
					<th data-default="{{ $transaction_type != 'Topic' }}" class="cursor--pointer">Project</th>
					<th data-default="{{ $transaction_type != 'Topic' }}" class="cursor--pointer">Student</th>
					<th data-default="true" class="cursor--pointer">Supervisor</th>
					<th data-default="false" class="cursor--pointer">Marker</th>
					<th data-default="{{ $transaction_type == 'Topic' }}" class="cursor--pointer">Admin</th>
					<th data-default="true" class="cursor--pointer">Date</th>
				</tr>
			</thead>
			<tbody>
				@foreach ($transactions as $transaction)
				<tr>
					<td data-hover="{{ $transaction->id }}">{{ substr($transaction->id, 0, 7) }}</td>
					<td>{{ ucfirst($transaction->type) }}</td>
					<td>{{ ucfirst($transaction->action) }}</td>

					<td>{{ $transaction->topic }}</td>

					{{-- Project column --}}
					@if ($transaction->action == 'copy')
						@php
							$splitProj = explode('->', $transaction->project);
							$originalProject = \SussexProjects\Project::find(trim($splitProj[0]));
							$copiedProject = \SussexProjects\Project::find(trim($splitProj[1]));
						@endphp

							<td data-hover="{{ $transaction->project }}">
								<a href="{{ action('ProjectController@show', $originalProject) }}">{{ $originalProject->title}}</a>
								<span>⮕</span>
								<a href="{{ action('ProjectController@show', $copiedProject) }}">{{ $copiedProject->title }}</a>
							</td>
					@elseif($transaction->action == 'deleted' || $transaction->action == 'undo')
						<td>
							{{ $transaction->project }}
						</td>
					@else
						@php
							$projTitle = $transaction->getProjectTitle();
						@endphp

						@if ($projTitle != '-')
							<td data-hover="{{ $transaction->project }}"><a
									href="{{ action('ProjectController@show', $transaction->project) }}">{{ $projTitle }}</a>
							</td>
						@else
							<td data-hover="{{ $transaction->project }}">{{ $projTitle }}</td>
						@endif
					@endif

					{{-- Student column --}}
					<td data-hover="{{ $transaction->student }}">{{ $transaction->getName($transaction->student) }}</td>
							
					{{-- Supervisor column --}}
					<td data-hover="{{ $transaction->supervisor }}">{{ $transaction->getName($transaction->supervisor) }}</td>

					{{-- Marker column --}}
					@if ($transaction->action == 'marker-swap')
						@php
							$splitMarker = explode('->', $transaction->marker);
							$markerAId = trim($splitMarker[0]);
							$markerBId = trim($splitMarker[1]);
						@endphp

						<td data-hover="{{ $markerAId.' ⮕ '.$markerBId }}">
							<span>{{ $transaction->getName($markerAId) }}</span>
							<span>⮕</span>
							<span>{{ $transaction->getName($markerBId) }}</span>
						</td>
					@else
						<td data-hover="{{ $transaction->marker }}">{{ $transaction->getName($transaction->marker) }}</td>
					@endif

					<td data-hover="{{ $transaction->admin }}">{{ $transaction->getName($transaction->admin) }}</td>
					<td data-use-hover-value data-hover="{{ $transaction->transaction_date }}">{{ $transaction->transaction_date->format('d/m/yy H:i:s') }}</td>
				</tr>
				@endforeach
			</tbody>
		</table>
	</div>

	{{ $transactions->links() }}
</div>
@endsection