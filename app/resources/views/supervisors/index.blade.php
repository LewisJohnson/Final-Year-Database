@extends('layouts.app')
@section ('content')
@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

<div class="centered width--1000 hub-container">
	<div class="header">
		@include('svg.shield')
		<div class="title">
			<h1>{{ lang_sess("supervisor_hub_title") }}</h1>
			@if(Session::get('education_level') == 'ug')
				<p>Your <b>Undergraduate</b> project load is currently {{ Auth::user()->supervisor->project_load_ug }}.</p>
			@elseif(Session::get('education_level') == 'masters')
				<p>Your <b>Masters</b> project load is currently {{ Auth::user()->supervisor->project_load_pg }}.</p>
			@endif
		</div>
	</div>
	<div class="supervisor hub">
		@include('supervisors.partials.hub.selected-students')
		@include('supervisors.partials.hub.accepted-students')
		@include('supervisors.partials.hub.projects')
		{{-- @include('supervisors.partials.hub.supervising-students') --}}
	</div>
</div>
@endsection
