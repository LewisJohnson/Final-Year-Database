@extends('layouts.app')
@section ('content')

<div class="centered width-800">
@if($user = Auth::user())
	<h1>Welcome, {{ Auth::user()->first_name }}.</h1>
	 @if($user->student !== null)
		<p><b>Status:</b> {{ $user->student->getStatusString() }}</p>

		@if($user->student->project_status == 'selected' | $user->student->project_status == 'accepted')
			@include ('partials.project-preview', array('project'=> $user->student->getProject()))
		@endif
	@endif 
@else
<h2>@string("homepage_introduction_header")</h2>
<p>@string("homepage_introduction_body")</p>

<h2>@string("homepage_overview_header")</h2>
<p> @string("homepage_overview_body") </p>
@endif

</div>
@endsection