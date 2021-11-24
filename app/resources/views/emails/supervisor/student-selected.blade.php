@extends('emails.base')

@section('body')
<h1>A student has selected your project.</h1>

<p>Hi {{ $supervisor->user->first_name }},</p>

<br>

<p>Your {{ Session::get('education_level')['longName'] }} project <b><a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">{{ $project->title }}</a></b> has been selected by <b>{{ $student->user->getFullName() }}</b>.</p>

@if($supervisorAcceptDateIsInFuture)
	<p class="accept-date-in-future">You can not make accept or reject {{ $student->user->first_name }} until {{ $supervisorAcceptDate }}.</p>
@else
	<p>You can accept or reject {{ $student->user->first_name }} on your <a href="{{ action('Auth\LoginController@showLoginForm', ['educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">homepage</a>.</p>
@endif
@endsection
