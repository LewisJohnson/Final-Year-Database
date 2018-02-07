@extends('layouts.app')
@section('content')

<div class="centered width-800">
	@if(Auth::check())
		<h1>Welcome, {{ Auth::user()->first_name }}.</h1>
		<p>Your privileges are {{ $user->getPrettyPrivilegesString() }}</p>

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
				<h2>@lang_sess("homepage_introduction_header")</h2>
				<p>@lang_sess("homepage_introduction_body")</p>
				<h2>@lang_sess("homepage_overview_header")</h2>
				<p>@lang_sess("homepage_overview_body")</p>
			</div>
		@endif

		@if(Auth::user()->isSupervisor())
		<div class="card-container card--margin-vertical">
			<div class="card card--half">
				<h2>Undergraduate Supervisor</h2>
				<p>Project Load: {{ Auth::user()->supervisor->project_load_ug }}</p>
				@include('svg.file')
				<p>Accept students: {{ Auth::user()->supervisor->take_students_ug ? "Yes" : "No" }}</p>
				@include('svg.school')
				<a class="button button--raised" href="{{ action('SupervisorController@index') }}">Undergraduate Supervisor Hub</a>
			</div>

			<div class="card card--half">
				<h2>Masters Supervisor</h2>
				<p>Project Load: {{ Auth::user()->supervisor->project_load_masters }}</p>
				<p>Accept students: {{ Auth::user()->supervisor->project_load_masters ? "Yes" : "No" }}</p>
				<a class="button button--raised" href="{{ action('SupervisorController@index') }}">Masters Supervisor Hub</a>
			</div>
		</div>
		@endif

{{-- 		@if(Auth::user()->isStudent())
			<div class="card card--margin-vertical">
				<h2>Your Project</h2>
				<p><b>Status:</b> {{ Auth::user()->student->getStatusString() }}</p>
				@if(Auth::user()->student->project_status != 'none')
					@include ('projects.partials.student-project-preview', array('project'=> Auth::user()->student->project))
				@endif
			</div>

			<div class="card card--margin-vertical" style="border: 1px solid gold; background: rgba(255, 215, 0, 0.5)">
				<h2>Favourite Projects</h2>
				@if($projects = Auth::user()->student->getFavouriteProjects())
					<table id="project-table" class="data-table table--dark-head">
						<thead>
							<tr>
								<th>Topic</th>
								<th>Project Title</th>
								<th class="mobile--hidden">Skills</th>
								<th>Supervisor</th>
							</tr>
						</thead>
						<tbody>
							@include('projects.partials.project-table-row', ['view' => 'index'])
						</tbody>
					</table>
				@else
					<p title="Simple press the star in the upper right corner on a project page to add it to your favourites.">You haven't added any projects to your favourites yet.</p>
				@endif
			</div>

			<div class="card card--margin-vertical">
				<h2>Options</h2>
				<p>You may hide your name from other students in the supervisor report.</p>
				<form id="share-project-form" class="form form--flex" action="{{ action('StudentController@shareProject') }}" method="POST" accept-charset="utf-8">
					{{ csrf_field() }}
					<div class="form-field">
						<div class="checkbox">
							<input onChange="$('#share-project-form').submit();" type="checkbox" name="share_project" id="share_project" @if(Auth::user()->student->share_project) checked @endif >
							<label for="share_project">Share name</label>
						</div>
					</div>
				</form>
			</div>
			@endif
		@endif --}}
	@else
		<h1>Welcome.</h1>
		<div class="card card--margin-vertical">
			<h2>@lang("messages.homepage_introduction_header")</h2>
			<p>@lang("messages.homepage_introduction_body")</p>
			<h2>@lang("messages.homepage_overview_header")</h2>
			@lang("messages.homepage_overview_body")
		</div>
	@endif
</div>
@endsection
