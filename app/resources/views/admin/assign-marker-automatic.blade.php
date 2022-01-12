@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/marker-assign.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1000">
	<h2>Second Marker <small class="text-muted">/ Automatic Assignment</small></h2>
	
	@if(SussexProjects\Student::getAllStudentsWithoutProjectCount() > 0)
		<div class="alert alert-primary" role="alert">
			&#128161;
			This page is unavailable until all students have been accepted for a project.<br>
			&nbsp; &nbsp; <b>There are still {{ SussexProjects\Student::getAllStudentsWithoutProjectCount() }} students without a project.</b>
		</div>
	@else
		<div class="alert alert-warning" role="alert">
			⚠️ Using this tool will reset all currently assigned second markers.
		</div>

		@if($allProjectsHaveMarkerAssigned)
			<div class="alert alert-danger" role="alert">
				&#9888;&#65039;
				<b>Warning!</b> All projects already have a second marker assigned to them. <a id="show-automatic-assignment-report" href="#">Click to view second marker report table.</a>
			</div>
		@endif

		<div>
			<div id="automatic-assign-content" class="content"></div>
			<div id="loader-container" class="text-center my-5 py-5">
				<div class="spinner spinner-border text-primary"></div>
				<p>Generating table...</p>
			</div>
		</div>

		<br>

		<form action="{{ action('ProjectAdminController@calculateSecondMarkers') }}" id="calculate-second-markers" method="POST" accept-charset="utf-8">
			
			{{ csrf_field() }}
			<div class="text-right w-20 ml-auto">
				<div class="form-group">
					<label>Max students per marker</label>
					<input type="number" name="max_students_per_supervisor" class="form-control" value="{{ round(SussexProjects\Supervisor::getAllSupervisorsQuery()->count() / SussexProjects\Http\Controllers\ProjectController::getAcceptedProjectCount()) }}" min="1" max="99">
				</div>

				<button type="submit" class="btn btn-primary">Calculate</button>
			</div>
		</form>
	@endif
</div>
@endsection
