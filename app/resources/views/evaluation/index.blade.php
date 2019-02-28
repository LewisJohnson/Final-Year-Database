@extends('layouts.app')
@section('content')

@php
	$supervisor = $project->supervisor->user;
	$marker = $project->marker->user;
@endphp

@section('scripts')
	<script type="text/javascript">
		Window["isFinialised"] = {{ $evaluation->is_finalised ? 'true' : 'false' }};
		Window["isSupervisor"] = {{ Auth::user()->id == $supervisor->id ? 'true' : 'false' }};
		Window["isMarker"] = {{ Auth::user()->id == $marker->id ? 'true' : 'false' }};
	</script>

	<script src="{{ asset('js/views/student-portfolio.js') }}"></script>
@endsection

@section('content')

<div class="centered mw-800 student-portfolio">
	<div class="row mt-3">
		<div class="col-12">
			@if(is_null($marker))
				<p>This page is unavailable as a second marker has not been assigned to "{{ $project->title }}".</p>
			@else
				<form id="portfolioForm" action="{{ action('ProjectEvaluationController@update', $project->id) }}" method="POST" accept-charset="utf-8">
					{{ csrf_field() }}
					{{ method_field('PATCH') }}

					<div class="card">
						<div class="card-body">
							<h1>Project Evaluation</h1>
				{{-- 			<h2 class="supervisor">{{ $evaluation->student->user->getFullName() }}</h2>


							<p><b>Programme</b> - {{ $student->user->programme_relationship->name }}</p>

							<p><b>Project</b> - {{ $student->project->title }}</p>
				--}}
							<ul class="list-unstyled">
								<li><b>Project</b> - {{ $project->title }}</li>
								<li><b>Supervisor</b> - {{ $supervisor->getFullName() }}</li>
								<li><b>Second Marker</b> - {{ $marker->getFullName() }}</li>
								<li><b>Status</b> - <span class="text-success">Editable</span></li>
							</ul>

							<hr>

							@foreach ($project->evaluation->getQuestions() as $question)
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
														<input class="supervisor js-input form-control" type="number" min="0" max="100" name="{{ $loop->index }}_supervisor_value" value="{{ $question->SupervisorValue }}">
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
														<input class="marker js-input form-control" type="number" min="0" max="100" name="{{ $loop->index }}_marker_value" value="{{ $question->MarkerValue }}">
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
												
													@default
														<p class="marker js-value">{{ $question->MarkerValue }}</p>
														<input class="marker js-input form-control" type="text" name="{{ $loop->index }}_marker_value" value="{{ $question->MarkerValue }}">
												@endswitch
											</div>

											@if($evaluation->is_finalised)
												<div class="col-6">
													<p>Final</p>
													<input class="w-100" type="text" name="{{ $loop->index }}_final_value" value="{{ $question->FinalValue }}">
												</div>
											@endif


											<div class="col-12">
												<p class="mb-0">Comments:</p>
											</div>

											<div class="col-6" style="min-height: 100px">
												<p class="supervisor js-value pl-2">{{ $question->SupervisorComment }}</p>
												<textarea class="supervisor js-input form-control" name="{{ $loop->index }}_supervisor_comment">{{ $question->SupervisorComment }}</textarea>
											</div>
	
											<div class="col-6">
												<p class="marker js-value pl-2">{{ $question->MarkerComment }}</p>
												<textarea class="marker js-input form-control" name="{{ $loop->index }}_marker_comment">{{ $question->MarkerComment }}</textarea>
											</div>

											@if($evaluation->is_finalised)
												<div class="col-6">
													<p class="final js-value pl-2">{{ $question->FinalComment }}</p>
													<textarea class="final js-input form-control" name="{{ $loop->index }}_final_comment">{{ $question->FinalComment }}</textarea>
												</div>
											@endif
										</div>
							@endforeach

							<div class="text-right mt-3">
								@if(!$evaluation->is_finalised)
									<a id="edit" class="btn button--raised" href="#">Edit</a>
									<button id="save" class="btn btn-primary">Save</button>
									<a id="finalise" class="btn button--raised" href="#">Finalise</a>
								@endif
							</div>
						</div>
					</div>
				</form>
			@endif
		</div>
	</div>
</div>
@endsection
