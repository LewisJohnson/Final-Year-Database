@extends('layouts.app')
@section ('content')

<div class="centered width-800">
@if($user = Auth::user())
	<h1>Welcome, {{ $user->first_name }}.</h1>

	@if($user->isStudent())
		<div class="card card--margin-vertical">
			@if(Session::get("db_type") == "ug")
				<h2>@lang("messages_ug.homepage_introduction_header")</h2>
				<p>@lang("messages_ug.homepage_introduction_body")</p>
				<h2>@lang("messages_ug.homepage_overview_header")</h2>
				<p>@lang("messages_ug.homepage_overview_body")</p>
			@elseif(Session::get("db_type") == "masters")
				<h2>@lang("messages_masters.homepage_introduction_header")</h2>
				<p>@lang("messages_masters.homepage_introduction_body")</p>
				<h2>@lang("messages_masters.homepage_overview_header")</h2>
				<p>@lang("messages_masters.homepage_overview_body")</p>
			@endif
		</div>

		<div class="card card--margin-vertical">
			<h2>Project</h2>
			<p><b>Status:</b> {{ $user->student->getStatusString() }}</p>
			@if($user->student->project_status != 'none')
				@include ('partials.project-preview', array('project'=> $user->student->project))
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
<h2>@lang("messages.homepage_introduction_header")</h2>
<p>@lang("messages.homepage_introduction_body")</p>
<h2>@lang("messages.homepage_overview_header")</h2>
<p>@lang("messages.homepage_overview_body")</p>
@endif

</div>
@endsection
