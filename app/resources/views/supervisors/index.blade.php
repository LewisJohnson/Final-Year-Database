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
			@if(Session::get('db_type') == 'ug')
				<p>Your <b>Undergraduate</b> project load is currently {{ Auth::user()->supervisor->project_load_ug }}.</p>
			@elseif(Session::get('db_type') == 'masters') 
				<p>Your <b>Masters</b> project load is currently {{ Auth::user()->supervisor->project_load_masters }}.</p>
			@endif
		</div>
		<div class="actions button-group--vertical">
			<a class="button button--raised button--accent" title="Create new project" href="{{ action('ProjectController@create') }}">New Project</a>
			<a class="button button--raised button--accent" title="Browse all transactions for your projects" href="{{ action('SupervisorController@transactions') }}">Transactions</a>
		</div>
	</div>
	<div class="supervisor hub">
		@include('supervisors.partials.hub.offers')
		@include('supervisors.partials.hub.accepted-students')
		@include('supervisors.partials.hub.projects')
	</div>
</div>
@endsection
