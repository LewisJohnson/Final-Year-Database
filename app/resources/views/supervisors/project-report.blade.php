@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@section ('content')
	<div class="centered width--1000 hub-container">
		<div class="header">
			<div>
				<h1>{{ Session::get('education_level')["longName"] }} Supervisor</h1>
				<p>Your <b>{{ Session::get('education_level')["longName"] }}</b> project load is currently {{ Auth::user()->supervisor->getProjectLoad() }}.</p>
			</div>
		</div>
		<div class="supervisor hub">
			@include('supervisors.partials.hub.selected-students')
			@include('supervisors.partials.hub.accepted-students')
			{{-- @include('supervisors.partials.hub.supervising-students') --}}
		</div>
	</div>
@endsection