@extends('layouts.app')
@section('content')

<div class="centered mw-1200">
	<h1>Manual Second Marker Assignment</h1>
	<h5>Select a student, then select a supervisor to be their second marker.</h5>

	<div class="row mt-3">

		{{-- STUDENTS --}}
		<div class="col-8">
			<table class="table table-hover table-sm bg-white data-table shadow-2dp sort-table" id="2nd-marker-student-table">
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
							<tr class="cursor--pointer" 
									data-supervisor-id="{{ $student->project->supervisor->id }}" data-supervisor-name="{{ $student->project->supervisor->user->getFullName() }}"
									data-student-id="{{ $student->user->id }}" data-student-name="{{ $student->getName() }}" 
									data-project-id="{{ $student->project->id }}" data-project-title="{{ $student->project->title }}">
								<td>{{ $student->getName() }}</td>
								<td>{{ $student->project->title }}</td>
								<td>{{ $student->project->supervisor->user->getFullName() }}</td>

								@if(empty($student->project->marker))
									<td>None</td>
								@else
									<td>{{ $student->project->marker->user->getFullName() }}</td>
								@endif
							</tr>
						@endif
					@endforeach
				</tbody>
			</table>
		</div>

		{{-- SUPERVISORS --}}
		<div class="col-4">
			<table class="table table-hover table-sm bg-white data-table shadow-2dp" id="2nd-marker-supervisor-table">
				<thead>
					<tr>
						<th>Supervisor</th>
						<th class="text-right">Load</th>
						<th class="text-right">Accepted</th>
					</tr>
				</thead>
				<tbody>
					@foreach($supervisors as $supervisor)
						<tr class="cursor--pointer" tabindex="0" data-marker-id="{{ $supervisor->id }}" data-marker-name="{{ $supervisor->user->getFullName() }}" disabled>
							<td>{{ $supervisor->user->getFullName() }}</td>
							<td class="text-right">{{ $supervisor->getProjectLoad() }}</td>
							<td class="text-right">{{ count($supervisor->getAcceptedStudents()) }}</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>
</div>

<div id="assign-dialog" class="dialog" data-dialog="assign">
	<div class="container">
		<div class="border-bottom">
			<h4 id="dialog-title" class="text-center p-3 m-0 font-weight-bold">ASSIGN</h4>
		</div>

		<div class="row mt-4">
			<div class="col-5">
				<h5>Student</h5>
				<p id="student-name"></p>

				<h5>Project</h5>
				<p id="project-title"></p>
			</div>

			<div class="col-2">
				<h1>&#8594;</h1>
			</div>

			<div class="col-5 text-right">
				<h5>Supervisor</h5>
				<p id="supervisor-name"></p>

				<h5>2<sup>nd</sup> Marker</h5>
				<p id="marker-name"></p>
			</div>
		</div>
		
		<div class="row mt-5">
			<div class="col-12 bg-light border-top">
				<div class="p-2 text-right">
					<button class="btn btn-primary" type="button" id="submitAssignMarker">ASSIGN MARKER</button>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
