@extends('layouts.app')
@section('content')
@section('scripts')
	<script src="{{ asset('js/views/marker-assign.js') }}"></script>
@endsection

<div class="centered width--1200">

	<h1>Automatic Second Marker Assignment</h1>
	<div class="">

		<div id="automatic-assign-container">
			<div class="content"></div>
			<div class="loader-container">
				<div class="loader loader--x-large" style="display: block"></div>
				<p>Generating table...</p>
			</div>
		</div>
	</div>
</div>


@endsection
