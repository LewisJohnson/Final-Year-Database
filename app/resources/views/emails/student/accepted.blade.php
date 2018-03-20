@extends('emails.base')

@section('body')
<h1>You've been accepted</h1>

<p>Hi {{ $student->user->first_name }},</p>
<p>You've been accepted to undertake <a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department')]) }}">{{ $project->title }}</a> by {{ $supervisor->user->getFullName() }}.</p>

<p style="margin-top: 1rem;">Here are some links to help you get started</p>
<ul>
	@include('partials.header.help-links', ['platform' => 'email'])
</ul>
@endsection
