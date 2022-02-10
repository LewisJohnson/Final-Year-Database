@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1800 js-show-scroll-top">
	<h1>{{ ucfirst(get_el_long_name()) }} Project Evaluations</h1>

	<div class="d-flex w-100">
		<a class="ml-auto btn btn-primary" target="_blank" rel="noopener noreferrer" title="Print all project evaluations" href="{{ action('ProjectEvaluationController@all') }}"><span class="svg-xs">@include('svg.printer')</span>Print All</a>
		<a class="ml-2 btn btn-primary" title="Download project evaluation data as CSV" href="{{ action('ProjectEvaluationController@export') }}"><span class="svg-xs">@include('svg.file-export')</span>Export CSV</a>
		<a class="ml-2 btn btn-outline-primary" title="Create project evaluations for all accepted students" href="{{ action('ProjectEvaluationController@createAll') }}">Create all evaluations</a>
	</div>
					
	@if(count(SussexProjects\Mode::all()) > 1)
		<div class="form-group">
			<label for="project_year">Project Year <a href="{{ action('UserController@byYear') }}">(Click here for more)</a></label>
			<br>
			<select class="form-control w-auto js-projectYear">
				@foreach(SussexProjects\Mode::all() as $mode)
					<option @if(!empty(Request::get('project_year')) && (Request::get('project_year') == $mode->project_year)) selected @elseif(empty(Request::get('project_year'))) @if(SussexProjects\Mode::getProjectYear() == $mode->project_year) selected @endif @endif data-href="{{ action('ProjectEvaluationController@report', ['project_year' => $mode->project_year]) }}">{{ $mode->project_year }}</option>
				@endforeach
			</select>
		</div>

		<hr>
	@endif

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
					<th class="border-left">Final Marks<br>	<span class="svg-sm text-muted"><span>@include('svg.eye')</span>Poster</span></th>
					<th class="text-muted"><span class="svg-sm"><span>@include('svg.presentation')</span>Presentation</span></th>
					<th class="text-muted"><span class="svg-sm">@include('svg.paper-stacked')</span>Dissertation</th>
					<th class="border-left">Status</th>
					<th class="border-left d-print-none js-unsortable"></th>
					<th class="d-print-none js-unsortable"></th>
				</tr>
			</thead>
			<tbody>
				@foreach($students as $student)
					{{-- Student has project and project evaluation  --}}
					@if(!empty($student->project) && !empty($student->getEvaluation() && !empty($student->getSecondMarker())))
						@php
							$project = $student->project;
							$evaluation = $student->getEvaluation();

							$poster = null;
							$presentation = null;
							$dissertation = null;

							if($evaluation->hasPosterPresentationQuestion()){
								$poster = $evaluation->getPosterPresentationQuestion();
							}

							if($evaluation->hasOralPresentationQuestion()){
								$presentation = $evaluation->getOralPresentationQuestion();
							}

							if($evaluation->hasDissertationQuestion()){
								$dissertation = $evaluation->getDissertationQuestion();
							}
						@endphp
						<tr>
							<td>{{ $student->user->getFullName() }}</td>
							<td><a href="{{ action('ProjectController@show', $student->project) }}">{{ $student->project->title }}</a></td>
	
							<td class="border-left"><a href="mailto:{{ $project->supervisor->user->email }}">{{ $project->supervisor->user->getFullName() }}</a></td>
							@if(is_null($dissertation))
								<td>n/a</td>
							@else
								<td>{{ $evaluation->supervisorHasSubmittedAllQuestions() ? $dissertation->supervisorValue : '-' }}</td>
							@endif
							<td>{{ $evaluation->supervisorHasSubmittedAllQuestions() ? 'Yes' : 'No' }}</td>
	
							<td class="border-left"><a href="mailto:{{ $student->getSecondMarker()->email }}">{{ $student->getSecondMarker()->getFullName() }}</a></td>
							@if(is_null($dissertation))
								<td>n/a</td>
							@else
								<td>{{ $evaluation->markerHasSubmittedAllQuestions() ? $dissertation->markerValue : '-' }}</td>
							@endif
							<td>{{ $evaluation->markerHasSubmittedAllQuestions() ? 'Yes' : 'No' }}</td>

							@if($evaluation->is_finalised)
								<td class="border-left">{{ is_null($poster) ? 'n/a' : $poster->finalValue }}</td>
								<td>{{ is_null($presentation) ? 'n/a' : $presentation->finalValue }}</td>
								<td>{{ is_null($dissertation) ? 'n/a' : $dissertation->finalValue }}</td>
							@else
								<td class="border-left" style="opacity: 0.3">-</td>
								<td style="opacity: 0.3">-</td>
								<td style="opacity: 0.3">-</td>
							@endif
							<td class="border-left {{ $evaluation->getStatusBootstrapClass() }}">{{ $evaluation->getStatus() }}</td>
	
							<td class="border-left text-right d-print-none">
								<a class="btn btn-sm btn-outline-primary" href="{{ action('ProjectEvaluationController@show', $student->id) }}">Evaluation</a>
							</td>

							<td class="text-right d-print-none">
								<a class="btn btn-sm btn-outline-danger js-delete-pe" 
								href="{{ action('ProjectEvaluationController@delete', $evaluation->id) }}"
								data-show-warning="{{ $evaluation->hasAnyQuestionBeenAnswered() ? 'true' : 'false' }}">Delete</a>
							</td>
						</tr>

					{{-- Student has JUST project evaluation  --}}
					@elseif(!empty($student->getEvaluation()))
						{{-- We can assume if they have an evaluation without a project, they won't have any marks --}}
						@php
							$evaluation = $student->getEvaluation();
						@endphp

						<tr>
							<td>{{ $student->user->getFullName() }}</td>
							<td>No Project</td>
	
							<td class="border-left">-</td>
							<td>-</td>
							<td>{{ $evaluation->supervisorHasSubmittedAllQuestions() ? 'Yes' : 'No' }}</td>
	
							<td class="border-left">-</td>
							<td>-</td>

							<td>{{ $evaluation->markerHasSubmittedAllQuestions() ? 'Yes' : 'No' }}</td>

							<td class="border-left" style="opacity: 0.3">-</td>
							<td style="opacity: 0.3">-</td>
							<td style="opacity: 0.3">-</td>
							
							<td class="border-left {{ $evaluation->getStatusBootstrapClass() }}">{{ $evaluation->getStatus() }}</td>
	
							<td class="border-left text-right d-print-none">
								<a class="btn btn-sm btn-outline-primary" href="{{ action('ProjectEvaluationController@show', $student->id) }}">Evaluation</a>
							</td>

							<td class="text-right d-print-none">
								<a class="btn btn-sm btn-outline-info js-delete-pe"
									href="{{ action('ProjectEvaluationController@delete', $evaluation->id) }}"
									data-show-warning="{{ $evaluation->hasAnyQuestionBeenAnswered() ? 'true' : 'false' }}">Delete</a>
							</td>
						</tr>
					@elseif(!empty($student->getSecondMarker()))
						<tr style="opacity: 0.7">
							<td>{{ $student->getName() }}</td>
							<td>
								@if(empty($student->project))
									No Project
								@else
									<a href="{{ action('ProjectController@show', $student->project) }}">{{ $student->project->title }}</a>
								@endif
							</td>
							<td class="border-left">
								@if(empty($student->project))
									-
								@else
									<a href="mailto:{{ $student->project->supervisor->user->email }}">{{ $student->project->supervisor->user->getFullName() }}</a>
								@endif
							</td>
							<td>-</td>
							<td>-</td>
							<td class="border-left"><a href="mailto:{{ $student->getSecondMarker()->email }}">{{ $student->getSecondMarker()->getFullName() }}</a></td>
							<td>-</td>
							<td>-</td>
							<td class="border-left">-</td>
							<td>-</td>
							<td>-</td>
							<td class="border-left">Not Started</td>
							<td class="border-left text-right d-print-none">
								@if(Auth::user()->isProjectAdmin())
									<a class="btn btn-sm btn-outline-secondary" href="{{ action('ProjectEvaluationController@show', $student->id) }}">
										Create Evaluation
									</a>
								@endif
							</td>
							<td></td>
						</tr>
					@else
						<tr style="opacity: 0.3">
							<td>{{ $student->getName() }}</td>
							<td>{{ !empty($student->project) && empty($student->getSecondMarker()) ? 'No Second Marker' : 'No Project' }}</td>
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
							<td class="border-left text-right d-print-none">
								@if(Auth::user()->isProjectAdmin())
									<a class="btn btn-sm btn-outline-secondary" href="{{ action('ProjectEvaluationController@show', $student) }}">
										Create Evaluation
									</a>
								@endif
							</td>
							<td class="d-print-none"></td>
						</tr>
					@endif
				@endforeach
			</tbody>
		</table>
	</div>
</div>
@endsection
