@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/supervisor-report.js') }}"></script>
@endsection

@section('content')
<div class="centered width--1000 show--scroll-to-top">
	<h1>Report by Supervisor</h1>

	@include('supervisors.partials.supervisor-search')
	<div class="button-group button-group--horizontal button-group--links">
		@if(isset($_GET["excludeClosedToOffer"]))
			<a class="chip external-link" data-element-to-replace-with-loader-selector="#supervisor-report" href="{{ action('SupervisorController@report') }}">Closed to Offers</a>
		@else
			<a class="chip active external-link" data-element-to-replace-with-loader-selector="#supervisor-report" href="{{ action('SupervisorController@report', 'excludeClosedToOffer=true') }}">Closed to Offers</a>
		@endif
	</div>
	
	<div id="supervisor-report" style="overflow: auto;">
		@foreach($supervisors as $supervisor)
			<table class="shadow-2dp table--dark-head " id="{{ preg_replace('/[\s.]+/', '', $supervisor->user->getFullName()) }}">
				<thead>
					<tr>
						<th style="width: 280px;">{{ $supervisor->user->getFullName() }}@if(Session::get("db_type") == "ug") (Load: {{ $supervisor->project_load_ug }}) @else (Load: {{ $supervisor->project_load_pg }}) @endif</th>
						
						@if(Session::get("db_type") == "ug")
							@if($supervisor->take_students_ug)
								<th>@lang('messages.supervisor_open_to_offers')</th>
							@else
								<th>@lang('messages.supervisor_closed_to_offers')</th>
						@endif

						@elseif(Session::get("db_type") == "masters")
							@if($supervisor->take_students_pg)
								<th>@lang('messages.supervisor_open_to_offers')</th>
							@else
								<th>@lang('messages.supervisor_closed_to_offers')</th>
							@endif
						@endif

						<th></th>
					</tr>
				</thead>

				<tbody>
					{{-- SUPERVISOR PROJECTS --}}
					@foreach($supervisor->getProjectsByStatus('on-offer') as $project)
						<tr>
							<td>@if($loop->iteration == 1)<a href="{{ action('ProjectController@bySupervisor', $supervisor->id)}}">Projects ({{count($supervisor->user->projects)}})</a>@endif</td>
							<td><a href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a></td>
							<td>{{ucfirst(str_replace('-', ' ', $project->status))}}</td>
						</tr>
					@endforeach

					{{-- ACCEPTED STUDENTS --}}
					@if(count($supervisor->getAcceptedStudents()))
						@foreach($supervisor->getAcceptedStudents() as $project)
								<tr>
									<td>@if($loop->iteration == 1)Accepted Projects ({{ count($supervisor->getAcceptedStudents()) }})@endif</td>
									<td><a href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a></td>
									<td>{{ $project->student_name }}</td>
								</tr>
						@endforeach
					@else
						<tr>
							<td>@lang('messages.supervisor_no_accepted_students')</td>
							<td></td>
							<td></td>
						</tr>
					@endif

					{{-- PROJECT OFFERS --}}
					@if(count($supervisor->getProjectOffers()))
						@foreach($supervisor->getProjectOffers() as $project)
							<tr>
								<td>@if($loop->iteration == 1)Awaiting Approval ({{count($supervisor->getProjectOffers())}})@endif</td>
								<td><a href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a></td>
								<td>{{ $project->student_name }}</td>
							</tr>
						@endforeach
					@else
						<tr>
							<td>@lang('messages.supervisor_no_arrangments')</td>
							<td></td>
							<td></td>
						</tr>
					@endif

					{{-- PROJECT PROPOSALS --}}
					@foreach($supervisor->getProjectProposals() as $project)
						<tr>
							<td>@if($loop->iteration == 1)Student Proposals ({{count($supervisor->getProjectProposals())}})@endif</td>
							<td><a href="{{ action('ProjectController@show', $project->id) }}">{{ $project->title }}</a></td>
							<td>{{ $project->student_name }}</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		@endforeach
	</div>
@endsection
