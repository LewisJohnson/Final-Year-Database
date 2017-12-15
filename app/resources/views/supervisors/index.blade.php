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

<a class="button button--raised button--accent" href="/projects/create">New Project</a>

<div class="supervisor hub">
	{{-- OFFERS --}}
	<div class="section @if(count($user->supervisor->getAcceptedStudents()) || count($user->supervisor->getProjectOffers()))section--full-width @endif shadow-2dp">
		<div class="header">
			@include('svg.tag')
			<h2>Offers</h2>
		</div>
		<div class="content">
			<table class="data-table">
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
							<tr>
								<td>
									<div class="checkbox">
										<input class="checkbox-input" id="offer-{{ $project->student_name }}" type="checkbox">
										<label for="offer-{{ $project->student_name }}" name="offer-{{ $project->student_name }}"></label>
									</div>
								</td>
								
								<td><a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a></td>
								<td><a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
								<td><button class="button button--success accept" data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}">Accept</button></td>
								<td><button class="button button--danger reject" data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}">Reject</button></td>
							</tr>
						@endforeach
				</tbody>
				@else
					<tfoot>
						<tr><td>You have no offers yet.</td></tr>
					</tfoot>
				@endif
			</table>
			@if (count($user->supervisor->getProjectOffers()))
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
		</div>
		<div class="content">
			<table class="data-table">
				@if (count($user->supervisor->getAcceptedStudents()))
				<thead>
					<tr>
						<th>						
							<div class="checkbox">
								<input class="checkbox-input master-checkbox" id="offers" type="checkbox">
								<label for="offers" name="offers"></label>
							</div>
						</th>
						<th>Student Name</th>
						<th>Project</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					@foreach($user->supervisor->getAcceptedStudents() as $project)
						<tr>
							<td>
								<div class="checkbox">
									<input class="checkbox-input" id="accepted-{{ $project->student_name }}" type="checkbox">
									<label for="accepted-{{ $project->student_name }}" name="accepted-{{ $project->student_name }}"></label>
								</div>
							</td>
							<td><a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a></td>
							<td><a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
							<td><button class="button button--raised undo" data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}">Undo</button></td>
						</tr>
					@endforeach
				</tbody>
				@else
				<tfoot>
					<tr><td>You have not accepted any students yet.</td></tr>
				</tfoot>
				@endif
			</table>
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
		</div>
		<div class="content">
			<table class="data-table">
			@if(count($user->supervisor->getProjectsOrderByStatus()))
				<thead>
					<tr>
						<th>Title</th>
						<th>Marker</th>
						<th>Status</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					@foreach($user->supervisor->getProjectsOrderByStatus() as $project)
					<tr>
						<td><a href="{{ action('ProjectController@show', $project->id) }}" class="project-link">{{ $project->title }}</a></td>
						@if($project->marker)
							<td>{{ $project->marker->user->getFullName() }}</td>
						@else
							<td>None</td>
						@endif
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
@endsection
