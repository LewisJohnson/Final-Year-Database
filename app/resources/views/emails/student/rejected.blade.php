@extends('emails.base')

@section('body')
<h1>Your application has been unsuccessful</h1>

<p>Hi {{ $student->user->first_name }},</p>
<p>Unfortunately you have not been accepted to undertake {{ $project->title }}.</p>

<br>

<p>Your project status has been reset, so you may <a href="{{ action('Auth\LoginController@showLoginForm', ['educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department')]) }}">Log In</a> to select a new project.</p>
@endsection
