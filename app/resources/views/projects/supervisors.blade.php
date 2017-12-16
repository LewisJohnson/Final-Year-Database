@extends('layouts.app')
@section('content')
<div class="centered width-800">
<h1>Supervisors</h1>
<h3>Select a supervisor to see their projects.</h3>

<table class="data-table shadow-2dp">
	<thead>
		<tr>
			<th>Supervisor</th>
			<th>Projects</th>
		</tr>
	</thead>
	<tbody>
	@foreach($supervisors as $supervisor)
		@if(count($supervisor->getProjectsByStatus('on-offer')) > 0)
		<tr class="pointer" tabindex="0" onclick="window.location='{{ action('ProjectController@bySupervisor', $supervisor->id)}}';">
			<td>{{ $supervisor->user->getFullName() }}</td>
			<td>{{ count($supervisor->getProjectsByStatus('on-offer')) }}</td>
		</tr>
		@endif
	@endforeach
	</tbody>
</table>
</div>
@endsection