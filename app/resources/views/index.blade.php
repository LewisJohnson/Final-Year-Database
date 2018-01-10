@extends('layouts.app')
@section('content')

<div class="centered width-800">
@if($user = Auth::user())
	<h1>Welcome, {{ $user->first_name }}.</h1>

	@if($user->isSupervisorOrSuperior())
		<div class="card card--margin-vertical">
			<h2>@lang("messages_supervisor.homepage_introduction_header")</h2>
			<p>@lang("messages_supervisor.homepage_introduction_body")</p>
			<h2>@lang("messages_supervisor.homepage_overview_header")</h2>
			<p>@lang("messages_supervisor.homepage_overview_body")</p>
		</div>
	@endif
	@if($user->isStudent())
		<div class="card card--margin-vertical">
			<h2>@lang_sess("homepage_introduction_header")</h2>
			<p>@lang_sess("homepage_introduction_body")</p>
			<h2>@lang_sess("homepage_overview_header")</h2>
			<p>@lang_sess("homepage_overview_body")</p>
		</div>

		<div class="card card--margin-vertical">
			<h2>Project</h2>
			<p><b>Status:</b> {{ $user->student->getStatusString() }}</p>
			@if($user->student->project_status != 'none')
				@include ('partials.project-preview', array('project'=> $user->student->project))
			@endif
		</div>

		<div class="card card--margin-vertical" style="border: 1px solid gold; background: rgba(255, 215, 0, 0.5)">
			<h2>Favourite Projects</h2>
			@if($projects = $user->student->getFavouriteProjects())
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
			<p>You may hide your name from other students.</p>
			<form id="share-project-form" class="form form--flex" action="{{ url('/students/project-share') }}" method="POST" accept-charset="utf-8">
				{{csrf_field()}}
				{{ method_field('PATCH') }}
				<div class="form-field">
					<div class="checkbox">
						<input onclick="event.preventDefault();document.getElementById('share-project-form').submit();" type="checkbox" name="share_project" id="share_project" @if($user->student->share_project) checked @endif >
						<label for="share_project">Share name</label>
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
		@lang("messages.homepage_overview_body")
	</div>
@endif

</div>
@endsection
