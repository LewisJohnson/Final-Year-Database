@extends('layouts.app')
@section('content')
<style>
	.centered.mw-1600 .svg-container{
		display: inline-block;
		width: 20px;
	}
</style>

<div class="centered mw-1600 js-show-scroll-top">

	<h1>Project Evaluations</h1>

	<div class="d-flex w-100">
		<a class="ml-auto btn btn-primary" title="Download project evaluation data as CSV" href="{{ action('ProjectEvaluationController@export') }}">Export CSV</a>
	</div>

	<div class="table-responsive">
		<table class="table bg-white data-table sort-table shadow-sm mt-3">
			<thead>
				<tr>
					<th>Student</th>
					<th>Project Title</th>
					<th class="border-left">Supervisor<br><span class="text-muted">Name</span></th>
					<th class="text-muted">Mark</th>
					<th class="text-muted">Submitted</th>
					<th class="border-left">2<sup>nd</sup> Marker<br><span class="text-muted">Name</span></th>
					<th class="text-muted">Mark</th>
					<th class="text-muted">Submitted</th>
					<th class="border-left">Final Marks<br><span class="text-muted"><span>@include('svg.eye')</span>Poster</span></th>
					<th class="text-muted"><span><span>@include('svg.presentation')</span>Presentation</span></th>
					<th class="text-muted"><span>@include('svg.paper-stacked')</span>Dissertation</th>
					<th class="border-left">Status</th>
					<th class="border-left d-print-none js-unsortable"></th>
				</tr>
			</thead>
			<tbody>
				@foreach($students as $student)
					@if(!empty($student->project) && !empty($student->project->evaluation))
						@php
							$evaluation = $student->project->evaluation;
							$poster = $evaluation->getPosterPresentationQuestion();
							$presentation = $evaluation->getOralPresentationQuestion();
							$dissertation = $evaluation->getDissertationQuestion();
						@endphp
						<tr>
							<td>{{ $student->user->getFullName() }}</td>
							<td>{{ $student->project->title }}</td>
	
							<td class="border-left">{{ $student->project->supervisor->user->getFullName() }}</td>
							<td>{{ $evaluation->supervisor_submitted ? $dissertation->SupervisorValue : '-' }}</td>
							<td>{{ $evaluation->supervisor_submitted ? 'Yes' : 'No' }}</td>
	
							<td class="border-left">{{ $student->project->marker->user->getFullName() }}</td>
							<td>{{  $evaluation->marker_submitted ? $dissertation->MarkerValue : '-' }}</td>
							<td>{{ $evaluation->marker_submitted ? 'Yes' : 'No' }}</td>
	
							@if($evaluation->is_finalised)
								<td class="border-left">{{ $poster->FinalValue }}</td>
								<td>{{ $presentation->FinalValue }}</td>
								<td>{{ $dissertation->FinalValue }}</td>
							@else
								<td class="border-left" style="opacity: 0.3">-</td>
								<td style="opacity: 0.3">-</td>
								<td style="opacity: 0.3">-</td>
							@endif
							<td class="border-left {{ $evaluation->getStatusBootstrapClass() }}">{{ $evaluation->getStatus() }}</td>
	
							<td class="border-left text-right d-print-none">
								<a class="btn btn-sm btn-outline-primary" href="{{ action('ProjectEvaluationController@show', $student->project->id) }}">Evaluation</a>
							</td>
						</tr>
					@elseif(!empty($student->project) && !empty($student->project->marker))
						<tr style="opacity: 0.7">
							<td>{{ $student->getName() }}</td>
							<td>{{ $student->project->title }}</td>
							<td class="border-left">{{ $student->project->supervisor->user->getFullName() }}</td>
							<td>-</td>
							<td>-</td>
							<td class="border-left">{{ $student->project->marker->user->getFullName() }}</td>
							<td>-</td>
							<td>-</td>
							<td class="border-left">-</td>
							<td>-</td>
							<td>-</td>
							<td class="border-left">Not Started</td>
							<td class="border-left text-right d-print-none">
								@if(Auth::user()->isProjectAdmin())
									<a class="btn btn-sm btn-outline-secondary" href="{{ action('ProjectEvaluationController@show', $student->project->id) }}">Create Evaluation</a>
								@endif
							</td>
						</tr>
					@else
						<tr style="opacity: 0.3">
							<td>{{ $student->getName() }}</td>
							<td>No Project</td>
							<td class="border-left">-</td>
							<td>-</td>
							<td>-</td>
							<td class="border-left">-</td>
							<td>-</td>
							<td>-</td>
							<td class="border-left">-</td>
							<td>-</td>
							<td>-</td>
							<td class="border-left">-</td>
							<td class="border-left text-right d-print-none"></td>
						</tr>
					@endif
				@endforeach
			</tbody>
		</table>
	</div>
</div>
@endsection
