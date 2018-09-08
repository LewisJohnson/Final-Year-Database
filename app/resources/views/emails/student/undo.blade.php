@extends('emails.base')

@section('body')

@if($project->status == 'student-proposed')
	<h1>Your proposal has been undone.</h1>
@else
	<h1>Your selection has been undone.</h1>
@endif


<p>Hi {{ $student->user->first_name }},</p>

<br>

<p>
	<b>{{ $supervisor->user->getFullName() }}</b> has decided to 'undo' your selection for the project <b>{{ $project->title }}</b>.
	If you think this is a mistake, <a href="mailto:{{ $supervisor->user->email }}"> contact</a> your supervisor immediately.
</p>
<br>

@if($project->status == 'student-proposed')
	<p>Your status has been reset. You can <a href="{{ action('Auth\LoginController@showLoginForm', ['educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">log in</a> to select/propose a new project, or re-propose your existing proposal(s) to another supervisor.</p>
@else
	<p>Your status has been reset. You can <a href="{{ action('Auth\LoginController@showLoginForm', ['educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">log in</a> to select/propose a new project.</p>
@endif

@endsection
