@extends('layouts.app')
@section('pageTitle', 'Assign Project')

@section('scripts')
	<script src="{{ asset('js/views/admin/assign-student-project.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1000 bg-white shadow-sm rounded p-4">

	<h2 class="main-title">Students <small class="text-muted">/ Assign Project</small></h2>

	<form class="row" role="form" method="GET" action="{{ action('ProjectAdminController@assignProjectView') }}">
		{{ csrf_field() }}

		<div class="col-4">
			<div class="form-inline">
				<div class="form-group mb-2 w-100">
					<label>Project Year</label>
					
					<select name="project_year" class="form-control ml-auto" style="width: 100px" onchange="submit()">
						@foreach(SussexProjects\Mode::all() as $mode)
							<option 
								@if(old('project_year') == $mode->project_year) selected @endif
								data-href="{{ action('ProjectAdminController@assignProjectView', ['project_year' => $mode->project_year]) }}">
								{{ $mode->project_year }}
							</option>
						@endforeach
					</select>
				</div>
	
				<div class="form-group mb-2 w-100">
					<label>Students with Projects</label>
					
					<select name="students_with_project" class="form-control ml-auto" style="width: 100px" onchange="submit()">
						<option value="0" @if (old('students_with_project') == false) selected="selected" @endif>Hide</option>
						<option value="1" @if (old('students_with_project') == true) selected="selected" @endif>Show</option>
					</select>
				</div>
	
				<div class="form-group w-100">
					<label>Accepted Projects</label>
					
					<select name="accepted_projects" class="form-control ml-auto" style="width: 100px" onchange="submit()">
						<option value="0" @if (old('accepted_projects') == false) selected="selected" @endif>Hide</option>
						<option value="1" @if (old('accepted_projects') == true) selected="selected" @endif>Show</option>
					</select>
				</div>
			</div>
		</div>
		
		<div class="col-8">
			<div class="alert alert-info">
				<span>💡</span>
				<span class="ml-2">Select a student, then select a project to assign to them.</span><br>
				<span class="ml-4">Archived projects are not shown.</span>
			</div>
		</div>
	</form>

	<hr>
		
	<div class="row mt-3">

		{{-- STUDENTS --}}
		<div class="col-4">
			<table class="table table-hover table-sm bg-white data-table shadow-sm sort-table" id="APTSStudentTable">
				<thead>
					<tr>
						<th>Student</th>
						<th class="text-right">Has Project</th>
					</tr>
				</thead>
				<tbody>
					@foreach($students as $student)
						<tr class="cursor--pointer {{ empty($student->project) ? '' : 'bg-danger text-white' }}"
							data-student-id="{{ $student->user->id }}" 
							data-student-name="{{ $student->getName() }}"
							data-has-project="{{ empty($student->project) ? 'false' : 'true' }}"
							style="opacity: {{ empty($student->project) ? '1' : '0.4' }}" >

							<td>{{ $student->getName() }}</td>

							<td class="text-right">{{ empty($student->project) ? 'No' : 'Yes' }}</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>

		{{-- PROJECTS --}}
		<div class="col-8">
			<div id="StudentAlreadyHasProjectAssignedToThem" class="alert alert-danger" role="alert" style="display: none">
				⚠️ <b>Warning!</b> The selected student already has a project assigned to them.</a>
			</div>

			<table class="table table-hover table-sm bg-white data-table shadow-sm" style="top: 10px" id="APTSProjectTable">
				<thead>
					<tr>
						<th>Supervisor</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					@foreach($projects as $project)
						<tr class="cursor--pointer {{ empty($project->getAcceptedStudent()) ? '' : 'bg-danger text-white' }}" tabindex="0" 
						data-project-id="{{ $project->id }}" 
						data-project-title="{{ $project->title }}" 
						data-supervisor-name="{{ $project->supervisor->user->getFullName() }}" 
						style="opacity: {{ empty($project->getAcceptedStudent()) ? '1' : '0.4' }}"
						disabled>
							<td>{{ $project->supervisor->user->getFullName() }}</td>
							<td>{{ $project->title }}</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>
</div>

<div id="AssignProjectModal" class="dialog" data-dialog="assign">
	<div class="container">
		<div class="border-bottom">
			<h4 class="text-center p-3 m-0 font-weight-bold">Assign Project to Student</h4>
		</div>

		<div class="alert alert-warning mt-3">
			<span>&#128161;</span>
			<span class="ml-2">
				Have you selected the correct project?
			</span>

			<ul class="mb-0 mt-2">
				<li>An email will <b>NOT</b> be sent to the student.</li>
				<li>The project selection date <b>WILL</b> be ignored.</li>
				<li>All other students will be <b>REJECTED</b> for this project.</li>
				<li>All related project evaluations will be <b>DELETED</b>.</li>
			</ul>
		</div>

		<div class="row mt-4 mb-5">
			<div class="col-5">
				<h5 class="font-weight-bold">Student</h5>
				<p id="StudentName"></p>
			</div>

			<div class="col-2">
				<h1>&#8594;</h1>
			</div>

			<div class="col-5 text-right">
				<h5 class="font-weight-bold">Supervisor</h5>
				<p id="SupervisorName"></p>

				<h5 class="font-weight-bold">Project</h5>
				<p id="ProjectTitle"></p>
			</div>
		</div>
		
		<div class="footer">
			<button class="btn btn-primary" type="button" id="SubmitAssignProjectButton">Assign</button>
		</div>
	</div>
</div>
@endsection
