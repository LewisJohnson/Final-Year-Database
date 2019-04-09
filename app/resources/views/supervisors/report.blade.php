@extends('layouts.app')

@section('content')
<div class="centered mw-1000 js-show-scroll-top position-relative">

	<h1>Supervisor Report</h1>

	@if(Auth::user()->isAdminOfEducationLevel(Session::get('education_level')["shortName"]))
		<button data-activator="true" data-dialog="supervisor-emails" class="btn btn-sm position-absolute" style="right: 0;top: 0;">
			<svg style="width:36px; height:36px" viewBox="0 0 24 24">
				<path fill="rgba(0, 0, 0, 0.5)" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"></path>
			</svg>
		</button>

		<div id="supervisor-emails-dialog" class="dialog p-3" data-dialog="supervisor-emails">
			<div class="header">
				<h2>Email Supervisors</h2>
			</div>

			<div class="content mt-5">
				<div class="row">
					<div class="col-2"><p class="btn">Email:</p></div>
					<div class="col-10">
						<a class="btn text-primary text-left w-100" href="{{ SussexProjects\Supervisor::getAllSupervisorsMailtoString() }}" title="Email all supervisors">All Supervisors</a>
						<a class="btn text-primary text-left w-100" href="{{ SussexProjects\Supervisor::getSupervisorsOpenToStudentsMailtoString() }}" title="Email all supervisors">Open to offers</a>
						<a class="btn text-primary text-left w-100" href="{{ SussexProjects\Supervisor::getSupervisorsClosedToStudentsMailtoString() }}" title="Email all supervisors">Closed to offers</a>
						<a class="btn text-primary text-left w-100" href="{{ SussexProjects\Supervisor::getSupervisorsWithPendingStudentMailtoString() }}" title="Email supervisors with pending offers">With pending offers</a>
						<a class="btn text-primary text-left w-100" href="{{ SussexProjects\Supervisor::getSupervisorsWithAllStudentsAcceptedMailtoString() }}" title="Email all supervisors who have accepted all their offers">With exclusively accepted students</a>
					</div>
				</div>
			</div>
		</div>
	@endif

	@include('supervisors.partials.supervisor-filter', ['hideClosedToOffers' => $sr_hide_closed])

	<a id="showSupervisorsClosedToOffersToggleButton" @if($sr_hide_closed) href="{{ action('SupervisorController@report', ['sr_hide_closed' => false]) }}" @else href="{{ action('SupervisorController@report', ['sr_hide_closed'=> true]) }}" @endif></a>

	<div class="form-group align-items-center form-inline ml-1 mt-3">
		<label>Supervisors closed to offers</label>
		<select class="ml-2 form-control" onchange="window.location.href = $('#showSupervisorsClosedToOffersToggleButton').attr('href')">
			<option value="0" @if(!$sr_hide_closed) selected @endif>Shown</option>
			<option value="1" @if($sr_hide_closed) selected @endif>Hidden</option>
		</select>
	</div>

	<div id="supervisor-report" class="mt-3">
		@foreach($supervisors as $supervisor)
			@php
				unset(
					$onOfferProjects, $onOfferProjectsCount,
					$acceptedStudents, $acceptedStudentsCount,
					$intrestedStudents, $intrestedStudentsCount,
					$proposals, $proposalsCount);

				$onOfferProjects = $supervisor->getProjects('on-offer');
				$onOfferProjectsCount = count($onOfferProjects) ?? 0;

				$acceptedStudents = $supervisor->getAcceptedStudents();
				$acceptedStudentsCount = count($acceptedStudents) ?? 0;

				$intrestedStudents = $supervisor->getInterestedStudents();
				$intrestedStudentsCount = count($intrestedStudents) ?? 0;

				$proposals = $supervisor->getStudentProjectProposals();
				$proposalsCount = count($proposals) ?? 0;
			@endphp
			<table class="table table-hover bg-white shadow-sm supervisor-row" data-supervisor-name="{{ $supervisor->user->getFullName() }}">
				<thead class="thead-light">
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
						@foreach($supervisor->getInterestedStudents() as $selected)
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
</div>
@endsection
