@extends('layouts.app')

@section ('styles')
	<link rel="stylesheet" href="{{ asset('css/supervisor.css') }}">
@endsection

@section ('content')
@php($user = Auth::user())
<h2>Supervisor Hub</h2>
<div class="button-group">
	<button class="button selected" type="button">Final Year</button>
	<button class="button" type="button">Masters</button>
</div>

<p>Your <b>Final Year</b> project load is currently {{ $user->supervisor->project_load }}.</p>
<div class="supervisor">

	{{-- OFFERS --}}
	<div class="section">
		<div class="header">
			<h3>Offers</h3>
		</div>
		<div class="content">
		{{-- <a>Email all</a> --}}
		<ul class="offers">
			@if (count($user->supervisor->getOffers()))
				@foreach($user->supervisor->getOffers() as $project)
					<li class="project offer">
						<a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a>
						<a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a>
						<button data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}" class="accept">Accept</button>
						<button data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}" class="reject">Reject</button>
					</li>					
				@endforeach
			@else
			<li class="no-topics">You have no offers yet.</li>
			@endif
		</ul>
		@if (count($user->supervisor->getOffers()))
			<button type="">Email selected</button>
			<button type="">Accept selected</button>
			<button type="">Reject selected</button>
			<button type="">Email all</button>
			<button type="">Accept all</button>
			<button type="">Reject all</button>
		@endif
	</div>
	</div>

	{{-- ACCEPTED --}}
	<div class="section">
		<div class="header">
			<h3>Accepted students</h3>
		</div>
		<div class="content">
		<ul class="offers">
			@if (count($user->supervisor->getAcceptedStudents()))
				@foreach($user->supervisor->getAcceptedStudents() as $project)
					<li class="project offer">
						<a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a>
						<a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a>
						<button data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}" class="undo">Undo</button>
					</li>					
				@endforeach
			@else
			<li class="no-topics">You have not accepted any students yet.</li>
			@endif
		</ul>
		
		@if (count($user->supervisor->getAcceptedStudents()))
		<button type="">Email all</button>
		@endif
	</div>
	</div>

	{{-- PROJECTS --}}
	<div class="section full">
		<div class="header">
			<h3>Projects</h3>
		</div>
		<div class="content">
		<ul class="projects-list">
			@if (count($user->projects))
				@foreach($user->projects as $project)
					<li class="project{!! ($project->archived) ? ' archived': '' !!}">
						<input type="checkbox">
						<p>{{ $project->status }}</p>
						<a class="project-link" href="/projects/{{ $project->id }}">{{ $project->title }}</a>
						<a href="/projects/{{ $project->id }}/edit">Edit</a>
					</li>
				@endforeach
			@else
				<li class="no-topics">You have no projects.</li>
			@endif
		</ul>
	</div>
	</div>
</div>
@endsection

