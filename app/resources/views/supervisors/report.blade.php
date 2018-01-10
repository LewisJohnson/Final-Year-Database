@extends('layouts.app')
@section ('content')

<div class="centered width-1000">
<h1>Report by Supervisor</h1>
<h5>Some students may have their name hidden.</h5>
<div style="overflow: auto;">
@foreach($supervisors as $supervisor)
@php($iter = 0)
<table class="shadow-2dp table--dark-head full-detail">
	{{-- HEADER --}}
	<thead>
		<tr>
			<th style="width: 280px;">{{ $supervisor->user->getFullName() }}@if(Session::get("db_type") == "ug") (Load: {{ $supervisor->project_load_ug }}) @else (Load: {{ $supervisor->project_load_masters }}) @endif</th>
			@if(Session::get("db_type") == "ug")
			<th>@if($supervisor->take_students_ug)Open to offers @else Currently not accepting offers @endif</th>
			@else
			<th>@if($supervisor->take_students_masters)Open to offers @else Currently not accepting offers @endif</th>
			@endif
			<th></th>
		</tr>
	</thead>

	<tbody>
	{{-- SUPERVISOR PROJECTS --}}
	@foreach($supervisor->getProjectsByStatus('on-offer') as $project)
		<tr>
			<td>@if($iter == 0)Projects ({{count($supervisor->user->projects)}})@endif</td>
			<td><a href="{{ action('ProjectController@show' ,$project->id) }}">{{ $project->title }}</a></td>
			<td>{{ucfirst(str_replace('-', ' ', $project->status))}}</td>
		</tr>
		@php($iter++)
	@endforeach
	@php($iter = 0)

	{{-- ACCEPTED STUDENTS --}}
	@if(count($supervisor->getAcceptedStudents()) > 0)
		@foreach($supervisor->getAcceptedStudents() as $project)
				<tr>
					<td>@if($iter == 0)Accepted projects ({{ count($supervisor->getAcceptedStudents()) }})@endif</td>
					<td>{{ $project->title }}</td>
					<td>{{ $project->student_name }}</td>
				</tr>
				@php($iter++)
		@endforeach
	@else
		<tr>
			<td>No accepted students.</td>
			<td></td>
			<td></td>
		</tr>
	@endif
	@php($iter = 0)

	{{-- PROJECT OFFERS --}}
	@if(count($supervisor->getProjectOffers()) > 0)
		@foreach($supervisor->getProjectOffers() as $project)
			<tr>
				<td>@if($iter == 0)Awaiting Approval ({{count($supervisor->getProjectOffers())}})@endif</td>
				<td>{{ $project->title }}</td>
				<td>{{ $project->student_name }}</td>
			</tr>
			@php($iter++)
		@endforeach
	@else
		<tr>
			<td>No arrangements to be decided.</td>
			<td></td>
			<td></td>
		</tr>
	@endif
	@php($iter = 0)

	@foreach($supervisor->getProjectProposals() as $project)
		<tr>
			<td>@if($iter == 0)Student Proposals ({{count($supervisor->getProjectProposals())}})@endif</td>
			<td>{{ $project->title }}</td>
			<td>{{ $project->student_name }}</td>
		</tr>
		@php($iter++)
	@endforeach

@endforeach
</tbody>
</div>
@endsection
