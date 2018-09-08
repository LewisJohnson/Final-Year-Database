@extends('emails.base')

@section('body')
<h1>A student has proposed a project to you.</h1>

<p>Hi {{ $supervisor->user->first_name }},</p>

<br>

<p>@if(ctype_alpha(Session::get('education_level')['longName']) && preg_match('/^[aeiou]/i', Session::get('education_level')['longName'])) An @else A @endif {{ Session::get('education_level')['longName'] }} student, <b>{{ $student->user->getFullName() }}</b>, has proposed a project titled <b><a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department')]) }}">{{ $project->title }}</a></b> to you.</p>

@if($supervisorAcceptDateIsInFuture)
	<p class="accept-date-in-future">You can not make accept or reject {{ $student->user->first_name }} until {{ $supervisorAcceptDate }}.</p>
@else
	<p>You can accept or reject {{ $student->user->first_name }} on your <a href="{{ action('Auth\LoginController@showLoginForm', ['educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">homepage</a>.</p>
@endif
@endsection
