@extends('emails.base')

@section('body')
<h1>Your proposed project has been edited.</h1>

<p>Hi {{ $student->user->first_name }},</p>
<p>{{ $supervisor->user->getFullName() }} has changed the content of your proposed project "{{ $project->title }}".</p>

@endsection
