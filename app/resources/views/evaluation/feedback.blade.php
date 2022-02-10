@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1600 js-show-scroll-top">
	<h2 id="page-title">Project Evaluations <small class="text-muted">/ Student Feedback</small></h2>

 	<div class="d-flex w-100">
 		<button class="ml-auto btn btn-primary js-print-all-student-feedback" title="Print all project evaluation student feedback data" type="button"><span class="svg-xs">@include('svg.printer')</span>Print All</button>
		<a class="ml-2 btn btn-primary" title="Download project evaluation student feedback data as CSV" href="{{ action('ProjectEvaluationController@exportStudentFeedback') }}"><span class="svg-xs">@include('svg.file-export')</span>Export</a>
	</div>

	<a class="d-print-none" id="showIncompleteProjectEvaluationsToggleButton" @if($pe_hide_incomplete) href="{{ action('ProjectEvaluationController@studentFeedback', ['pe_hide_incomplete' => false]) }}" @else href="{{ action('ProjectEvaluationController@studentFeedback', ['pe_hide_incomplete'=> true]) }}" @endif></a>

	<div class="form-group align-items-center form-inline ml-1 mt-3 d-print-none">
		<label>Incomplete evaluations</label>
		<select class="ml-2 form-control" onchange="window.location.href = $('#showIncompleteProjectEvaluationsToggleButton').attr('href')">
			<option value="0" @if(!$pe_hide_incomplete) selected @endif>Shown</option>
			<option value="1" @if($pe_hide_incomplete) selected @endif>Hidden</option>
		</select>
	</div>

	<div class="card-columns mt-3" id="card-container">
		@foreach($students as $student)
			@php
				$evaluation = $student->getEvaluation() ?? null;
				$project = null;
				
				if (empty($evaluation))
				{
					$project = $student->project;
				}
				else
				{
					$project = $evaluation->getProject();
				}
			@endphp

			<div class="card">
				<div class="card-body">
					@if(!empty($project) && !empty($evaluation))
						<h5 class="card-title">{{ $student->user->getFullName() }}</h5>
						<h6 class="card-subtitle mb-2 text-muted">{{ $project->title }}</h6>

						<p class="card-text">
							<b>Supervisor:</b> {{ $project->supervisor->user->getFullName() }}<br>
							@if(empty($student->getSecondMarker()))
								<b>Second Marker:</b> <span class="text-danger">None</span>
							@else
								<b>Second Marker:</b> {{ $student->getSecondMarker()->getFullName() }}
							@endif
						</p>

						<p class="card-text">{{ $evaluation->getStudentFeedbackQuestion()->supervisorComment }}</p>

						<a href="{{ action('ProjectEvaluationController@show', $student->id) }}" class="ml-auto card-link d-print-none"><span class="svg-sm">@include('svg.clipboard-check')</span></a>
						<a href="#print" class="card-link d-print-none js-print-student-feedback"><span class="svg-sm">@include('svg.printer')</span></a>
					@else
						<h5 class="card-title">{{ $student->user->getFullName() }}</h5>
						
						<h6 class="card-subtitle mb-2 text-muted">
							@if(empty($project)) No Project @endif
							@if(empty($evaluation)) No Evaluation @endif
						</h6>
					@endif
				</div>
			</div>
		@endforeach
	</div>
</div>
@endsection
