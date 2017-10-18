@extends('layouts.app')

@section ('styles')
	<link rel="stylesheet" href="{{ asset('css/supervisor.css') }}">
@endsection

@section ('content')
@php($user = Auth::user())
<h2>Supervisor Hub</h2>
<p>Your project load is currently {{ $user->supervisor->project_load }}.</p>
<div class="supervisor">

	{{-- OFFERS --}}
	<div class="section">
		<h3>Your offers</h3>
		{{-- <a>Email all</a> --}}
		<ul class="offers">
			@if (count($user->supervisor->getOffers()))
				@foreach($user->supervisor->getOffers() as $project)
					<li class="project offer">
						<a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a>
						<a class="project-link" href="/projects/{{ $project->id }}">{{ $project->title }}</a>
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

	{{-- ACCEPTED --}}
	<div class="section">
		<h3>Accepted students</h3>
		<ul class="offers">
			@if (count($user->supervisor->getAcceptedStudents()))
				@foreach($user->supervisor->getAcceptedStudents() as $project)
					<li class="project offer">
						<a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a>
						<a class="project-link" href="/projects/{{ $project->id }}">{{ $project->title }}</a>
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

	{{-- PROJECTS --}}
	<div class="section full">
		<h3>Your projects</h3>
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
@endsection

