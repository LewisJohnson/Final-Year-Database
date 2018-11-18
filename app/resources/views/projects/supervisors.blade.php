@extends('layouts.app')

@section('content')
<div class="centered width--800">
	<h1>Projects by Supervisor</h1>
	<h3>Select a supervisor to see their projects.</h3>
	@include('supervisors.partials.supervisor-filter')

	<table class="data-table sort-table shadow-2dp">
		<thead>
			<tr>
				<th>Supervisor</th>
				<th>Projects</th>
			</tr>
		</thead>
		<tbody>
			@foreach($supervisors as $supervisor)
				@if(count($supervisor->getProjects('on-offer')) > 0)
					<tr class="pointer supervisor-row" data-supervisor-name="{{ $supervisor->user->getFullName() }}" onclick="window.location='{{ action('UserController@projects', $supervisor->user)}}';">
						<td>{{ $supervisor->user->getFullName() }}</td>
						<td>{{ count($supervisor->getProjects('on-offer')) }}</td>
					</tr>
				@endif
			@endforeach
		</tbody>
	</table>
</div>
@endsection