@extends('layouts.app')
@section('content')
<div class="centered mw-1200">
<h1>Assign a Second Marker</h1>
<h3>Select a student, then select a supervisor to be their second marker.</h3>
<div class="section-container">

	{{-- STUDENTS --}}
	<div class="section horizontal">
		<table class="data-table shadow-2dp" id="2nd-marker-student-table">
			<thead>
				<tr>
					<th>Student</th>
					<th>Project Title</th>
					<th>Supervisor</th>
					<th>Marker</th>
				</tr>
			</thead>
			<tbody>
				@foreach($students as $student)
					@if(!is_null($student->project) && !is_null($student->project->supervisor))
						<tr class="cursor--pointer" data-supervisor-id="{{ $student->project->supervisor->id }}" data-supervisor-name="{{ $student->project->supervisor->user->getFullName() }}" data-student-id="{{ $student->user->id }}" data-student-name="{{ $student->getName() }}" data-project="{{ $student->project->toJson() }}">
							<td>{{ $student->getName() }}</td>
							<td>{{ $student->project->title }}</td>
							<td>{{ $student->project->supervisor->user->getFullName() }}</td>

							@if($student->marker != null)
								<td>{{ $student->marker->user->getFullName() }}</td>
							@else
								<td>None</td>
							@endif
						</tr>
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
					<th>Load</th>
				</tr>
			</thead>
			<tbody>
				@foreach($supervisors as $supervisor)
					<tr class="cursor--pointer" tabindex="0" data-marker-id="{{ $supervisor->id }}" data-marker-name="{{ $supervisor->user->getFullName() }}" disabled>
						<td>{{ $supervisor->user->getFullName() }}</td>
						<td>{{ $supervisor->getProjectLoad() }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</div>
</div>
</div>

<div id="assign-dialog" class="dialog assign marker-dialog" data-dialog="assign">
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

		<div class="footer footer--dark">
			<button id="submitAssignMarker" type="button" class="button button--raised button--accent">ASSIGN MARKER</button>
		</div>
		
	</div>
</div>
@endsection
