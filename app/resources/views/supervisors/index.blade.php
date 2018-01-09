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

<a class="button button--raised button--accent" style="margin-bottom: 1rem;" href="/projects/create">New Project</a>

<div class="supervisor hub">
	{{-- OFFERS --}}
	<div class="section @if(count($user->supervisor->getAcceptedStudents()) || count($user->supervisor->getProjectOffers()))section--full-width @endif shadow-2dp">
		<div class="header">
			@include('svg.tag')
			<h2>Offers</h2>
			<div class="svg-container expand pointer" style="margin-left: auto;">
				<svg class="transition--medium" viewBox="0 0 24 24">
					<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
				</svg>
			</div>
		</div>
		<div class="content" data-cookie-name="hide-offers" @if(!empty($_COOKIE["hide-offers"])) @if($_COOKIE["hide-offers"] == "true") style="display: none;" aria-expanded="false" @else aria-expanded="true" @endif @endif>
			<h5>Selected Projects</h5>
			<div style="overflow: auto;">
			<table class="data-table supervisor-table">
				@if (count($user->supervisor->getProjectOffers()))
				<thead>
					<tr>
						<th>
							<div class="checkbox">
								<input class="checkbox-input master-checkbox" id="offers" type="checkbox">
								<label for="offers" name="offers"></label>
							</div>
						</th>
						<th>Student</th>
						<th>Project</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					@foreach($user->supervisor->getProjectOffers() as $project)
						<tr data-student-id="{{ $project->student_id }}" data-project-id="{{ $project->id }}">
							<td>
								<div class="checkbox">
									<input class="checkbox-input" id="offer-{{ $project->student_name }}" type="checkbox">
									<label for="offer-{{ $project->student_name }}" name="offer-{{ $project->student_name }}"></label>
								</div>
							</td>
							<td><a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a></td>
							<td><a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
							<td><button class="offer-action button button--success" data-action-type="accept">Accept</button></td>
							<td><button class="offer-action button button--danger" data-action-type="reject">Reject</button></td>
						</tr>
					@endforeach
				</tbody>
				@else
					<tfoot>
						<tr><td>You have no offers yet.</td></tr>
					</tfoot>
				@endif
			</table>
			</div>

			<h5>Students Proposals</h5>
			<div style="overflow: auto;">
			<table class="data-table supervisor-table">
				@if (count($user->supervisor->getProjectProposals()))
				<thead>
					<tr>
						<th>
							<div class="checkbox">
								<input class="checkbox-input master-checkbox" id="offers" type="checkbox">
								<label for="offers" name="offers"></label>
							</div>
						</th>
						<th>Student</th>
						<th>Project</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					@foreach($user->supervisor->getProjectProposals() as $project)
						<tr data-student-id="{{ $project->student_id }}" data-project-id="{{ $project->id }}">
							<td>
								<div class="checkbox">
									<input class="checkbox-input" id="offer-{{ $project->student_name }}" type="checkbox">
									<label for="offer-{{ $project->student_name }}" name="offer-{{ $project->student_name }}"></label>
								</div>
							</td>
							<td><a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a></td>
							<td><a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
							<td><button class="offer-action button button--success" data-action-type="accept">Accept</button></td>
							<td><button class="offer-action button button--danger" data-action-type="reject">Reject</button></td>
						</tr>
					@endforeach
				</tbody>
				@else
					<tfoot>
						<tr><td>You have no student project proposals yet.</td></tr>
					</tfoot>
				@endif
			</table>
			</div>
			@if (count($user->supervisor->getProjectProposals()))
				<div class="button-group">
					<button class="button button--raised" type="">Email Selected</button>
					<button class="button button--raised" type="">Accept Selected</button>
					<button class="button button--raised" type="">Reject Selected</button>
				</div>
			@endif
		</div>
	</div>

	{{-- ACCEPTED --}}
	<div class="section @if (count($user->supervisor->getAcceptedStudents()) || count($user->supervisor->getProjectOffers()))section--full-width @endif shadow-2dp">
		<div class="header">
			@include('svg.check-circle')
			<h2>Accepted Students</h2>
			<div class="svg-container expand pointer" style="margin-left: auto;">
				<svg class="transition--medium" viewBox="0 0 24 24">
					<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
				</svg>
			</div>
		</div>
		<div class="content" data-cookie-name="hide-accepted"  @if(!empty($_COOKIE["hide-accepted"])) @if($_COOKIE["hide-accepted"] == "true") style="display: none;" aria-expanded="false" @else aria-expanded="true" @endif @endif>
			<div style="overflow-x: auto;">
				@include ('supervisors.partials.accepted-students-table')
			</div>
			@if (count($user->supervisor->getAcceptedStudents()))
				<div class="button-group">
					<button class="button button--raised" type="">Email Selected</button>
				</div>
			@endif
		</div>
	</div>

	{{-- PROJECTS --}}
	<div class="section section--full-width shadow-2dp">
		<div class="header">
			@include('svg.file')
			<h2>Projects</h2>
			<div class="svg-container expand pointer" style="margin-left: auto;">
				<svg class="transition--medium" viewBox="0 0 24 24">
					<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
				</svg>
			</div>
		</div>
		<div class="content" data-cookie-name="hide-projects" @if(!empty($_COOKIE["hide-projects"])) @if($_COOKIE["hide-projects"] == "true") style="display: none;" aria-expanded="false" @else aria-expanded="true" @endif @endif>
			<div style="overflow: auto;">
			<table class="data-table">
			@if(count($user->supervisor->getProjectsOrderByStatus()))
				<thead>
					<tr>
						<th>Title</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					@foreach($user->supervisor->getProjectsOrderByStatus() as $project)
					<tr>
						<td><a href="{{ action('ProjectController@show', $project->id) }}" class="project-link">{{ $project->title }}</a></td>
						<td>{{ ucfirst(str_replace('-', ' ', $project->status)) }}</td>
						<td><a class="button" href="{{ action('ProjectController@edit', $project->id) }}">Edit</a></td>
					</tr>
					@endforeach
				</tbody>
			@else
				<tfoot>
					<tr><td>You have not created any projects yet.</td></tr>
				</tfoot>
			@endif
			</table>
			</div>
		</div>
	</div>
</div>
</div>
@endsection
