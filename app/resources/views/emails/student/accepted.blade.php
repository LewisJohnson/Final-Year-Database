@extends('emails.base')

@section('body')
<h1>You've been accepted!</h1>

<p>Hi {{ $student->user->first_name }},</p>

<br>

<p>You've been accepted to undertake the project <b><a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department'), 'utm_medium' => 'email']) }}">{{ $project->title }}</a></b> by <b>{{ $supervisor->user->getFullName() }}</b>.</p>
<p>You should contact your supervisor to discuss the next steps.</p>

<p style="margin-top: 1rem;">In the meantime, here are some links to help you get started</p>
<ul>
	@include('partials.header.help-links', ['platform' => 'email'])
</ul>
@endsection
