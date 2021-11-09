@extends('layouts.app')
@section('content')

<div class="centered mw-1200">

	<h2>Second Marker <small class="text-muted">/ Manual Assignment</small></h2>
	<div class="alert alert-info mt-3">
		<span>&#128161;</span><span class="ml-2">Select a student, then select a supervisor to be their second marker. Only students with a project will be shown</span>
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
						<tr class="cursor--pointer" 
							@if(!empty($student->project) && !empty($student->project->supervisor))
								data-supervisor-id="{{ $student->project->supervisor->id }}"
								data-supervisor-name="{{ $student->project->supervisor->user->getFullName() }}"

								@if($student->project_status != 'accepted')
									data-show-warning="true"
								@endif
							@endif

							@if(!empty($student->project) && !empty($student->project->marker))
								data-marker-id="{{ $student->project->marker->id }}" 
							@endif

							@if(!empty($student->project) && $student->project_status == 'accepted')
								data-project-id="{{ $student->project->id }}" 
								data-project-title="{{ $student->project->title }}"
							@endif

							data-student-id="{{ $student->user->id }}" 
							data-student-name="{{ $student->getName() }}" 
						>
							<td>{{ $student->getName() }}</td>
							<td>{{ empty($student->project) ? '-' : $student->project->title }}</td>
							<td>{{ (empty($student->project) || empty($student->project->supervisor)) ? '-' : $student->project->supervisor->user->getFullName() }}</td>

							@if(empty($student->project->marker))
								<td>None</td>
							@else
								<td>{{ $student->project->marker->user->getFullName() }}</td>
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
			<span>💡</span><span class="ml-2">Have you selected the correct second marker?</span>
		</div>

		<div id="AssignModalNotAcceptedWarning" class="alert alert-danger mt-3" style="display: none">
			<span>⚠️</span>
			<span class="ml-2">
				<b>WARNING:</b> This student has not been accepted for this project.
				Assigning them a Second Marker will remove their current project selection and assign them a temporary project.
			</span>
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
