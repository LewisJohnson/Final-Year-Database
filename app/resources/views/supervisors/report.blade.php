@extends('layouts.app')
@section ('content')

<div class="centered width-1000">
	<h1>Report by Supervisor</h1>
	<div style="overflow: auto;">
		@foreach($supervisors as $supervisor)
			@php($iter = 0)
			<table class="shadow-2dp table--dark-head full-detail">
				{{-- HEADER --}}
				<thead>
					<tr>
						<th style="width: 280px;">{{ $supervisor->user->getFullName() }}@if(Session::get("db_type") == "ug") (Load: {{ $supervisor->project_load_ug }}) @else (Load: {{ $supervisor->project_load_masters }}) @endif</th>
						
						@if(Session::get("db_type") == "ug")
							@if($supervisor->take_students_ug)
								<th>@lang('messages.supervisor_open_to_offers')</th>
							@else
								<th>@lang('messages.supervisor_closed_to_offers')</th>
						@endif

						@elseif(Session::get("db_type") == "masters")
							@if($supervisor->take_students_masters)
								<th>@lang('messages.supervisor_open_to_offers')</th>
							@else
								<th>@lang('messages.supervisor_closed_to_offers')</th>
							@endif
						@endif

						<th></th>
					</tr>
				</thead>

				{{-- SUPERVISOR PROJECTS --}}
				<tbody>
					@foreach($supervisor->getProjectsByStatus('on-offer') as $project)
						<tr>
							<td>@if($loop->iteration == 1)Projects ({{count($supervisor->user->projects)}})@endif</td>
							<td><a href="{{ action('ProjectController@show' ,$project->id) }}">{{ $project->title }}</a></td>
							<td>{{ucfirst(str_replace('-', ' ', $project->status))}}</td>
						</tr>
					@endforeach

					{{-- ACCEPTED STUDENTS --}}
					@if(count($supervisor->getAcceptedStudents()))
						@foreach($supervisor->getAcceptedStudents() as $project)
								<tr>
									<td>@if($loop->iteration == 1)Accepted Projects ({{ count($supervisor->getAcceptedStudents()) }})@endif</td>
									<td>{{ $project->title }}</td>
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
								<td>{{ $project->title }}</td>
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

					@foreach($supervisor->getProjectProposals() as $project)
						<tr>
							<td>@if($loop->iteration == 1)Student Proposals ({{count($supervisor->getProjectProposals())}})@endif</td>
							<td>{{ $project->title }}</td>
							<td>{{ $project->student_name }}</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		@endforeach
	</div>
@endsection
