@extends('layouts.app')
@section('content')

<div class="centered animate-cards width--1000">
	@if(Auth::check())
		<h1>Welcome, {{ Auth::user()->first_name }}.</h1>
		<p>Your privileges are {{ Auth::user()->getPrettyPrivilegesString() }}.</p>

		@if(Auth::user()->isSupervisor())
			<div class="card card--margin-vertical">
				<h2>@lang("messages_supervisor.homepage_introduction_header")</h2>
				<p>@lang("messages_supervisor.homepage_introduction_body")</p>
				<h2>@lang("messages_supervisor.homepage_overview_header")</h2>
				<p>@lang("messages_supervisor.homepage_overview_body")</p>
			</div>
		@endif

		@if(Auth::user()->isStudent())
			<div class="card card--margin-vertical">
				<h2>{{ lang_sess('homepage_introduction_header') }}</h2>
				<p>{{ lang_sess('homepage_introduction_body') }}</p>
				<h2>{{ lang_sess('homepage_overview_header') }}</h2>
				<p>{{ lang_sess('homepage_overview_body') }}</p>
			</div>
		@endif

		<div class="card-container card--margin-vertical">
			@if(Auth::user()->isSupervisor())
				<div class="card card--half">
					<h2>Undergraduate Supervisor</h2>
					<p>Project Load: {{ Auth::user()->supervisor->project_load_ug }}</p>
					<p>Accepted students: {{ count(Auth::user()->supervisor->getAcceptedStudents("ug")) }} </p>
					<p>Accept students: {{ Auth::user()->supervisor->take_students_ug ? "Yes" : "No" }}</p>
					<p>Accept emails: {{ Auth::user()->supervisor->accept_email_ug ? "Yes" : "No" }}</p>
					<a class="button button--raised" href="{{ action('SupervisorController@index') }}">Undergraduate Supervisor Hub</a>
				</div>

				<div class="card card--half">
					<h2>Masters Supervisor</h2>
					<p>Project Load: {{ Auth::user()->supervisor->project_load_masters }}</p>
					<p>Accepted students: {{ count(Auth::user()->supervisor->getAcceptedStudents("masters")) }} </p>
					<p>Accept students: {{ Auth::user()->supervisor->project_load_masters ? "Yes" : "No" }}</p>
					<p>Accept emails: {{ Auth::user()->supervisor->accept_email_masters ? "Yes" : "No" }}</p>
					<a class="button button--raised" href="{{ action('SupervisorController@index') }}">Masters Supervisor Hub</a>
				</div>
			@endif

			@if(Auth::user()->isUgAdmin())
				<div class="card card--half">
					<h2>Undergraduate Administrator</h2>
					<p>{{ Auth::user()->first_name }}, you are an undergraduate administrator. Take a look at the hub to see what actions you can perform.</p>
					<a class="button button--raised" href="{{ action('AdminController@index') }}">Undergraduate Administrator Hub</a>
				</div>
			@endif

			@if(Auth::user()->isMastersAdmin())
				<div class="card card--half">
					<h2>Masters Administrator</h2>
					<p>{{ Auth::user()->first_name }}, you are a masters administrator. Take a look at the hub to see what actions you can perform.</p>
					<a class="button button--raised" href="{{ action('AdminController@index') }}">Masters Administrator Hub</a>
				</div>
			@endif

			@if(Auth::user()->isSystemAdmin())
				<div class="card card--half">
					<h2>System Administrator</h2>
					<p>{{ Auth::user()->first_name }}, you are a system administrator. Take a look at the system dashboard to see what actions you can perform.</p>
					<a class="button button--raised" href="{{ action('AdminController@dashboard') }}">System Dashboard</a>
				</div>
			@endif
		</div>

		@if(Auth::user()->isStudent())
			<div class="card card--margin-vertical">
				<h2>Your Project</h2>
				<p><b>Status:</b> {{ Auth::user()->student->getStatusString() }}</p>
				@if(Auth::user()->student->project_status != 'none')
					@include ('projects.partials.student-project-preview', array('project'=> Auth::user()->student->project))
				@endif
			</div>

			<div class="card card--margin-vertical">
				<h2>Favourite Projects</h2>
				@if($projects = Auth::user()->student->getFavouriteProjects())
					<div class="favourite-projects flex flex--row flex--wrap">
						@foreach($projects as $project)
							<a href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a>
						@endforeach	
					</div>
				@else
					<p title="Simply press the star in the upper right corner on a project page to add it to your favourites.">You haven't added any projects to your favourites yet.</p>
				@endif
			</div>

			<div class="card card--margin-vertical">
				<h2>Options</h2>
				<p>You may hide your name from other students in the supervisor report.</p>
				<form id="share-project-form" class="form form--flex" action="{{ action('StudentController@shareName') }}" method="POST" accept-charset="utf-8">
					{{ csrf_field() }}
					<div class="form-field">
						<div class="checkbox">
							<input onChange="$('#share-project-form').submit();" type="checkbox" name="share_name" id="share_name" @if(Auth::user()->student->share_name) checked @endif >
							<label for="share_name">Share name</label>
						</div>
					</div>
				</form>
			</div>
		@endif
	@else
		<h1>Welcome.</h1>
		<div class="card card--margin-vertical">
			<h2>@lang("messages.homepage_introduction_header")</h2>
			<p>@lang("messages.homepage_introduction_body")</p>
			<h2>@lang("messages.homepage_overview_header")</h2>
			<p>@lang("messages.homepage_overview_body")</p>
		</div>
	@endif
</div>
@endsection
