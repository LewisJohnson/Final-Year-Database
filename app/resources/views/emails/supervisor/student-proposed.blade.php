@extends('emails.base')

@section('body')
<h1>A student has proposed a project to you.</h1>

<p>Hi {{ $supervisor->user->first_name }},</p>
<p>@if(ctype_alpha(Session::get('education_level')['longName']) && preg_match('/^[aeiou]/i', Session::get('education_level')['longName'])) An @else A @endif {{ Session::get('education_level')['longName'] }} student, {{ $student->user->getFullName() }}, has proposed a project titled <a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department')]) }}">{{ $project->title }}</a> to you.</p>
<p>Please <a href="{{ action('Auth\LoginController@showLoginForm', ['educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">Log In</a> to accept or reject {{ $student->user->first_name }}.</p>

@endsection
