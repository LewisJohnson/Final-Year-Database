@extends('emails.base')

@section('body')
<h1>A student has decided to unselect your project.</h1>

<p>Hi {{ $supervisor->user->first_name }},</p>
<p>{{ $student->user->getFullName() }} has decided to unselect your {{ Session::get('education_level')['longName'] }} project <a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department')]) }}">{{ $project->title }}</a>.</p>

@endsection
