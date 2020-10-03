@extends('emails.base')

@section('body')

@if($project->status == 'student-proposed')
	<h1>Your proposal has been unsuccessful.</h1>
@else
	<h1>Your selection has been unsuccessful.</h1>
@endif

<p>Hi {{ $student->user->first_name }},</p>

<br>

@if($project->status == 'student-proposed')
	<p>Unfortunately your proposed project <b>{{ $project->title }}</b> has been declined by <b>{{ $supervisor->user->getFullName() }}</b>.</p>

	<p>You can <a href="{{ action('Auth\LoginController@showLoginForm', ['educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">log in</a> to select/propose a new project, or re-propose your existing proposal(s) to another supervisor.</p>
@else
	<p>Unfortunately you have not been accepted to undertake the project <b>{{ $project->title }}</b>.</p>

	<p>Your status has been reset. So why not <a href="{{ action('Auth\LoginController@showLoginForm', ['educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">log in</a> now and select or propose a new project.</p>
@endif

<br>
<p>All the best for next time {{ $student->user->first_name }}.</p>
@endsection
