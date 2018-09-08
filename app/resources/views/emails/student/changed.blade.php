@extends('emails.base')

@section('body')
<h1>Your proposed project has been edited.</h1>

<p>Hi {{ $student->user->first_name }},</p>

<br>

<p><b>{{ $supervisor->user->getFullName() }}</b> has changed the content of your proposed project <a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department')]) }}">{{ $project->title }}</a>.</p>

@endsection
