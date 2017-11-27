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
<h2>Welcome to the home of Final Year Projects in Informatics</h2>
<p>There is lots of useful information and advice about all aspects of the projects here for students and supervisors alike. 
Logging-in will allow browsing of sample projects at any time or full access during the project selection period. </p>

<h2>Overview</h2>
<p> @string("guest_overview_body") </p>
@endif

</div>
@endsection