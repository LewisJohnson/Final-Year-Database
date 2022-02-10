@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/marker-assign.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1000 bg-white shadow-sm rounded p-4">
	<h2 class="main-title">Second Marker <small class="text-muted">/ Automatic Assignment</small></h2>

	<form class="row" action="{{ action('ProjectAdminController@calculateSecondMarkers') }}" id="calculate-second-markers" method="POST" accept-charset="utf-8">
		
		{{ csrf_field() }}
		
		<div class="col-5">
			<div class="form-inline">
				<div class="form-group mb-2 w-100">
					<label>Max students per marker</label>
					<input type="number" name="max_students_per_supervisor" class="form-control ml-auto" style="width: 100px" value="{{ round(SussexProjects\Supervisor::getAllSupervisorsQuery()->count() / SussexProjects\Http\Controllers\ProjectController::getAcceptedProjectCount()) }}" min="1" max="99">
				</div>

				<div class="form-group mb-2 w-100" title="Keep already assigned 2nd markers">
					<label for="keep_assigned_markers">Keep assigned 2nd markers</label>

					<select name="keep_assigned_markers" class="form-control ml-auto" style="width: 100px">
						<option value="0">No</option>
						<option value="1">Yes</option>
					</select>
				</div>

				<div class="form-group mb-2 w-100" title="Only assign second markers to students with accepted students">
					<label for="only_assign_accepted" >Only assign accepted students</label>

					<select name="only_assign_accepted" class="form-control ml-auto" style="width: 100px">
						<option value="0">No</option>
						<option value="1">Yes</option>
					</select>
				</div>

				<button type="submit" class="ml-auto btn btn-primary">Calculate</button>
			</div>
		</div>

		<div class="col-7">
			<div class="alert alert-warning" role="alert">
				⚠️ Depending on settings, this tool may reset all currently assigned second markers.
			</div>
		</div>
	</form>

	<hr>

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
</div>
@endsection
