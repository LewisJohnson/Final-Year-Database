@extends('layouts.app')

@section('content')
<div class="centered mw-800">
	<h1>Projects by Supervisor</h1>
	<h5>Select a supervisor to see their projects</h5>

	<div class="mt-4">
		@include('supervisors.partials.supervisor-filter')
	</div>

	<table class="table table-hover bg-white data-table sort-table shadow-2dp mt-4">
		<thead>
			<tr>
				<th>Supervisor</th>
				<th class="text-right">Projects</th>
			</tr>
		</thead>
		<tbody>
			@foreach($supervisors as $supervisor)
				@php
					$projectsOnOfferCount = count($supervisor->getProjects('on-offer'));
				@endphp

				@if($projectsOnOfferCount > 0)
					<tr class="cursor--pointer supervisor-row" data-supervisor-name="{{ $supervisor->user->getFullName() }}" onclick="window.location='{{ action('UserController@projects', $supervisor->user)}}';">
						<td>{{ $supervisor->user->getFullName() }}</td>
						<td class="text-right">{{ $projectsOnOfferCount }}</td>
					</tr>
				@endif
			@endforeach
		</tbody>
	</table>
</div>
@endsection