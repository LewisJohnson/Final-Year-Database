@extends('layouts.supervisor')
@section ('content')
@php($user = Auth::user())

<div class="centered width-1000">
@if(Session::get('db_type') == 'ug')
	<h1>Undergraduate Supervisor Hub</h1>
	<p>Your <b>Undergraduate</b> project load is currently {{ $user->supervisor->project_load_ug }}.</p>
@else
	<h1>Masters Supervisor Hub</h1>
	<p>Your <b>Masters</b> project load is currently {{ $user->supervisor->project_load_masters }}.</p>
@endif

<div class="supervisor hub">
	{{-- OFFERS --}}
	<div class="section section--full-width shadow-2dp">
		<div class="header">
			@include('svg.tag')
			<h2>Offers</h2>
		</div>
		<div class="content">
			<ul class="offers table-list table-list--margined table-list--checkbox">
				@if (count($user->supervisor->getOffers()))
					<li>
						<div class="checkbox">
							<input class="checkbox-input master-checkbox" id="offers" type="checkbox">
							<label for="offers" name="offers"></label>
						</div>
						<h3>Name</h3>
						<h3>Last Login</h3>
					</li>
					@foreach($user->supervisor->getOffers() as $project)
						<li class="offer">
							<div class="checkbox">
								<input class="checkbox-input" id="offer-{{ $project->student_name }}" type="checkbox">
								<label for="offer-{{ $project->student_name }}" name="offer-{{ $project->student_name }}"></label>
							</div>
							<a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a>
							<a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a>
							<button class="button button--success" data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}" class="accept">Accept</button>
							<button class="button button--danger" data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}" class="reject">Reject</button>
						</li>			
					@endforeach
				@else
				<li class="no-topics">You have no offers yet.</li>
				@endif
			</ul>
			@if (count($user->supervisor->getOffers()))
				<div class="button-group">
					<button class="button button--raised" type="">Email Selected</button>
					<button class="button button--raised" type="">Accept Selected</button>
					<button class="button button--raised" type="">Reject Selected</button>
				</div>
			@endif
		</div>
	</div>

	{{-- ACCEPTED --}}
	<div class="section section--full-width shadow-2dp">
		<div class="header">
			@include('svg.check-circle')
			<h2>Accepted Students</h2>
		</div>
		<div class="content">
			<ul class="offers table-list table-list--margined table-list--checkbox">
				@if (count($user->supervisor->getAcceptedStudents()))
					<li>
						<div class="checkbox">
							<input class="checkbox-input master-checkbox" id="accepted" type="checkbox">
							<label for="accepted" name="accepted"></label>
						</div>
						<h3>Name</h3>
						<h3>Project</h3>
						<h3></h3>
					</li>
					@foreach($user->supervisor->getAcceptedStudents() as $project)
						<li>
							<div class="checkbox">
								<input class="checkbox-input" id="accepted-{{ $project->student_name }}" type="checkbox">
								<label for="accepted-{{ $project->student_name }}" name="accepted-{{ $project->student_name }}"></label>
							</div>
							<a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a>
							<a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a>
							<button data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}" class="button button--raised undo">Undo</button>
						</li>				
					@endforeach
				@else
				<li class="no-topics">You have not accepted any students yet.</li>
				@endif
			</ul>
			@if (count($user->supervisor->getAcceptedStudents()))
				<div class="button-group">
					<button class="button button--raised" type="">Email Selected</button>
				</div>
			@endif
	</div>
	</div>

	{{-- PROJECTS --}}
	<div class="section section--full-width">
		<div class="header">
			@include('svg.file')
			<h2>Projects</h2>
		</div>
		<div class="content">
		<ul class="projects-list table-list table-list--margined table-list--checkbox">
			@if (count($user->projects))
				<li>
					<div class="checkbox" style="visibility: hidden">
						<input class="checkbox-input master-checkbox" id="projects" type="checkbox">
						<label for="projects" name="projects"></label>
					</div>
					<h3>Status</h3>
					<h3>Title</h3>
					<h3></h3>
				</li>

				@foreach($user->projects as $project)
					<li class="project{!! ($project->archived) ? ' archived': '' !!}">
						<div class="checkbox">
							<input class="checkbox-input" id="offer-{{ $project->student_name }}" type="checkbox">
							<label for="offer-{{ $project->student_name }}" name="offer-{{ $project->student_name }}"></label>
						</div>
						<p>{{ $project->status }}</p>
						<a href="{{ action('ProjectController@show', $project->id) }}" class="project-link">{{ $project->title }}</a>
						<a class="button" href="{{ action('ProjectController@edit', $project->id) }}">Edit</a>
					</li>
				@endforeach
			@else
				<li class="no-topics">You have no projects.</li>
			@endif
		</ul>
	</div>
	</div>
</div>
</div>
@endsection
