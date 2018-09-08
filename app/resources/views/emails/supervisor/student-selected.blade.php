@extends('emails.base')

@section('body')
<h1>A student has selected your project.</h1>

<p>Hi {{ $supervisor->user->first_name }},</p>
<p>Your {{ Session::get('education_level')['longName'] }} project <a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department')]) }}">{{ $project->title }}</a> has been selected by {{ $student->user->getFullName() }}.</p>
<p>Please <a href="{{ action('Auth\LoginController@showLoginForm', ['educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">Log In</a> to accept or reject {{ $student->user->first_name }}.</p>

@endsection
