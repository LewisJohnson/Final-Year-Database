@extends('layouts.app')

@php
	$supervisor = $project->supervisor->user;
	$marker = $project->marker->user;

	$userIsSupervisor = Auth::user()->id == $supervisor->id;
	$userIsMarker = Auth::user()->id == $marker->id;

	$questions = $evaluation->getQuestions();

	if($evaluation->hasPosterPresentationQuestion()){
		$poster = $evaluation->getPosterPresentationQuestion();
	}

	if($evaluation->hasOralPresentationQuestion()){
		$presentation = $evaluation->getOralPresentationQuestion();
	}

	if($evaluation->hasDissertationQuestion()){
		$dissertation = $evaluation->getDissertationQuestion();
	}

	$studentFeedback = $evaluation->getStudentFeedbackQuestion();

	$thresholds = SussexProjects\Mode::getThresholds();
	$maxDifference = SussexProjects\Mode::getEvaluationPercentageDifference();

	$straddles = false;
	$differsByPercentage = false;
	
	if($evaluation->hasDissertationQuestion()){
		if(!empty($thresholds)) {
			if(count($thresholds) > 0) {
				foreach($thresholds as $threshold) {
					if(($dissertation->supervisorValue > $threshold && $dissertation->markerValue < $threshold) ||
						($dissertation->supervisorValue < $threshold && $dissertation->markerValue > $threshold)) {
							$straddles = $threshold;
					}
				}
			}
		}

		if($maxDifference > 0 && $dissertation->supervisorValue > 0) {
			if(abs(round((($dissertation->supervisorValue - $dissertation->markerValue) / $dissertation->supervisorValue) * 100)) > $maxDifference) {
				$differsByPercentage = true;
			}
		}
	}
@endphp

@section('scripts')
	<script type="text/javascript">
		Window["isSupervisor"] = {{ $userIsSupervisor ? 'true' : 'false' }};
		Window["isMarker"] = {{ $userIsMarker ? 'true' : 'false' }};

		Window["hasPosterPresentationQuestion"] = {{ $evaluation->hasPosterPresentationQuestion() ? 'true' : 'false' }};
		Window["hasOralPresentationQuestion"] = {{ $evaluation->hasOralPresentationQuestion() ? 'true' : 'false' }};
		Window["hasDissertationQuestion"] = {{ $evaluation->hasDissertationQuestion() ? 'true' : 'false' }};
	</script>

	<script src="{{ asset('js/views/project-evaluation.js') }}"></script>
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')

<div class="centered mw-1200 js-show-scroll-top">
	<div class="row mt-3">
		<div class="col-12 text-right">
			{{-- TOOD: REMOVE THIS  --}}
			@if($questions[0]->group === 0)
				<a class="btn btn-outline-success mr-2" href="{{ action('ProjectEvaluationController@fixGroups', ['project' => $project->id]) }}"><span class="svg-xs">@include('svg.auto-fix')</span>Fix Groups</a>
			@endif
			<a class="btn btn-outline-primary" href="{{ action('HomeController@help', ['tab-name' => 'Supervisor', 'header-name' => 'supervisor-project-evaluation']) }}"><span class="svg-xs">@include('svg.help')</span>Help</a>
			<button class="btn btn-primary ml-2 js-print-project-evaluation" title="Print project evaluation" type="button"><span class="svg-xs">@include('svg.printer')</span>Print</button>
		</div>

		<div class="col-12 mt-3">
			@if(is_null($marker))
				<p>This page is unavailable as a second marker has not been assigned to "{{ $project->title }}".</p>
			@else
				<form id="project-evaluation-form" action="{{ action('ProjectEvaluationController@update', $project->id) }}" method="POST" accept-charset="utf-8">
					
					{{-- Just incase someone tries to submit a finalised report --}}										
					@if(!$evaluation->is_finalised)
						{{ csrf_field() }}
						{{ method_field('PATCH') }}
					@endif

					@if(!$evaluation->is_finalised && $userIsSupervisor)
						@if($evaluation->supervisorHasSubmittedAllQuestions() && $evaluation->markerHasSubmittedAllQuestions())
							<p class="bg-success rounded text-white text-center w-100 p-2">
								READY TO BE FINALISED
							</p>
						@else
							<p class="bg-danger rounded text-white text-center w-100 p-2">
								NOT READY TO BE FINALISED
							</p>
						@endif
					@endif

					<div class="card">
						<div class="card-body">
							<h1 class="d-flex">Project Evaluation
								@if($evaluation->is_finalised)
									<span class="ml-auto text-danger">Finalised</span>
								@else
									@if(($userIsSupervisor && $evaluation->supervisorHasSubmittedAllQuestions()) || 
										($userIsMarker && $evaluation->markerHasSubmittedAllQuestions()))
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
								@if(!$evaluation->is_finalised)
									<div class="ml-auto">
										@if(($userIsSupervisor && !$evaluation->supervisorHasSubmittedAllQuestions()) || 
												($userIsMarker && !$evaluation->markerHasSubmittedAllQuestions()))
											<button type="button" id="edit" class="btn btn-secondary"><span class="svg-xs">@include('svg.pencil')</span>Edit</button>
										@else
											@if(!$evaluation->supervisorHasSubmittedAllQuestions())
												<p class="text-muted">The project evaluation is not ready to be finalised because {{ $supervisor->getFullName() }} has not completed their evaluation.</p>
											@elseif(!$evaluation->markerHasSubmittedAllQuestions())
												<p class="text-muted">The project evaluation is not ready to be finalised because {{ $marker->getFullName() }} has not completed their evaluation.</p>
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
											@if($evaluation->hasPosterPresentationQuestion())
												<div class="col-6">
													<label class="text-muted mb-0"><span class="svg-sm">@include('svg.eye')</span>Poster</label>
													<div class="text-center text-muted" style="font-size: 2rem">
														{{ $poster->finalValue }}%
													</div>
												</div>
											@endif

											@if($evaluation->hasOralPresentationQuestion())
												<div class="col-6">
													<label class="text-muted mb-0"><span class="svg-sm">@include('svg.presentation')</span>Presentation</label>
													<div class="text-center text-muted" style="font-size: 2rem">
															{{ $presentation->finalValue }}%
													</div>
												</div>
											@endif

											@if($evaluation->hasDissertationQuestion())
												<div class="col-12 mt-3">
													<label class="text-muted mb-0"><span class="svg-md">@include('svg.paper-stacked')</span>Dissertation Mark</label>
													<div class="text-center text-muted" style="font-size: 4rem">
															{{ $dissertation->finalValue }}%
													</div>
												</div>
											@endif
										</div>
									</div>

									@if($evaluation->hasDissertationQuestion())
										<div class="col-12 col-sm-6 col-md-8">
											<label><b>Joint Report</b></label>
											<p class="pl-2" class="text-pre-wrap">{{ $dissertation->finalComment }}</p>
										</div>
									@endif

									<div class="col-12">
										<label><b>Student Feedback</b></label>
										<p class="pl-2" class="text-pre-wrap">{{ $studentFeedback->supervisorComment }}</p>
									</div>
								</div>

								<button class="btn btn-light mt-5 w-100" id="ExpandQuestions" type="button" data-toggle="collapse" data-target="#ProjectEvaluationQuestions">Show all comments</button>
							@endif

							<div id="ProjectEvaluationQuestions" @if($evaluation->is_finalised) class="collapse mt-3" @endif>
								@php
									$prevQuestionGroup = null;
								@endphp

								@foreach($questions as $question)
									@php
										$canViewSupervisorValuesForGroup = $userIsSupervisor || ($userIsMarker && $evaluation->markerHasSubmittedAllQuestions($question->group));
										$canViewMarkerValuesForGroup = $userIsMarker || ($userIsSupervisor && $evaluation->supervisorHasSubmittedAllQuestions($question->group));

										$supervisorHasSubmitted = $userIsSupervisor && $evaluation->supervisorHasSubmittedAllQuestions($question->group);
										$markerHasSubmitted = $userIsMarker && $evaluation->markerHasSubmittedAllQuestions($question->group);

										if(Auth::user()->isExternalMarker()){
											$canViewSupervisorValuesForGroup = true;
											$canViewMarkerValuesForGroup = true;
										}
									@endphp

									<div class="row">
										<div class="col-12">
											@if(is_null($prevQuestionGroup))
												<h1 class="mt-5 mb-3">Group {{ $question->group }}</h1>
											@endif
										</div>

										<div class="col-12">
											@if($prevQuestionGroup != $question->group)
												@if($prevQuestionGroup != null)
													{{-- PREV GOURP --}}

													@if(!$evaluation->is_finalised)
														@if(
															($userIsSupervisor && $evaluation->supervisorHasSubmittedAllQuestions($prevQuestionGroup)) || 
															($userIsMarker && $evaluation->markerHasSubmittedAllQuestions($prevQuestionGroup))
														)
															<div class="text-right">
																<p class="text-muted">You have submitted Group {{ $prevQuestionGroup }}</p>
																<a class="btn btn-sm btn-outline-secondary" href="{{ action('ProjectEvaluationController@unsubmitGroup', ['project' => $project->id, 'group' => $prevQuestionGroup]) }}">UNSUBMIT</a>
															</div>

															<input type="hidden" id="submitted_group_{{ $prevQuestionGroup }}" value="true">
														@else
															<div class="text-right">
																<button class="btn js-submission btn-primary mt-3" type="button" data-activator data-dialog="submit-group-{{ $prevQuestionGroup }}-dialog">Submit Group {{ $prevQuestionGroup }}</button>
															</div>
														@endif
													@endif

													{{-- NEW GROUP --}}
													<h1 class="mt-5 mb-3">Group {{ $question->group }}</h1>

													@if($userIsSupervisor && !$canViewMarkerValuesForGroup)
														<h6 class="text-muted">The second marker's marks are hidden until you submit <b>Group {{ $question->group }}</b></h6>
													@elseif($userIsMarker && !$canViewSupervisorValuesForGroup)
														<h6 class="text-muted">The supervisor's marks are hidden until you submit <b>Group {{ $question->group }}</b></h6>
													@endif
												@endif

												@php
													$prevQuestionGroup = $question->group;
												@endphp
											@endif
										</div>

										<div class="col-12 d-flex">
											<span class="text-uppercase font-weight-bold">{{ $loop->iteration.". ".$question->title }}</span>@if(!empty($question->description))<span class="text-muted">&nbsp;{{ $question->description }}</span>@endif
										</div>

										@foreach(['supervisor', 'marker'] as $type)
											@php
												$valueAccessor = $type.'Value';
												$commentAccessor = $type.'Comment';
											@endphp

											<div class="col-6">
												@if($question->submissionType == SussexProjects\PEQSubmissionTypes::SupervisorOnly && $type == "marker")
													<p class="m-0">{{ ucfirst($type) }} <i>(Optional)</i></p>
												@else
													<p class="m-0">{{ ucfirst($type) }}</p>
												@endif

												@if(($type == "supervisor" && $canViewSupervisorValuesForGroup) || ($type == "marker" && $canViewMarkerValuesForGroup))
													@switch($question->type)
														@case(SussexProjects\PEQValueTypes::Scale)
															<p data-group="{{ $question->group }}" class="js-value {{ $type }} pl-2"></p>
															<input class="js-input {{ $type }} custom-range" type="range" step="1" min="0" max="10" name="{{ $loop->parent->index }}_{{ $type }}_value" value="{{ $question->$valueAccessor }}" @if(is_null($question->$valueAccessor)) data-unset @endif>
															@break

														@case(SussexProjects\PEQValueTypes::Number)
														@case(SussexProjects\PEQValueTypes::PosterPresentation)
														@case(SussexProjects\PEQValueTypes::OralPresentation)
														@case(SussexProjects\PEQValueTypes::Dissertation)
															<p data-group="{{ $question->group }}" class="js-value {{ $type }} pl-2">{{ is_null($question->$valueAccessor) ? 'Not Set' : $question->$valueAccessor }}</p>
															<input class="js-input {{ $type }} form-control" type="number" step="1" min="0" max="100" name="{{ $loop->parent->index }}_{{ $type }}_value" value="{{ $question->$valueAccessor }}">
															@break

														@case(SussexProjects\PEQValueTypes::YesNo)
															<p data-group="{{ $question->group }}" class="js-value {{ $type }} pl-2">
																@if(is_null($question->$valueAccessor))
																	Not Set
																@elseif($question->$valueAccessor == 0)
																	No
																@elseif($question->$valueAccessor == 1)
																	Yes
																@endif
															</p>

															<select class="js-input {{ $type }} form-control" name="{{ $loop->parent->index }}_{{ $type }}_value">
																<option @if($question->$valueAccessor == 0) selected @endif value="0">No</option>
																<option @if($question->$valueAccessor == 1) selected @endif value="1">Yes</option>
															</select>
															@break

														@case(SussexProjects\PEQValueTypes::YesPossiblyNo)
															<p data-group="{{ $question->group }}" class="js-value {{ $type }} pl-2">
																@if(is_null($question->$valueAccessor))
																	Not Set
																@elseif($question->$valueAccessor === 0)
																	No
																@elseif($question->$valueAccessor === 1)
																	Possibly
																@elseif($question->$valueAccessor === 2)
																	Yes
																@endif
															</p>

															<select class="js-input {{ $type }} form-control" name="{{ $loop->parent->index }}_{{ $type }}_value">
																<option @if($question->$valueAccessor === 0) selected @endif value="0">No</option>
																<option @if($question->$valueAccessor === 1) selected @endif value="1">Possibly</option>
																<option @if($question->$valueAccessor === 2) selected @endif value="2">Yes</option>
															</select>
															@break
													
														@case(SussexProjects\PEQValueTypes::CommentOnly)
														@case(SussexProjects\PEQValueTypes::StudentFeedback)
															<p data-group="{{ $question->group }}" class="js-value text-pre-wrap {{ $type }} pl-2">{{ $question->$valueAccessor }}</p>
															@break

														@default
															<p data-group="{{ $question->group }}" class="js-value {{ $type }}">{{ $question->$valueAccessor }}</p>
															<input class="js-input {{ $type }} form-control" type="text" name="{{ $loop->parent->index }}_{{ $type }}_value" value="{{ $question->$valueAccessor }}">
													@endswitch

													@if($question->type != SussexProjects\PEQValueTypes::CommentOnly && 
															$question->type != SussexProjects\PEQValueTypes::StudentFeedback)
														<p class="mt-3 mb-1 {{ $loop->index > 0 ? 'invisible' : '' }}">Comments:</p>
													@endif

													<p data-group="{{ $question->group }}" class="js-value text-pre-wrap {{ $type }} pl-2 mt-3" style="min-height: 100px;">{{ $question->$commentAccessor }}</p>
													<textarea class="js-input {{ $type }} mb-3 form-control" style="min-height: 100px;" name="{{ $loop->parent->index }}_{{ $type }}_comment">{{ $question->$commentAccessor }}</textarea>
												@else
													<p class="bg-light text-muted mt-1 py-1 text-center rounded">Hidden</p>
													<p class="mt-3 mb-1">Comments:</p>
													<p class="bg-light text-muted py-5 text-center rounded">Hidden</p>
												@endif
											</div>
										@endforeach

										@if($loop->iteration == count($questions) && !$evaluation->is_finalised)
											@if(
												($userIsSupervisor && $evaluation->supervisorHasSubmittedAllQuestions($question->group)) || 
												($userIsMarker && $evaluation->markerHasSubmittedAllQuestions($question->group))
											)
												<div class="col-12 text-right">
													<p class="text-muted">You have submitted Group {{ $prevQuestionGroup }}</p>
													<a class="btn btn-sm btn-outline-secondary" href="{{ action('ProjectEvaluationController@unsubmitGroup', ['project' => $project->id, 'group' => $prevQuestionGroup]) }}">UNSUBMIT</a>

													<input type="hidden" id="submitted_group_{{ $prevQuestionGroup }}" value="true">
												</div>
											@else
												<div class="col-12 text-right">
													<button class="btn js-submission btn-primary my-3" type="button" data-activator data-dialog="submit-group-{{ $prevQuestionGroup }}-dialog">Submit Group {{ $prevQuestionGroup }}</button>
												</div>
											@endif
										@endif
									</div>
								@endforeach
							</div>

							@if(!$evaluation->is_finalised)
								<div class="text-right">
									@if(($userIsSupervisor && !$evaluation->supervisorHasSubmittedAllQuestions()) || 
											($userIsMarker && !$evaluation->markerHasSubmittedAllQuestions()))
										<button id="save" class="btn btn-primary">Save</button>
										<button id="cancel" class="btn btn-secondary">Cancel</button>
									@endif
								</div>
							@endif
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

@foreach($evaluation->getGroups() as $group)
	@php
		$isFilled = $userIsSupervisor ? $evaluation->hasSupervisorFilledGroup($group) : $evaluation->hasMarkerFilledGroup($group);
		$showSubmitModalForCurrentGroup = 
				($userIsSupervisor && !$evaluation->supervisorHasSubmittedAllQuestions($group)) || 
				($userIsMarker && !$evaluation->markerHasSubmittedAllQuestions($group));
	@endphp

	@if($showSubmitModalForCurrentGroup)

		{{-- SUBMIT MODAL --}}
		<div class="dialog" data-dialog="submit-group-{{ $group }}-dialog">
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
								You are about to submit your part for <b>Group {{ $group }}</b> of the project evaluation.
								Once you do this, you will no longer be able to edit your marks or comments for this section.
							</p>
						</div>
					@else
						<div class="col-12">
							<p>You may not submit <b>Group {{ $group }}</b> of the project evaluation for the following reasons:</p>

							<ul>
								{!! $userIsSupervisor ? $evaluation->getSupervisorQuestionsLeftToFillSummary($group) : $evaluation->getMarkerQuestionsLeftToFillSummary($group) !!}
							</ul>
						</div>
					@endif
				</div>
			</div>

			@if($isFilled)
				<div class="footer bg-light border-top p-2 text-right">
					<form id="project-evaluation-submit-group-{{ $group }}-form" action="{{ action('ProjectEvaluationController@submitGroup', ['project' => $project->id, 'group' => $group]) }}" method="POST" accept-charset="utf-8">
						{{ csrf_field() }}
						{{ method_field('PATCH') }}

						<button data-group="{{ $group }}" type="submit" class="btn btn-primary">SUBMIT</button>
					</form>
				</div>
			@endif
		</div>
	@endif
@endforeach

@if(!$evaluation->is_finalised)
	{{-- FINALISE MODAL --}}
	<div class="dialog modal-lg" data-dialog="finalise-evaluation-dialog">
		<div class="border-bottom">
			<h4 id="dialog-title" class="text-center p-3 m-0 font-weight-bold text-uppercase">Finalise Project Evaluation</h4>
		</div>

		<div class="container px-4 pb-3">
			<form id="project-evaluation-finalise-form" action="{{ action('ProjectEvaluationController@finalise', ['project' => $project->id]) }}" method="POST" accept-charset="utf-8">
				{{ csrf_field() }}
				{{ method_field('PATCH') }}

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
								This means that the second marker's marks and yours straddle a threshold.
								The threshold the mark is straddling is <b>{{ $straddles }}%</b>.
								Because of this, you must fill out a joint report explaining how you and the second marker came to the agreed dissertation mark.
								<br><br>
								Before finalising this report, please make sure you and <b>{{ $marker->getFullName() }}</b> fully agree on the mark.
							</p>
						@endif

						@if($differsByPercentage)
							<h4>Percentage Threshold</h4>
							<p>
								The difference between the second marker's marks and yours are greater than {{ $maxDifference }}%.
								Because of this, you must fill out a joint report explaining how you and the second marker came to the agreed dissertation mark.
								<br><br>
								Before finalising this report, please make sure you and <b>{{ $marker->getFullName() }}</b> fully agree on the mark.
							</p>
						@endif
					</div>

					<div class="col-6">
						<label class="text-muted"><span class="svg-sm">@include('svg.eye')</span>Poster Mark</label>

						@if($evaluation->hasPosterPresentationQuestion())
							<div class="d-flex">
								<input class="d-inline-block flex-grow-1 text-right" style="font-size: 2rem" type="number" id="poster-final-mark" name="poster_final_mark" value="{{ floor(($poster->supervisorValue + $poster->markerValue) / 2) }}" min="0" max="100" step="1">
								<span class="p-2" style="font-size: 2rem">%</span>
							</div>
							<p class="text-muted mb-0"><small>Supervisor {{ $poster->supervisorValue }} | Marker {{ $poster->markerValue }}</small></p>
						@else
							<p>Not part of evaluation</p>
						@endif

						<label class="mt-3 text-muted"><span class="svg-sm">@include('svg.presentation')</span>Oral Presentation Mark</label>

						@if($evaluation->hasPosterPresentationQuestion())
							<div class="d-flex">
								<input class="d-inline-block flex-grow-1 text-right" style="font-size: 2rem" type="number" id="presentation-final-mark" name="presentation_final_mark" value="{{ floor(($presentation->supervisorValue + $presentation->markerValue) / 2) }}" min="0" max="100" step="1">
								<span class="p-2" style="font-size: 2rem">%</span>
							</div>
							<p class="text-muted mb-0"><small>Supervisor {{ $presentation->supervisorValue }} | Marker {{ $presentation->markerValue }}</small></p>
						@else
							<p>Not part of evaluation</p>
						@endif
						<label class="mt-3 text-muted"><span class="svg-sm">@include('svg.paper-stacked')</span>Dissertation Mark</label>

						@if($evaluation->hasPosterPresentationQuestion())
							<div class="d-flex">
								<input class="d-inline-block flex-grow-1 text-right" style="font-size: 2rem" type="number" id="dissertation-final-mark" name="dissertation_final_mark" value="{{ floor(($dissertation->supervisorValue + $dissertation->markerValue) / 2) }}" min="0" max="100" step="1">
								<span class="p-2" style="font-size: 2rem">%</span>
							</div>
							<p class="text-muted mb-0"><small>Supervisor {{ $dissertation->supervisorValue }} | Marker {{ $dissertation->markerValue }}</small></p>
						@else
							<p>Not part of evaluation</p>
						@endif
						<p class="mt-1 text-muted"><small>Fields are auto-filled with the average mark</small></p>
					</div>

					@if($straddles != false || $differsByPercentage)
						<div class="col-12 mt-3">
							<div class="form-group">
								<label for="jointReport">Joint Report <br><ins><small>Explain how you and {{ $marker->first_name }} agreed on the final dissertation mark.</small></ins></label>
								<textarea class="form-control" style="min-height: 200px" name="joint_report" id="jointReport"></textarea>
							</div>
						</div>
					@endif
				</div>
			</form>
		</div>
		
		<div class="footer bg-light border-top p-2 text-right">
			<button id="finalise" type="button" class="btn btn-primary">{{ ($straddles == false || $differsByPercentage) ? "FINALISE" : "AGREE & FINALISE"}}</button>
		</div>
	</div>
@endif
@endsection
