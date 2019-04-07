@extends('layouts.app')
@section('content')

@php
	$supervisor = $project->supervisor->user;
	$marker = $project->marker->user;

	$userIsSupervisor = Auth::user()->id == $supervisor->id;
	$userIsMarker = Auth::user()->id == $marker->id;

	$canViewSupervisorValues = $userIsSupervisor || ($userIsMarker && $evaluation->marker_submitted);
	$canViewMarkerValues = $userIsMarker || ($userIsSupervisor && $evaluation->supervisor_submitted);

	if(Auth::user()->isAdminOfEducationLevel(Session::get('education_level')["shortName"]) || Auth::user()->isExternalMarker()){
		$canViewSupervisorValues = true;
		$canViewMarkerValues = true;
	}

	$questions = $evaluation->getQuestions();

	$poster = $evaluation->getPosterPresentationQuestion();
	$presentation = $evaluation->getOralPresentationQuestion();
	$dissertation = $evaluation->getDissertationQuestion();

	$thresholds = SussexProjects\Mode::getThresholds();

	$isFilled = $userIsSupervisor ? $evaluation->isFilled('Supervisor') : $evaluation->isFilled('Marker');

	$straddles = false;
	if(count($thresholds) > 0){
		foreach($thresholds as $threshold) {
			if(($dissertation->SupervisorValue > $threshold && $dissertation->MarkerValue < $threshold) ||
				($dissertation->SupervisorValue < $threshold && $dissertation->MarkerValue > $threshold)) {
				$straddles = $threshold;
			}
		}
	}
@endphp

@section('scripts')
	<script type="text/javascript">
		Window["isSupervisor"] = {{ $userIsSupervisor ? 'true' : 'false' }};
		Window["isMarker"] = {{ $userIsMarker ? 'true' : 'false' }};
	</script>

	<script src="{{ asset('js/views/project-evaluation.js') }}"></script>
@endsection

@section('content')

<div class="centered mw-1200">
	<div class="row mt-3">
		<div class="col-12">
			@if(is_null($marker))
				<p>This page is unavailable as a second marker has not been assigned to "{{ $project->title }}".</p>
			@else
				<form id="project-evaluation-form" action="{{ action('ProjectEvaluationController@update', $project->id) }}" method="POST" accept-charset="utf-8">
					
					{{-- Just incase someone tries to submit a finalised report --}}										
					@if(!$evaluation->is_finalised)
						{{ csrf_field() }}
						{{ method_field('PATCH') }}
					@endif

					@if(!$evaluation->is_finalised && $userIsSupervisor && $evaluation->supervisor_submitted)
						@if($evaluation->marker_submitted)
							<p class="bg-success rounded text-white text-center w-100 p-2">
								READY TO FINALISE
							</p>
						@else
							<p class="bg-danger rounded text-white text-center w-100 p-2">
								NOT READY TO FINALISE
							</p>
						@endif
					@endif

					<div class="card">
						<div class="card-body">
							<h1 class="d-flex">Project Evaluation
								@if($evaluation->is_finalised)
									<span class="ml-auto text-danger">Finalised</span>
								@else
									@if(($userIsSupervisor && $evaluation->supervisor_submitted) || 
										($userIsMarker && $evaluation->marker_submitted))
										<span class="ml-auto text-success">Submitted</span>
										
									@else
										<span class="ml-auto text-warning">In-Progress</span>
									@endif
								@endif
							</h1>

							<div class="form-group row mb-0">
								<label class="col-sm-2 col-form-label py-0">Project</label>
								<div class="col-sm-10">
									<input type="text" readonly class="form-control-plaintext py-0" value="{{ $project->title }}">
								</div>
							</div>

							<div class="form-group row mb-0">
								<label class="col-sm-2 col-form-label py-0">Programme</label>
								<div class="col-sm-10">
									<input type="text" readonly class="form-control-plaintext py-0" value="{{ empty($project->getAcceptedStudent()) ? 'Unavailable' : $project->getAcceptedStudent()->user->programme_relationship->name }}">
								</div>
							</div>

							<div class="form-group row mb-0">
								<label class="col-sm-2 col-form-label py-0">Student</label>
								<div class="col-sm-10">
									<input type="text" readonly class="form-control-plaintext py-0" value="{{ empty($project->getAcceptedStudent()) ? 'Unavailable' : $project->getAcceptedStudent()->user->getFullName() }}">
								</div>
							</div>

							<div class="form-group row mb-0">
								<label class="col-sm-2 col-form-label py-0">Supervisor</label>
								<div class="col-sm-10">
									<input type="text" readonly class="form-control-plaintext py-0" value="{{ $supervisor->getFullName() }}">
								</div>
							</div>

							<div class="form-group row mb-0">
								<label class="col-sm-2 col-form-label py-0">Second Marker</label>
								<div class="col-sm-10">
									<input type="text" readonly class="form-control-plaintext py-0" value="{{ $marker->getFullName() }}">
								</div>
							</div>

							<div class="mt-3 d-flex align-items-end d-print-none">
								@if($userIsSupervisor && !$canViewMarkerValues)
									<span class="text-muted">The second marker's marks are hidden until you submit your evaluation</span>
								@elseif($userIsMarker && !$canViewSupervisorValues)
									<span class="text-muted">The supervisor's marks are hidden until you submit your evaluation</span>
								@endif

								@if(!$evaluation->is_finalised)
									<div class="ml-auto">
										@if(($userIsSupervisor && !$evaluation->supervisor_submitted) || 
												($userIsMarker && !$evaluation->marker_submitted))
											<button type="button" id="edit" class="btn btn-secondary">Edit</button>
											<button id="save" class="btn btn-primary">Save</button>
											<button id="submission" type="button" data-activator data-dialog="submit-evaluation-dialog" class="btn btn-primary">Submit</button>
										@else
											@if(!$evaluation->supervisor_submitted)
												<p class="text-muted">The project evaluation can not be finalised because {{ $supervisor->getFullName() }} has not submitted their evaluation.</p>
											@elseif(!$evaluation->marker_submitted)
												<p class="text-muted">The project evaluation can not be finalised because {{ $marker->getFullName() }} has not submitted their evaluation.</p>
											@elseif($userIsSupervisor)
												<button id="finalise-evaluation" type="button" data-activator="true" data-dialog="finalise-evaluation-dialog" class="btn btn-primary">Finalise</button>
											@endif
										@endif
									</div>
								@endif
							</div>
							
							<hr>

							@if($evaluation->is_finalised)
								<div class="row">
									<div class="col-12 col-sm-6 col-md-4">
										<div class="row">
											<div class="col-6">
												<label class="text-muted mb-0"><span class="svg-sm">@include('svg.eye')</span>Poster</label>
												
												<div class="text-center text-muted" style="font-size: 2rem">
													{{ $poster->FinalValue }}%
												</div>
											</div>

											<div class="col-6">
												<label class="text-muted mb-0"><span class="svg-sm">@include('svg.presentation')</span>Presentation</label>
														
												<div class="text-center text-muted" style="font-size: 2rem">
													{{ $presentation->FinalValue }}%
												</div>
											</div>

											<div class="col-12 mt-3">
												<label class="text-muted mb-0"><span class="svg-md">@include('svg.paper-stacked')</span>Dissertation Mark</label>
						
												<div class="text-center text-muted" style="font-size: 4rem">
													{{ $dissertation->FinalValue }}%
												</div>
											</div>
										</div>
									</div>

									<div class="col-12 col-sm-6 col-md-8">
										<label>Joint Report</label>
										<p class="pl-2" style="white-space: pre-wrap;">{{ $dissertation->FinalComment }}</p>
									</div>
								</div>

								<button class="btn btn-light mt-5 w-100" type="button" data-toggle="collapse" data-target="#ProjectEvaluationQuestions">Show all questions</button>
							@endif

							<div @if($evaluation->is_finalised) id="ProjectEvaluationQuestions" class="collapse mt-3" @endif>
								@foreach($evaluation->getQuestions() as $question)
									<div class="row">
										<div class="col-12">
											<p>
												<span class="text-uppercase font-weight-bold">{{ $loop->iteration.". ".$question->title }}</span> @if(!empty($question->description)) ({{ $question->description }}) @endif
											</p>
										</div>

										<input type="hidden" name="{{ $loop->index }}_type" value="{{ $question->type }}">

										@foreach(['supervisor', 'marker'] as $type)
											@php
												$valueAccessor = ucfirst($type).'Value';
												$commentAccessor = ucfirst($type).'Comment';
											@endphp

											<div class="col-6">
												<p class="m-0">{{ ucfirst($type) }}</p>

												@if(($type == "supervisor" && $canViewSupervisorValues) || ($type == "marker" && $canViewMarkerValues))
													@switch($question->type)
														@case(SussexProjects\PEQValueTypes::Scale)
															<p class="js-value {{ $type }} pl-2"></p>
															<input class="js-input {{ $type }} custom-range" type="range" step="1" min="0" max="10" name="{{ $loop->parent->index }}_{{ $type }}_value" value="{{ $question->$valueAccessor }}">
															@break

														@case(SussexProjects\PEQValueTypes::Number)
														@case(SussexProjects\PEQValueTypes::PosterPresentation)
														@case(SussexProjects\PEQValueTypes::OralPresentation)
														@case(SussexProjects\PEQValueTypes::Dissertation)
															<p class="js-value {{ $type }} pl-2">{{ $question->$valueAccessor }}</p>
															<input class="js-input {{ $type }} form-control" type="number" step="1" min="0" max="100" name="{{ $loop->parent->index }}_{{ $type }}_value" value="{{ $question->$valueAccessor }}">
															@break

														@case(SussexProjects\PEQValueTypes::YesNo)
															<p class="js-value {{ $type }} pl-2">{{ $question->$valueAccessor == 0 ? 'No' : 'Yes' }}</p>
															<select class="js-input {{ $type }} form-control" name="{{ $loop->parent->index }}_{{ $type }}_value">
																<option @if($question->$valueAccessor == 0) selected @endif value="0">No</option>
																<option @if($question->$valueAccessor == 1) selected @endif value="1">Yes</option>
															</select>
															@break

														@case(SussexProjects\PEQValueTypes::YesPossiblyNo)
															<p class="js-value {{ $type }} pl-2">
																@switch($question->$valueAccessor)
																	@case(0)
																		No
																		@break
																	@case(1)
																		Possibly
																		@break
																	@case(2)
																		Yes
																		@break
																@endswitch
															</p>

															<select class="js-input {{ $type }} form-control" name="{{ $loop->parent->index }}_{{ $type }}_value">
																<option @if($question->$valueAccessor == 0) selected @endif value="0">No</option>
																<option @if($question->$valueAccessor == 1) selected @endif value="1">Possibly</option>
																<option @if($question->$valueAccessor == 2) selected @endif value="2">Yes</option>
															</select>
															@break
													
														@case(SussexProjects\PEQValueTypes::CommentOnly)
														@case(SussexProjects\PEQValueTypes::StudentFeedback)
															<p class="js-value {{ $type }} pl-2">{{ $question->$valueAccessor }}</p>
															@break

														@default
															<p class="js-value {{ $type }}">{{ $question->$valueAccessor }}</p>
															<input class="js-input {{ $type }} form-control" type="text" name="{{ $loop->parent->index }}_{{ $type }}_value" value="{{ $question->$valueAccessor }}">
													@endswitch

													@if($question->type != SussexProjects\PEQValueTypes::CommentOnly && 
															$question->type != SussexProjects\PEQValueTypes::StudentFeedback)
														<p class="mt-3 mb-1 {{ $loop->index > 0 ? 'invisible' : '' }}">Comments:</p>
													@endif

													<p class="js-value {{ $type }} pl-2 mt-3" style="min-height: 100px;">{{ $question->$commentAccessor }}</p>
													<textarea class="js-input {{ $type }} mb-3 form-control" style="min-height: 100px;" name="{{ $loop->parent->index }}_{{ $type }}_comment">{{ $question->$commentAccessor }}</textarea>
												@else
													<p class="bg-light text-muted mt-1 py-1 text-center rounded">Hidden</p>
													<p class="mt-3 mb-1">Comments:</p>
													<p class="bg-light text-muted py-5 text-center rounded">Hidden</p>
												@endif
											</div>
										@endforeach
									</div>
								@endforeach
							</div>
						</div>
					</div>
				</form>

				@if($evaluation->is_finalised && Auth::user()->isAdminOfEducationLevel(Session::get('education_level')["shortName"]))
					<form action="{{ action('ProjectEvaluationController@undoFinalise', $evaluation->id) }}" method="POST" accept-charset="utf-8">
						{{ csrf_field() }}
						<div class="text-right mt-3">
							<button class="btn btn-outline-danger" type="submit">UN-FINALISE</button>
						</div>
					</form>
				@endif
			@endif
		</div>
	</div>
</div>

@if(($userIsSupervisor && !$evaluation->supervisor_submitted) || 
	($userIsMarker && !$evaluation->marker_submitted))

	{{-- SUBMIT MODAL --}}
	<div class="dialog" data-dialog="submit-evaluation-dialog">
		<div class="border-bottom">
			<h4 id="dialog-title" class="text-center p-3 m-0 font-weight-bold text-uppercase">Submit Project Evaluation</h4>
		</div>

		<div class="container px-4 pb-3">
			<div class="row mt-3">
				@if($isFilled)
					<div class="col-12">
						<div class="form-group row">
							<label class="col-sm-2 col-form-label"><b>Project</b></label>
							<div class="col-sm-10">
								<input type="text" readonly class="form-control-plaintext" value="{{ $project->title }}">
							</div>
						</div>

						<p>
							You are about to submit your half of the project evaluation.
							Once you do this, you will no longer be able to edit your marks or comments.
						</p>
					</div>
				@else
					<div class="col-12">
						<p>You may not submit the project evaluation for the following reasons:</p>

						<ul>
							{!! $userIsSupervisor ? $evaluation->getQuestionsLeftToFillSummary('Supervisor') : $evaluation->getQuestionsLeftToFillSummary('Marker') !!}
						</ul>
					</div>
				@endif
			</div>
		</div>

		@if($isFilled)
			<div class="footer bg-light border-top p-2 text-right">
				<button id="submit-evaluation" type="button" class="btn btn-primary">SUBMIT</button>
			</div>
		@endif
	</div>
@endif

@if(!$evaluation->is_finalised)
	{{-- FINALISE MODAL --}}
	<div class="dialog modal-lg" data-dialog="finalise-evaluation-dialog">
		<div class="border-bottom">
			<h4 id="dialog-title" class="text-center p-3 m-0 font-weight-bold text-uppercase">Finalise Project Evaluation</h4>
		</div>

		<div class="container px-4 pb-3">
			<div class="row mt-3">
				<div class="col-6">
					<p>
						You are about to finalise the project evaluation for the project "{{ $project->title }}".
						Once you do this, the evaluation will no longer be editable by you or the second marker.
					</p>

					@if($straddles != false)
						<h4>Straddle</h4>
						<p>
							The student's mark is straddling.
							This means that yours and the second marker's marks straddles a threshold.
							The threshold the mark is straddling is <b>{{ $straddles }}%</b>.
							Because of this, you must fill out a joint report explaining how you and the second marker came to the agreed dissertation mark.
							<br><br>
							Before finalising this report, please make sure you and <b>{{ $marker->getFullName() }}</b> fully agree on the mark.
						</p>
					@endif
				</div>

				<div class="col-6">
					<label class="text-muted"><span>@include('svg.eye')</span>Poster Mark</label>
					<div class="d-flex">
						<input class="d-inline-block flex-grow-1 text-right" style="font-size: 2rem" type="number" id="poster-final-mark" name="poster_final_mark" value="{{ floor(($poster->SupervisorValue + $poster->MarkerValue) / 2) }}" min="0" max="100" step="1">
						<span class="p-2" style="font-size: 2rem">%</span>
					</div>
					<p class="text-muted mb-0"><small>Supervisor {{ $poster->SupervisorValue }} | Marker {{ $poster->MarkerValue }}</small></p>

					<label class="mt-3 text-muted"><span>@include('svg.presentation')</span>Oral Presentation Mark</label>
					<div class="d-flex">
						<input class="d-inline-block flex-grow-1 text-right" style="font-size: 2rem" type="number" id="presentation-final-mark" name="presentation_final_mark" value="{{ floor(($presentation->SupervisorValue + $presentation->MarkerValue) / 2) }}" min="0" max="100" step="1">
						<span class="p-2" style="font-size: 2rem">%</span>
					</div>
					<p class="text-muted mb-0"><small>Supervisor {{ $presentation->SupervisorValue }} | Marker {{ $presentation->MarkerValue }}</small></p>

					<label class="mt-3 text-muted"><span>@include('svg.paper-stacked')</span>Dissertation Mark</label>
					<div class="d-flex">
						<input class="d-inline-block flex-grow-1 text-right" style="font-size: 2rem" type="number" id="dissertation-final-mark" name="dissertation_final_mark" value="{{ floor(($dissertation->SupervisorValue + $dissertation->MarkerValue) / 2) }}" min="0" max="100" step="1">
						<span class="p-2" style="font-size: 2rem">%</span>
					</div>
					<p class="text-muted mb-0"><small>Supervisor {{ $dissertation->SupervisorValue }} | Marker {{ $dissertation->MarkerValue }}</small></p>

					<p class="mt-1 text-muted"><small>Fields are auto-filled with the average mark</small></p>
				</div>

				@if($straddles != false)
					<div class="col-12 mt-3">
						<div class="form-group">
							<label for="jointReport">Joint Report <br><ins><small>Explain how you and {{ $marker->first_name }} agreed on the final dissertation mark.</small></ins></label>
							<textarea class="form-control" style="min-height: 200px" name="joint_report" id="jointReport"></textarea>
						</div>
					</div>
				@endif

				<input type="hidden" name="finalise" value="true">
			</div>
		</div>
		
		<div class="footer bg-light border-top p-2 text-right">
			<button id="finalise" type="button" class="btn btn-primary">{{ $straddles == false ? "FINALISE" : "AGREE & FINALISE"}}</button>
		</div>
	</div>
@endif
@endsection
