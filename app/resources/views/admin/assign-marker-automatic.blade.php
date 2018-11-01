@extends('layouts.app')
@section('content')
@section('scripts')
	<script src="{{ asset('js/views/marker-assign.js') }}"></script>
@endsection

	<div class="centered width--800">
		<h1>Automatic Second Marker Assignment</h1>
		
		<div class="config-tip">
			<p class="text-icon">&#128161;</p>
			<p>Using this tool will reset all currently assigned second markers.</p>
		</div>

		@if(SussexProjects\Http\Controllers\StudentController::getStudentWithoutSecondMarker() === null)
			<div class="config-danger">
				<p class="text-icon">&#9888;&#65039;</p>
				<p><b>Warning!</b> All students already have a second marker assigned to them. <a id="showReportTable" href="#">Click to view second marker report table.</a></p>
			</div>
		@endif

		<div id="automatic-assign-container">
			<div class="content"></div>
			<div class="loader-container">
				<div class="loader loader--x-large" style="display: block"></div>
				<p>Generating table...</p>
			</div>
		</div>
	</div>
@endsection
