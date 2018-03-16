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
			<p>Your <b>{{ Session::get('education_level') }}</b> project load is currently {{ Auth::user()->supervisor['project_load_'.Session::get('education_level')] }}.</p>
		</div>
	</div>
	<div class="supervisor hub">
		@include('supervisors.partials.hub.selected-students')
		@include('supervisors.partials.hub.accepted-students')
		@include('supervisors.partials.hub.projects')
		@include('supervisors.partials.hub.supervising-students')
	</div>
</div>
@endsection
