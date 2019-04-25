@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1600 js-show-scroll-top">

	<h1 id="page-title">Project Evaluation Student Feedback</h1>

 	<div class="d-flex w-100">
 		<button class="ml-auto btn btn-primary js-print-all-student-feedback" title="Print all project evaluation student feedback data" type="button"><span class="svg-xs">@include('svg.printer')</span>Print All</button>
		<a class="ml-2 btn btn-primary" title="Download project evaluation student feedback data as CSV" href="{{ action('ProjectEvaluationController@exportStudentFeedback') }}"><span class="svg-xs">@include('svg.file-export')</span>Export</a>
	</div>

	<div class="card-columns mt-3" id="card-container">
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

						<a href="{{ action('ProjectEvaluationController@show', $student->project) }}" class="ml-auto card-link d-print-none"><span class="svg-sm">@include('svg.clipboard-check')</span></a>
						<a href="#print" class="card-link d-print-none js-print-student-feedback"><span class="svg-sm">@include('svg.printer')</span></a>
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
