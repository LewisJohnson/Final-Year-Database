@extends('layouts.supervisor')
@section ('content')

<div class="centered width-1000">
<h1>Report by Supervisor</h1>
<h5>Some students may have their chosen project hidden.</h5>
<div style="overflow: auto;">


@foreach($supervisors as $supervisor)
	@php($iter = 0)
	
	<table class="shadow-2dp full-detail">
		{{-- HEADER --}}
		<tr>
			<th>{{ $supervisor->user->getFullName() }}@if(Session::get("db_type") == "ug") (Load: {{ $supervisor->project_load_ug }}) @else (Load: {{ $supervisor->project_load_masters }}) @endif</th>
			<th></th>
			<th></th>
		</tr>

		{{-- SUPERVISOR PROJECTS --}}
		@foreach($supervisor->user->projects as $project)
			<tr>
				@if($iter == 0)
				<td>Projects ({{count($supervisor->user->projects)}})</td>
				@else
				<td></td>
				@endif
				<td>{{ $project->title }}</td>
				<td>{{ $project->student }}</td>
			</tr>
			@php($iter++)
		@endforeach
		@php($iter = 0)

		{{-- ACCEPTED STUDENTS --}}
		@foreach($supervisor->user->projects as $project)
			@foreach($project->getStudentsWithThisProjectAccepted() as $student)
				<tr>
					@if($iter == 0)
						<td>Accepted projects ({{count($project->getStudentsWithThisProjectAccepted())}})</td>
					@else
						<td></td>
					@endif
					<td>{{ $project->title }}</td>
					@if($student->share_project)
						<td>{{ $student->user->getFullName() }}</td>
					@else
						<td>Hidden</td>
					@endif
				</tr>
				@php($iter++)
			@endforeach
		@endforeach
		@php($iter = 0)
				
		{{-- SELECTED STUDENTS --}}
		@foreach($supervisor->user->projects as $project)
			@foreach($project->getStudentsWithThisProjectSelected() as $student)
				<tr>
					@if($iter == 0)
						<td>Awaiting Approval ({{count($supervisor->getProjectOffers())}})</td>
					@else
						<td></td>
					@endif
					<td>{{ $project->title }}</td>
					@if($student->share_project)
						<td>{{ $student->user->getFullName() }}</td>
					@else
						<td>Hidden</td>
					@endif
				</tr>
				@php($iter++)
			@endforeach
		@endforeach
		<tr>
			<td>Student Proposals</td>
			<td> </td>
			<td> </td>
		</tr>
	@endforeach
</div>
@endsection
