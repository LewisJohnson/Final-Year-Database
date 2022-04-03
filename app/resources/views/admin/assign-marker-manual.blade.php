@extends('layouts.app')
@section('pageTitle', 'Manual Marker Assignment')

@section('content')

<div class="centered mw-1200">

	<h2>Second Marker <small class="text-muted">/ Manual Assignment</small></h2>
	<div class="alert alert-info mt-3">
		<span>&#128161;</span>
		<span class="ml-2">
			You can now assign a Second Marker to student without them having a project.<br>
			Select a student, then select a supervisor to be their second marker. Only students with a project will be shown
		</span>
	</div>

	@if(count(SussexProjects\Mode::all()) > 1)
		<div class="form-group">
			<label for="project_year">Project Year <a href="{{ action('UserController@byYear') }}">(Click here for more)</a></label>
			<br>
			<select class="form-control w-auto js-projectYear">
				@foreach(SussexProjects\Mode::all() as $mode)
					<option @if(!empty(Request::get('project_year')) && (Request::get('project_year') == $mode->project_year)) selected @elseif(empty(Request::get('project_year'))) @if(SussexProjects\Mode::getProjectYear() == $mode->project_year) selected @endif @endif data-href="{{ action('ProjectAdminController@manualSecondMarkerView', ['project_year' => $mode->project_year]) }}">{{ $mode->project_year }}</option>
				@endforeach
			</select>
		</div>

		<hr>
	@endif

	<div class="row mt-3">

		{{-- STUDENTS --}}
		<div class="col-8">
			<table class="table table-hover table-sm bg-white data-table shadow-sm sort-table" id="2nd-marker-student-table">
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
						@php
							$project = $student->project;
						@endphp

							<tr class="cursor--pointer" 
									@if(!empty($project)) 
										data-supervisor-id="{{ $project->supervisor->user->id }}" 
										data-supervisor-name="{{ $project->supervisor->user->getFullName() }}"
										data-project-id="{{ $project->id }}"
										data-project-title="{{ $project->title }}"
									@endif

									@if(!empty($student->getSecondMarker())) 
										data-marker-id="{{ $student->getSecondMarker()->id }}" 
									@endif
									data-student-id="{{ $student->user->id }}" data-student-name="{{ $student->getName() }}" 
									>
								<td>{{ $student->getName() }}</td>
								<td>{{ empty($project) ? '-' : $project->title }}</td>
								<td>{{ empty($project) ? '-' : $project->supervisor->user->getFullName() }}</td>

								@if(empty($student->getSecondMarker()))
									<td>None</td>
								@else
									<td>{{ $student->getSecondMarker()->getFullName() }}</td>
								@endif
							</tr>
					@endforeach
				</tbody>
			</table>
		</div>

		{{-- SUPERVISORS --}}
		<div class="col-4">
			<table class="table table-hover table-sm bg-white data-table shadow-sm" style="top: 10px" id="2nd-marker-supervisor-table">
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
			<h4 id="dialog-title" class="text-center p-3 m-0 font-weight-bold">Assign Second Marker</h4>
		</div>

		<div class="alert alert-warning mt-3">
			<span>&#128161;</span><span class="ml-2">Have you selected the correct second marker?</span>
		</div>

		<div class="row mt-4 mb-5">
			<div class="col-5">
				<h5 class="font-weight-bold">Student</h5>
				<p id="student-name"></p>

				<h5 class="font-weight-bold">Project</h5>
				<p id="project-title"></p>
			</div>

			<div class="col-2">
				<h1>&#8594;</h1>
			</div>

			<div class="col-5 text-right">
				<h5 class="font-weight-bold">Supervisor</h5>
				<p id="supervisor-name"></p>

				<h5 class="font-weight-bold">2<sup>nd</sup> Marker</h5>
				<p id="marker-name"></p>
			</div>
		</div>
		
		<div class="footer">
			<button class="btn btn-primary" type="button" id="submitAssignMarker">Assign</button>
		</div>
	</div>
</div>
@endsection
