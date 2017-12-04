@extends('layouts.app')
@section ('content')

@if (session('openLogin'))
    //some js function that will open your hidden modal
    //if you use bootstrap modal
    <script>
       console.log("dddd");
    </script>
@endif

<div class="centered width-800">
@if($user = Auth::user())
	<h1>Welcome, {{ Auth::user()->first_name }}.</h1>
	<h2>@string("homepage_introduction_header", Session::get("db_type"))</h2>
	<p>@string("homepage_introduction_body", Session::get("db_type"))</p>
	<h2>@string("homepage_overview_header", Session::get("db_type"))</h2>
	<p>@string("homepage_overview_body", Session::get("db_type"))</p>
	@if($user->isStudent())
		<p><b>Status:</b> {{ $user->student->getStatusString() }}</p>
		@if($user->student->project_status != 'none')
			<h2>Project</h2>
			@include ('partials.project-preview', array('project'=> $user->student->getProject()))
		@endif

		<h2>Options</h2>
		{{-- AJAX --}}
		<p>You may hide your name from other students.</p>
		<form id="share-project-form" action="{{ url('/students/shareProject') }}" method="POST" accept-charset="utf-8">
		{{csrf_field()}}
		{{ method_field('PATCH') }}
		<div class="form-field">
			<div class="checkbox">
				<input onclick="event.preventDefault();document.getElementById('share-project-form').submit();" type="checkbox" name="share_project" id="share_project" @if($user->student->share_project) checked @endif >
				<label for="share_project">Share name</label>
			</div>
		</div>
		</form>
	@endif 
@else
<h2>@string("homepage_introduction_header")</h2>
<p>@string("homepage_introduction_body")</p>
<h2>@string("homepage_overview_header")</h2>
<p> @string("homepage_overview_body") </p>
@endif

</div>
@endsection