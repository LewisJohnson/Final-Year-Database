@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@section ('content')
	<div class="centered width--1000">
		<div class="fancy-page">
			<h1>{{ ucfirst(Session::get('education_level')["longName"]) }} Supervisor</h1>
			<p class="subtitle">Your {{ Session::get('education_level')["longName"] }} project load is currently {{ Auth::user()->supervisor->getProjectLoad() }}.</p>
		</div>

		@if(SussexProjects\Mode::getSupervisorAcceptDate()->gt(\Carbon\Carbon::now()))
			<p class="config-tip">You may not accept student offers until {{ SussexProjects\Mode::getSupervisorAcceptDate(true) }}</p>
		@endif

		<div class="supervisor hub">
			@include('supervisors.partials.hub.interested-students')
			@include('supervisors.partials.hub.accepted-students')
		</div>
	</div>
@endsection