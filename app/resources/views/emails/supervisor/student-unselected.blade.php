@extends('emails.base')

@section('body')

@if($project->status == 'student-proposed')
	<h1>A student has decided to un-propose a project.</h1>
@else
	<h1>A student has decided to unselect your project.</h1>
@endif


<p>Hi {{ $supervisor->user->first_name }},</p>

<br>

@if($project->status == 'student-proposed')
	<p><b>{{ $student->user->getFullName() }}</b> has decided to un-propose their {{ Session::get('education_level')['longName'] }} project <b><a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department')]) }}">{{ $project->title }}</a></b>.</p>
@else
	<p><b>{{ $student->user->getFullName() }}</b> has decided to unselect your {{ Session::get('education_level')['longName'] }} project <b><a href="{{ action('ProjectController@show', ['project' => $project, 'educationLevel' => Session::get('education_level')['shortName'], 'department' => Session::get('department')]) }}">{{ $project->title }}</a></b>.</p>
@endif

<p>Their entry has been removed from your pending decisions and you may accept another student.</p>

@endsection
