@extends('layouts.app')
@section('content')

@php
	$supervisor = $project->supervisor->user;
	$marker = $project->marker->user;
	$dissertation = $project->evaluation->getQuestions()[SussexProjects\ProjectEvaluation::DissertationMarkIndex];
	$thresholds = SussexProjects\Mode::getThresholds();

	$isFilled = $dissertation->SupervisorValue > 0 && $dissertation->MarkerValue > 0;
	$straddles = false;

	foreach ($thresholds as $threshold) {
		if(($dissertation->SupervisorValue > $threshold && $dissertation->MarkerValue < $threshold) ||
			($dissertation->SupervisorValue < $threshold && $dissertation->MarkerValue > $threshold)) {
			$straddles = $threshold;
		}
	}
@endphp

@section('scripts')
	<script type="text/javascript">
		Window["isSupervisor"] = {{ Auth::user()->id == $supervisor->id ? 'true' : 'false' }};
		Window["isMarker"] = {{ Auth::user()->id == $marker->id ? 'true' : 'false' }};
	</script>

	<script src="{{ asset('js/views/project-evaluation.js') }}"></script>
@endsection

@section('content')

<div class="centered mw-800">
	<div class="row mt-3">
		<div class="col-12">
			@if(is_null($marker))
				<p>This page is unavailable as a second marker has not been assigned to "{{ $project->title }}".</p>
			@else
				<form id="projectEvaluationForm" action="{{ action('ProjectEvaluationController@update', $project->id) }}" method="POST" accept-charset="utf-8">
					
					{{-- Just incase someone tries to submit a finalised report --}}										
					@if(!$evaluation->is_finalised)
						{{ csrf_field() }}
						{{ method_field('PATCH') }}
					@endif

					<div class="card">
						<div class="card-body">
							<h1 class="d-flex">Project Evaluation
								@if($evaluation->is_finalised)
									<span class="ml-auto text-danger">Finalised</span>
								@else
									<span class="ml-auto text-warning">In-Progress</span>
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

							<hr>

							@if($evaluation->is_finalised)
								<div class="row">
									<div class="col-6">
										<label>Final Mark</label>
										<p class="pl-2" style="font-size: 5rem; line-height: 1">{{ $dissertation->FinalValue }}%</p>
									</div>

									<div class="col-6">
										<label>Joint Report</label>
										<p class="pl-2">{{ $dissertation->FinalComment }}</p>
									</div>
								</div>

								<button class="btn btn-light mt-5 w-100" type="button" data-toggle="collapse" data-target="#ProjectEvaluationQuestions">Show all questions</button>
							@endif

							<div @if($evaluation->is_finalised) id="ProjectEvaluationQuestions" class="collapse mt-3" @endif>
								@foreach($project->evaluation->getQuestions() as $question)
									<div class="row">
										<div class="col-12">
											<p>
												<span class="text-uppercase font-weight-bold">{{ $loop->iteration.". ".$question->title }}</span> @if(!empty($question->description)) ({{ $question->description }}) @endif
											</p>
										</div>

										<div class="col-6">
											<p class="m-0">Supervisor</p>

											@switch($question->type)
												@case(SussexProjects\PEQValueTypes::Scale)
													<p class="js-value supervisor pl-2"></p>
													<input class="supervisor js-input custom-range" type="range" step="1" min="0" max="7" name="{{ $loop->index }}_supervisor_value" value="{{ $question->SupervisorValue }}">
													@break

												@case(SussexProjects\PEQValueTypes::Number)
													<p class="js-value supervisor pl-2">{{ $question->SupervisorValue }}</p>
													<input class="supervisor js-input form-control" type="number" step="1" min="0" max="100" name="{{ $loop->index }}_supervisor_value" value="{{ $question->SupervisorValue }}">
													@break

												@case(SussexProjects\PEQValueTypes::YesNo)
													<p class="js-value supervisor pl-2">{{ $question->SupervisorValue == 0 ? 'No' : 'Yes' }}</p>
													<select class="supervisor js-input form-control" name="{{ $loop->index }}_supervisor_value">
														<option @if($question->SupervisorValue == 0) selected @endif value="0">No</option>
														<option @if($question->SupervisorValue == 1) selected @endif value="1">Yes</option>
													</select>
													@break

												@case(SussexProjects\PEQValueTypes::YesNoPossibly)
													<p class="js-value supervisor pl-2">
														@switch($question->SupervisorValue)
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

													<select class="supervisor js-input form-control" name="{{ $loop->index }}_supervisor_value">
														<option @if($question->SupervisorValue == 0) selected @endif value="0">No</option>
														<option @if($question->SupervisorValue == 1) selected @endif value="1">Possibly</option>
														<option @if($question->SupervisorValue == 2) selected @endif value="2">Yes</option>
													</select>
													@break
											
												@case(SussexProjects\PEQValueTypes::CommentOnly)
													<p class="js-value supervisor pl-2">{{ $question->SupervisorValue }}</p>
													@break

												@default
													<p class="supervisor js-value">{{ $question->SupervisorValue }}</p>
													<input class="supervisor js-input form-control" type="text" name="{{ $loop->index }}_supervisor_value" value="{{ $question->SupervisorValue }}">
											@endswitch
										</div>

										<div class="col-6">
											<p class="m-0">Second Marker</p>
											@switch($question->type)
												@case(SussexProjects\PEQValueTypes::Scale)
													<p class="js-value marker pl-2"></p>
													<input class="marker js-input custom-range" type="range" step="1" min="0" max="7" name="{{ $loop->index }}_marker_value" value="{{ $question->MarkerValue }}">
													@break

												@case(SussexProjects\PEQValueTypes::Number)
													<p class="js-value marker pl-2">{{ $question->MarkerValue }}</p>
													<input class="marker js-input form-control" type="number" step="1" min="0" max="100" name="{{ $loop->index }}_marker_value" value="{{ $question->MarkerValue }}">
													@break

												@case(SussexProjects\PEQValueTypes::YesNo)
													<p class="js-value marker pl-2">{{ $question->MarkerValue == 0 ? 'No' : 'Yes' }}</p>
													<select class="marker js-input form-control" name="{{ $loop->index }}_marker_value">
														<option @if($question->MarkerValue == 0) selected @endif value="0">No</option>
														<option @if($question->MarkerValue == 1) selected @endif value="1">Yes</option>
													</select>
													@break

												@case(SussexProjects\PEQValueTypes::YesNoPossibly)
													<p class="js-value marker pl-2">
														@switch($question->MarkerValue)
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

													<select class="marker js-input form-control" name="{{ $loop->index }}_marker_value">
														<option @if($question->MarkerValue == 0) selected @endif value="0">No</option>
														<option @if($question->MarkerValue == 1) selected @endif value="1">Possibly</option>
														<option @if($question->MarkerValue == 2) selected @endif value="2">Yes</option>
													</select>
													@break
											
												@case(SussexProjects\PEQValueTypes::CommentOnly)
													<p class="js-value supervisor pl-2">{{ $question->SupervisorValue }}</p>
													@break

												@default
													<p class="marker js-value">{{ $question->MarkerValue }}</p>
													<input class="marker js-input form-control" type="text" name="{{ $loop->index }}_marker_value" value="{{ $question->MarkerValue }}">
											@endswitch
										</div>

										@if($question->type != SussexProjects\PEQValueTypes::CommentOnly)
											<div class="col-12">
												<p class="mb-0">Comments:</p>
											</div>
										@endif

										<div class="col-6" style="min-height: 100px">
											<p class="supervisor js-value pl-2">{{ $question->SupervisorComment }}</p>
											<textarea class="supervisor js-input form-control" name="{{ $loop->index }}_supervisor_comment">{{ $question->SupervisorComment }}</textarea>
										</div>

										<div class="col-6">
											<p class="marker js-value pl-2">{{ $question->MarkerComment }}</p>
											<textarea class="marker js-input form-control" name="{{ $loop->index }}_marker_comment">{{ $question->MarkerComment }}</textarea>
										</div>
									</div>
								@endforeach
							</div>

							<div class="text-right mt-3">
								@if(!$evaluation->is_finalised)
									@if(Auth::user()->id == $supervisor->id)
										<button id="finaliseEvaluation" type="button" data-activator="true" data-dialog="finalise-evaluation-dialog" class="btn btn-secondary">Finalise</button>
									@endif

									@if(Auth::user()->id == $supervisor->id || Auth::user()->id == $marker->id)
										<button type="button" id="edit" class="btn btn-primary">Edit</button>
										<button id="save" class="btn btn-primary">Save</button>
									@endif
								@endif
							</div>
						</div>
					</div>
				</form>

				@if($evaluation->is_finalised && Auth::user()->isAdminOfEducationLevel(Session::get('education_level')["shortName"]))
					<form action="{{ action('ProjectEvaluationController@undoFinalise', $evaluation->id) }}" method="POST" accept-charset="utf-8">
						{{ csrf_field() }}
						<div class="text-right mt-3">
							<button class="btn btn-danger" type="submit">UN-FINALISE</button>
						</div>
					</form>
				@endif
			@endif
		</div>
	</div>
</div>

@if(!$evaluation->is_finalised)
	{{-- FINALISE MODAL --}}
	<div class="dialog" data-dialog="finalise-evaluation-dialog">
		<div class="border-bottom">
			<h4 id="dialog-title" class="text-center p-3 m-0 font-weight-bold text-uppercase">Finalise Project Evaluation</h4>
		</div>

		<div class="container px-4 pb-3">
			<div class="row mt-3">
				<div class="col-12">
				@if($isFilled)
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
							Because of this, you must fill out a joint report explaining how you and the second marker came to the agreed mark.
							<br><br>
							Before finalising this report, please make sure you and <b>{{ $marker->getFullName() }}</b> fully agree on the mark.
						</p>

						<div class="form-group">
							<label for="jointReport">Joint Report <br><ins><small>Explain how you and {{ $marker->first_name }} agreed on this mark.</small></ins></label>
							<textarea rows="10" class="form-control" name="joint_report" id="jointReport"></textarea>
						</div>
					@endif

					<label>Final Mark <br><ins><small>This field was auto-filled with the average mark</small></ins></label>

					<div class="d-flex">
						<input class="d-inline-block flex-grow-1 text-right" style="font-size: 5rem" type="number" id="finalMark" name="final_mark" value="{{ floor(($dissertation->SupervisorValue + $dissertation->MarkerValue) / 2) }}" min="0" max="100" step="1">
						<span class="p-2" style="font-size: 5rem">%</span>
					</div>

					<input type="hidden" name="finalise" value="true">
				@else
					{{-- <p>You may not finalise the project evaluation for the following reasons:</p> --}}
				@endif
					
				</div>
			</div>
		</div>

		@if($isFilled)
			<div class="footer bg-light border-top p-2 text-right">
				<button id="finalise" type="button" class="btn btn-primary">{{ $straddles == false ? "FINALISE" : "AGREE & FINALISE"}}</button>				</div>
			</div>
		@endif
	</div>
@endif
@endsection
