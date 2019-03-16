@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section ('content')
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
						<div class="form-field">
							<label for="project_selection">Student Selection Date</label>
							<br>
							<input type="date" name="project_selection" value="{{ SussexProjects\Mode::getProjectSelectionDate()->toDateString() }}">
						</div>
			
						<div class="form-field">
							<label for="supervisor_accept">Supervisor Accept Date</label>
							<br>
							<input type="date" name="supervisor_accept" value="{{ SussexProjects\Mode::getSupervisorAcceptDate()->toDateString() }}">
						</div>
			
						<div class="form-field">
							<label for="project_year">Project Year</label>
							<br>
							<select id="project_year" name="project_year">
								@for ($i = (date("Y") - 5); $i < (date("Y") + 5); $i++)
									<option @if($i == SussexProjects\Mode::getProjectYear()) selected @endif>{{ $i }}</option>
								@endfor
							</select>
						</div>
					</div>
					<div class="col-12 col-md-6 border-left">
						<h5>Thresholds</h5>

						<ul class="list-group" id="thresholds-list">
							@php
								$thresholds = SussexProjects\Mode::getThresholds();
							@endphp
							@if(count($thresholds) > 0)
								@foreach(SussexProjects\Mode::getThresholds() as $threshold)
									<li class="list-group-item">
										<div class="d-flex">
											<span>{{ $threshold }}%</span>
											<button type="button" class="btn btn-sm btn-danger ml-auto js-deleteThreshold">Remove</button>
											<input type="hidden" name="thresholds[]" value="{{ $threshold }}">
										</div>
									</li>
								@endforeach
							@endif
						</ul>

						<div class="mt-3">
							<input id="new-threshold-value" class="w-50" name="topic_name" placeholder="Threshold value" type="number" min="0" max="100">
							<button id="new-threshold-button" class="btn btn-primary ml-2" type="button">Add</button>
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
