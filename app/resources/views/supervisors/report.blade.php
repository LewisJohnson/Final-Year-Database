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
			@php
				unset(
					$onOfferProjects, $onOfferProjectsCount,
					$acceptedStudents, $acceptedStudentsCount
					$intrestedStudents, $intrestedStudentsCount
					$proposals, $proposalsCount);

				$onOfferProjects = $supervisor->getProjects('on-offer');
				$onOfferProjectsCount = count($onOfferProjects) ?? 0;

				$acceptedStudents = $supervisor->getAcceptedStudents();
				$acceptedStudentsCount = count($acceptedStudents) ?? 0;

				$intrestedStudents = $supervisor->getIntrestedStudents();
				$intrestedStudentsCount = count($intrestedStudents) ?? 0;

				$proposals = $supervisor->getStudentProjectProposals();
				$proposalsCount = count($proposals) ?? 0;
			@endphp
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
					@if($onOfferProjectsCount > 0)
						@foreach($onOfferProjects as $project)
							<tr>
								<td>@if($loop->iteration == 1)<a href="{{ action('UserController@projects', ['user' => $project->supervisor->user]) }}">Projects ({{ $onOfferProjectsCount }})</a>@endif</td>
								<td><a href="{{ action('ProjectController@show', ['project' => $project]) }}">{{ $project->title }}</a></td>
								<td>{{ ucfirst(str_replace('-', ' ', $project->status)) }}</td>
							</tr>
						@endforeach
					@else
						<tr>
							<td>No projects on offer.</td>
							<td></td>
							<td></td>
						</tr>
					@endif

					{{-- ACCEPTED STUDENTS --}}
					@if($acceptedStudentsCount > 0)
						@foreach($acceptedStudents as $accepted)
								<tr>
									<td>@if($loop->iteration == 1)Accepted Projects ({{ $acceptedStudentsCount }})@endif</td>
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
					@endif

					{{-- PROJECT OFFERS --}}
					@if($intrestedStudentsCount > 0)
						@foreach($supervisor->getIntrestedStudents() as $selected)
							<tr>
								<td>@if($loop->iteration == 1)Awaiting Approval ({{ $intrestedStudentsCount }})@endif</td>
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

					{{-- PROJECT PROPOSALS --}}
					@if($proposalsCount > 0)
						@foreach($proposals as $proposal)
							<tr>
								<td>@if($loop->iteration == 1)Student Proposals ({{ $proposalsCount }})@endif</td>
								<td><a href="{{ action('ProjectController@show', ['project' => $proposal['project']]) }}">{{ $proposal['project']->title }}</a></td>
								<td>{{ $proposal['student']->getName() }}</td>
							</tr>
						@endforeach
					@else
						<tr>
							<td>No student proposals.</td>
							<td></td>
							<td></td>
						</tr>
					@endif
				</tbody>
			</table>
		@endforeach
	</div>
@endsection
