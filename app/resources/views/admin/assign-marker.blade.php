@extends('layouts.app')
@section('content')
<div class="centered width-1200">
<h1>Assign a Second Marker</h1>
<h3>Select a student, then select a supervisor.</h3>
<p>Only students with a project accepted will be displayed.<br>If a project already has a 2nd marker, it will not be displayed.</p>
<div class="section-container">

	{{-- STUDENTS --}}
	<div class="section horizontal">
		<table class="data-table shadow-2dp" id="2nd-marker-student-table">
			<thead>
				<tr>
					<th>Student</th>
					<th>Project Title</th>
				</tr>
			</thead>
			<tbody>
			@foreach($students as $student)
				@if($student->project != null)
					@if($student->project->marker == null)
						<tr class="pointer" tabindex="0" data-supervisor-id="{{ $student->project->supervisor->id }}" data-supervisor-name="{{ $student->project->supervisor->user->getFullName() }}" data-student-name="{{ $student->user->getFullName() }}" data-project="{{ $student->project->toJson() }}">
							<td>{{ $student->user->getFullName() }}</td>
							<td>{{ $student->project->title }}</td>
						</tr>
					@endif
				@endif
			@endforeach
			</tbody>
		</table>
	</div>

	{{-- SUPERVISORS --}}
	<div class="section horizontal">
		<table class="data-table shadow-2dp" id="2nd-marker-supervisor-table">
			<thead>
				<tr>
					<th>Supervisor</th>
				</tr>
			</thead>
			<tbody>
			@foreach($supervisors as $supervisor)
				@if(count($supervisor->getProjectsByStatus('on-offer')) > 0)
					<tr class="pointer" tabindex="0" data-marker-id="{{ $supervisor->id }}" data-marker-name="{{ $supervisor->user->getFullName() }}" disabled>
						<td>{{ $supervisor->user->getFullName() }}</td>
					</tr>
				@endif
			@endforeach
			</tbody>
		</table>
	</div>
</div>
</div>

<div id="assign-dialog" class="dialog assign" data-dialog="assign">
	<div class="header">
		<h2>ASSIGN</h2>
	</div>

	<div class="content" style="padding: 1rem;">
		<div class="section-container">
			<div>
				<h3>Student</h3>
				<p id="student-name"></p>
			</div>

			<div class="arrow">
				<p>&#8594;</p>
			</div>

			<div style="text-align: right;">
				<h3>Supervisor</h3>
				<p id="supervisor-name"></p>
			</div>
		</div>

		<div style="text-align: right;">
			<h3>2nd Marker</h3>
			<p id="marker-name"></p>
		</div>

		<h3>Project</h3>
		<p id="project-title"></p>
		<p id="project-description"></p>

		<button id="submitAssignMarker" type="button" class="button button--raised button--accent">ASSIGN MARKER</button>
	</div>
</div>
@endsection