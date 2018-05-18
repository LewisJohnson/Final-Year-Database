@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/supervisor-report.js') }}"></script>
@endsection

@section('content')
<div class="centered width--1000 show--scroll-to-top">
	<h1>Report by Supervisor</h1>

	@include('supervisors.partials.supervisor-search')
	<div class="button-group button-group--horizontal button-group--links">
		@if(isset($_GET["includeClosedToOffer"]))
			<div class="form-field form-field--toggle" onclick="window.location='{{ action("SupervisorController@report") }}';">
				<p class="switch-label" for="iLoveYou">Include supervisors closed to offers</p>
				<label class="toggle">
					<input type="checkbox" name="iLoveYou" id="iLoveYou" checked>
					<span class="slider"></span>
				</label>
			</div>
		@else
			<div class="form-field form-field--toggle" onclick="window.location='{{ action("SupervisorController@report", "includeClosedToOffer=true") }}'">
				<p class="switch-label" for="iLoveYou">Include supervisors closed to offers</p>
				<label class="toggle">
					<input type="checkbox" name="iLoveYou" id="iLoveYou">
					<span class="slider"></span>
				</label>
			</div>
		@endif
	</div>
	
	<div id="supervisor-report" style="overflow: auto;">
		@foreach($supervisors as $supervisor)
			<table class="shadow-2dp table--dark-head " id="{{ preg_replace('/[\s.]+/', '', $supervisor->user->getFullName()) }}">
				<thead>
					<tr>
						<th style="width: 280px;">{{ $supervisor->user->getFullName() }} (Load: {{ $supervisor->getProjectLoad() }})</th>
						
						@if($supervisor->getTakingStudents())
							<th>Open to offers</th>
						@else
							<th>Currently not accepting offers</th>
						@endif
						<th></th>
					</tr>
				</thead>

				<tbody>
					{{-- SUPERVISOR PROJECTS --}}
					@foreach($supervisor->getProjects('on-offer') as $project)
						<tr>
							<td>@if($loop->iteration == 1)<a href="{{ action('UserController@projects', ['user' => $project->supervisor->user]) }}">Projects ({{count($project->supervisor->user->projects)}})</a>@endif</td>
							<td><a href="{{ action('ProjectController@show', ['project' => $project]) }}">{{ $project->title }}</a></td>
							<td>{{ucfirst(str_replace('-', ' ', $project->status))}}</td>
						</tr>
					@endforeach

					{{-- ACCEPTED STUDENTS --}}
{{-- 					@if(count($supervisor->getAcceptedStudents()))
						@foreach($supervisor->getAcceptedStudents() as $accepted)
								<tr>
									<td>@if($loop->iteration == 1)Accepted Projects ({{ count($supervisor->getAcceptedStudents()) }})@endif</td>
									<td><a href="{{ action('ProjectController@show', ['project' => $accepted['project']]) }}">{{ $accepted['project']->title }}</a></td>
									<td>{{ $accepted['student']->getName() }}</td>
								</tr>
						@endforeach
					@else
						<tr>
							<td>No students have been accepted yet.</td>
							<td></td>
							<td></td>
						</tr>
					@endif --}}

					{{-- PROJECT OFFERS --}}
{{-- 					@if(count($supervisor->getSelectedStudents()))
						@foreach($supervisor->getSelectedStudents() as $selected)
							<tr>
								<td>@if($loop->iteration == 1)Awaiting Approval ({{ count($supervisor->getSelectedStudents()) }})@endif</td>
								<td><a href="{{ action('ProjectController@show', ['project' => $selected['project']]) }}">{{ $selected['project']->title }}</a></td>
								<td>{{ $selected['student']->getName() }}</td>
							</tr>
						@endforeach
					@else
						<tr>
							<td>No arrangements to be decided.</td>
							<td></td>
							<td></td>
						</tr>
					@endif
 --}}
					{{-- PROJECT PROPOSALS --}}
{{-- 					@foreach($supervisor->getStudentProjectProposals() as $proposal)
						<tr>
							<td>@if($loop->iteration == 1)Student Proposals ({{ count($supervisor->getStudentProjectProposals()) }})@endif</td>
							<td><a href="{{ action('ProjectController@show', ['project' => $proposal['project']]) }}">{{ $proposal['project']->title }}</a></td>
							<td>{{ $proposal['student']->getName() }}</td>
						</tr>
					@endforeach --}}
				</tbody>
			</table>
		@endforeach
	</div>
@endsection
