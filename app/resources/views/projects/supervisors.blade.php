@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/supervisor-report.js') }}"></script>
@endsection

@section('content')
<div class="centered width--800">
	<h1>Projects by Supervisor</h1>
	<h3>Select a supervisor to see their projects.</h3>
	@include('supervisors.partials.supervisor-search')

	<table class="data-table shadow-2dp">
		<thead>
			<tr>
				<th>Supervisor</th>
				<th>Projects</th>
			</tr>
		</thead>
		<tbody>
			@foreach($supervisors as $supervisor)
			{{ dump($supervisor) }}
			{{ dd($supervisor->user->id) }}
				@if(count($supervisor->getProjectsByStatus('on-offer')) > 0)
					<tr class="pointer" tabindex="0" id="{{ preg_replace('/[\s.]+/', '', $supervisor->user->getFullName()) }}" onclick="window.location='{{ action('ProjectController@bySupervisor', $supervisor->id)}}';">
						<td>{{ $supervisor->user->getFullName() }}</td>
						<td>{{ count($supervisor->getProjectsByStatus('on-offer')) }}</td>
					</tr>
				@endif
			@endforeach
		</tbody>
	</table>
</div>
@endsection