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
	<h2>Global Parameters <small class="text-muted">/ Amend {{ ucfirst(Session::get('education_level')["longName"]) }} Global Parameters</small></h2>

	<div class="alert alert-info mt-3">
		<span>&#128161;</span><span class="ml-2">Change all the settings you wish then press Update at the bottom of the page</span>
	</div>

	<div class="card">
		<div class="card-body">
			<ul class="nav nav-pills mb-3" id="tab" role="tablist">
				<li class="nav-item">
					<a onclick="$('.centered').removeClass('mw-1200').addClass('mw-800');" class="nav-link active" id="dates-tab" data-toggle="pill" href="#dates" role="tab" aria-controls="dates" aria-selected="true">Dates</a>
				</li>

				<li class="nav-item">
					<a onclick="$('.centered').removeClass('mw-1200').addClass('mw-800');" class="nav-link" id="thresholds-tab" data-toggle="pill" href="#thresholds" role="tab" aria-controls="thresholds" aria-selected="false">Evaluation Thresholds</a>
				</li>

				<li class="nav-item">
					<a onclick="$('.centered').removeClass('mw-800').addClass('mw-1200');" class="nav-link" id="questions-tab" data-toggle="pill" href="#questions" role="tab" aria-controls="questions" aria-selected="false">Evaluation Questions</a>
				</li>
			</ul>

			<form class="form" method="POST" action="{{ action('ModeController@update') }}">
				{{ csrf_field() }}
				<div class="tab-content my-3" id="tabContent">
					<div class="tab-pane fade show active" id="dates" role="tabpanel" aria-labelledby="dates-tab">
						<p class="text-muted">
							The date you set will be the day the action will be permitted, not midnight on this day.<br>
							For example, if you set the date to {{ Carbon\Carbon::now()->format('d/m/Y') }}, the action will be permitted on {{ Carbon\Carbon::now()->format('d/m/Y') }} 00:00.
						</p>

						<div class="form-group">
							<label for="project_selection">Student Selection Date</label>
							<br>
							<input class="form-control w-auto" type="date" name="project_selection" value="{{ SussexProjects\Mode::getProjectSelectionDate()->toDateString() }}">
						</div>
			
						<div class="form-group">
							<label for="supervisor_accept">Supervisor Accept Date</label>
							<br>
							<input class="form-control w-auto" type="date" name="supervisor_accept" value="{{ SussexProjects\Mode::getSupervisorAcceptDate()->toDateString() }}">
						</div>

						<div class="form-group">
							<label for="project_evaluation_date">Project Evaluation Date</label>
							<br>
							<input class="form-control w-auto" type="date" name="project_evaluation_date" value="{{ SussexProjects\Mode::getProjectEvaluationDate()->toDateString() }}">
						</div>
			
						<div class="form-group">
							<label for="project_year">Project Year</label>
							<br>
							<select class="form-control w-auto" id="project_year" name="project_year">
								@for ($i = (date("Y") - 2); $i < (date("Y") + 5); $i++)
									<option @if($i == SussexProjects\Mode::getProjectYear()) selected @endif>{{ $i }}</option>
								@endfor
							</select>
						</div>
					</div>

					<div class="tab-pane fade" id="thresholds" role="tabpanel" aria-labelledby="thresholds-tab">
						<h5>Thresholds</h5>

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

						<h5 class="mt-5">Percentage Difference</h5>
						<p class="text-muted">
							The difference in percentage which would require a joint report to be filled.
						</p>

						<div>
							<input class="form-control d-inline-block w-auto" type="number" min="0" max="100" name="project_evaluation_percentage_difference" value="{{ SussexProjects\Mode::getEvaluationPercentageDifference() }}">
							<span class="text-muted">%</span>
						</div>
					</div>

					<div class="tab-pane fade" id="questions" role="tabpanel" aria-labelledby="questions-tab">

					<h5 class="mt-3">Evaluation Questions</h5>
						<ul class="list-unstyled">
							<li class="text-muted">Group - The group the question belongs too</li>
							<li class="text-muted">Submission Type - Who has to submit the question</li>
							<li class="text-muted">Min comment length - The minimum length the comment for the question has to be</li>
						</ul>

						<ul class="list-unstyled" id="questions-list">
							@if(count($questions) > 0)
								@foreach($questions as $question)
									<li class="border-bottom mb-3 pb-3">
										<div class="row">
											<div class="col-12 d-flex mb-2 align-items-center">
												<b>Question {{ $loop->iteration }}</b>
												<button type="button" class="btn btn-sm btn-outline-danger ml-auto js-deleteQuestion">Remove</button>
											</div>

											<div class="col-1">
												<label>Group</label>
												<input class="form-control" type="text" name="group[]" value="{{ $question->group }}">
											</div>

											<div class="col-6">
												<label>Title</label>
												<input class="form-control" type="text" name="title[]" value="{{ $question->title }}">
											</div>

											<div class="col-3">
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

											<div class="col-2">
												<label>Submission Type</label>
												<select class="form-control" name="submissionType[]">
													<option @if($question->submissionType == 0) selected @endif value="0">Both</option>
													<option @if($question->submissionType == 1) selected @endif value="1">Supervisor Only</option>
													<option @if($question->submissionType == 2) selected @endif value="2">Optional</option>
												</select>
											</div>
										</div> 

										<div class="row mt-2">
											<div class="col-10">
												<label>Description</label>
												<input class="form-control" type="text" name="description[]" value="{{ $question->description }}">
											</div>
											<div class="col-2">
												<label>Min comment length</label>
												<input class="form-control" type="number" name="minCommentLength[]" value="{{ $question->minCommentLength }}">
											</div>
										</div>
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

	@if(count(SussexProjects\Mode::getOldProjectYears()) > 0)
		<div class="card mt-3">
			<div class="card-header">
				Old Project Years
			</div>

			<div class="card-body">
				<div class="form-group">
					@foreach(SussexProjects\Mode::getOldProjectYears() as $oldYear)
						{{ $oldYear->project_year }}
					@endforeach
				</div>
			</div>
		</div>
	@endif
</div>
@endsection
