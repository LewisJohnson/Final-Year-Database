@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section ('content')

@php
	$thresholds = SussexProjects\Mode::getThresholds();
	$questions = SussexProjects\Mode::getEvaluationQuestions();
@endphp

<div class="centered mw-800">
	<div class="card">
		<div class="card-header">{{ ucfirst(Session::get('education_level')["longName"]) }} Parameters</div>

		<div class="card-body">
			<form class="form" method="POST" action="{{ action('ModeController@update') }}">
				{{ csrf_field() }}
	
				<p class="text-muted">
					The date you set will be the day the action will be permitted, not midnight on this day.<br>
					For example, if you set the date to {{ Carbon\Carbon::now()->format('d/m/Y') }}, the action will be permitted on {{ Carbon\Carbon::now()->format('d/m/Y') }} 00:00.
				</p>

				<div class="row">
					<div class="col-12 col-md-6">
						<h5>Dates</h5>
						<div class="form-group">
							<label for="project_selection">Student Selection Date</label>
							<br>
							<input class="form-control" type="date" name="project_selection" value="{{ SussexProjects\Mode::getProjectSelectionDate()->toDateString() }}">
						</div>
			
						<div class="form-group">
							<label for="supervisor_accept">Supervisor Accept Date</label>
							<br>
							<input class="form-control" type="date" name="supervisor_accept" value="{{ SussexProjects\Mode::getSupervisorAcceptDate()->toDateString() }}">
						</div>
			
						<div class="form-group">
							<label for="project_year">Project Year</label>
							<br>
							<select class="form-control" id="project_year" name="project_year">
								@for ($i = (date("Y") - 5); $i < (date("Y") + 5); $i++)
									<option @if($i == SussexProjects\Mode::getProjectYear()) selected @endif>{{ $i }}</option>
								@endfor
							</select>
						</div>
					</div>

					<div class="col-12 col-md-6 border-left">
						<h5>Evaluation Thresholds</h5>

						<ul class="list-group" id="thresholds-list">
							@if(!empty($thresholds))
								@if(count($thresholds) > 0)
									@foreach($thresholds as $threshold)
										<li class="list-group-item">
											<div class="d-flex">
												<span>{{ $threshold }}%</span>
												<button type="button" class="btn btn-sm btn-outline-danger ml-auto js-deleteThreshold">Remove</button>
												<input type="hidden" name="thresholds[]" value="{{ $threshold }}">
											</div>
										</li>
									@endforeach
								@endif
							@endif
						</ul>

						<div class="form-inline mt-3">
							<div class="form-group w-100">
								<input id="new-threshold-value" class="form-control flex-grow-1" placeholder="Threshold value" type="number" min="0" max="100">
								<button id="new-threshold-button" class="btn btn-outline-primary ml-2" type="button">Add</button>
							</div>
						</div>
					</div>

					<div class="col-12 border-top mt-3">
						<h5 class="mt-3">Evaluation Questions</h5>

						<ul class="list-group" id="questions-list">
							@if(count($questions) > 0)
								@foreach($questions as $question)
									<li class="list-group-item">
										<div class="row">
											<div class="col-12 d-flex">
												Question {{ $loop->iteration }}
												<button type="button" class="btn btn-sm btn-outline-danger ml-auto js-deleteQuestion">Remove</button>
											</div>
											<div class="col-8">
												<label>Title</label>
												<input class="form-control" type="text" name="title[]" value="{{ $question->title }}">
											</div>
											<div class="col-4">
												<label>Type</label>
												<select class="form-control" name="type[]">
													<option @if($question->type == 3) selected @endif value="3">Poster Presentation</option>
													<option @if($question->type == 4) selected @endif value="4">Oral Presentation</option>
													<option @if($question->type == 5) selected @endif value="5">Dissertation</option>
													<option @if($question->type == 9) selected @endif value="9">Student Feedback</option>
													<option disabled><hr></option>
													<option @if($question->type == 0) selected @endif value="0">Plain Text</option>
													<option @if($question->type == 1) selected @endif value="1">Scale (Fail > Excellent)</option>
													<option @if($question->type == 2) selected @endif value="2">Number</option>
													<option @if($question->type == 6) selected @endif value="6">Yes/No</option>
													<option @if($question->type == 7) selected @endif value="7">Yes/Possibly/No</option>
													<option @if($question->type == 8) selected @endif value="8">Comment Only</option>
												</select>
											</div>
										</div>

										<label class="mt-2">Description</label>
										<input class="form-control" type="text" name="description[]	" value="{{ $question->description }}">
									</li>
								@endforeach
							@endif
						</ul>

						<div class="mt-3">
							<button id="new-question-button" class="btn btn-outline-primary ml-2" type="button">Add New Question</button>
						</div>
					</div>
				</div>
	
				<div class="text-right">
					<button class="btn btn-primary" type="submit" value="Submit">Update</button>
				</div>
	
				@include ('partials.errors')
			</form>
		</div>
	</div>
</div>

@endsection
