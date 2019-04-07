@extends('layouts.app')
@section('content')
<style>
	.centered.mw-1600 .svg-container{
		display: inline-block;
		width: 20px;
	}
</style>

<div class="centered mw-1600 js-show-scroll-top">

	<h1>Project Evaluation Student Feedback</h1>

	<div class="d-flex w-100">
		<a class="ml-auto btn btn-primary" title="Download project evaluation data as CSV" href="{{ action('ProjectEvaluationController@export') }}">Export CSV</a>
	</div>

	<div class="card-columns mt-3">
		@foreach($students as $student)
			@php
				$project = $student->project;
				$evaluation = $project->evaluation ?? null;
			@endphp

			<div class="card">
				<div class="card-body">
					@if(!empty($project) && !is_null($evaluation) && $evaluation->is_finalised)
						<h5 class="card-title">{{ $student->user->getFullName() }}</h5>
						<h6 class="card-subtitle mb-2 text-muted">{{ $project->title }}</h6>

						<p class="card-text"><b>{{ $project->supervisor->user->getFullName() }}</b><br>{{ $evaluation->getStudentFeedback()->SupervisorComment }}</p>
						<p class="card-text"><b>{{ $project->marker->user->getFullName() }}</b><br>{{ $evaluation->getStudentFeedback()->MarkerComment }}</p>

						<a href="{{ action('ProjectEvaluationController@show', $student->project) }}" class="card-link d-print-none">Evaluation</a>
					@elseif(!empty($project) && !empty($student->project->marker))
						<h5 class="card-title">{{ $student->user->getFullName() }}</h5>
						<h6 class="card-subtitle mb-2 text-muted">{{ $project->title }}</h6>
						<p class="card-text">Evaluation not finalised</p>
					@else
						<h5 class="card-title">{{ $student->user->getFullName() }}</h5>
						<h6 class="card-subtitle mb-2 text-muted">No Project</h6>
					@endif
				</div>
			</div>
		@endforeach
	</div>
</div>
@endsection
