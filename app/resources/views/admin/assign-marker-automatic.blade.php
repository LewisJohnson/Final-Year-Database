@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/marker-assign.js') }}"></script>
@endsection

@section('content')
	<div class="centered mw-800">
		<h1>Automatic Second Marker Assignment</h1>
		
		<div class="config-tip">
			<p class="text-icon">&#128161;</p>
			<p>Using this tool will reset all currently assigned second markers.</p>
		</div>

		@if(SussexProjects\Http\Controllers\ProjectController::getAccetpedProjectWithoutSecondMarker() === null)
			<div class="config-danger">
				<p class="text-icon">&#9888;&#65039;</p>
				<p><b>Warning!</b> All students already have a second marker assigned to them. <a id="showReportTable" href="#">Click to view second marker report table.</a></p>
			</div>
		@endif

		<div id="automatic-assign-container">
			<div class="content"></div>
			<div class="loader-container">
				<div class="spinner spinner-border spinner-border-lg"></div>
				<p>Generating table...</p>
			</div>
		</div>

		<br>

		<form action="{{ action('ProjectAdminController@calculateSecondMarkers') }}" id="calculateSecondMarkers" method="POST" accept-charset="utf-8">
			{{ csrf_field() }}

			<div class="form-field">
				<label>Maximum amount of students per marker</label>
				<input type="number" name="max_students_per_supervisor" value="10" min="0" max="99">
			</div>

			<button type="submit" class="button button--accent">Calculate</button>
		</form>
	</div>
@endsection
