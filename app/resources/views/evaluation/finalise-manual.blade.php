@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1200">

	<h1>Finalise Project Evaluations</h1>
	<h5>Only students with accepted projects and un-finalised evaluations will be shown</h5>

	<form id="manual-finalise-form" action="{{ action('ProjectEvaluationController@manualFinalise') }}" method="POST" accept-charset="utf-8">
		{{ csrf_field() }}
		<div class="table-responsive">
			<table class="table bg-white data-table sort-table shadow-sm mt-3">
				<thead>
					<tr>
						<th>
							<div class="checkbox">
								<input class="checkbox-input master-checkbox" id="evaluation" type="checkbox">
								<label for="evaluation" name="evaluation"></label>
							</div>
						</th>
						<th>Student</th>
						<th>Project Title</th>
						<th>Supervisor</th>
						<th>Marker</th>
					</tr>
				</thead>
				<tbody>
					@foreach($students as $student)
						@php
							$project = $student->project;
							$supervisorUser = $project->supervisor->user;
							$markerUser = $project->marker->user;
						@endphp
						<tr>
							<td>
								<div class="checkbox">
									<input class="checkbox-input js-evaluation-checkbox" id="{{ $project->evaluation->id }}_finalise" name="{{ $project->evaluation->id }}_finalise" type="checkbox" data-project-title="{{ $project->title }}">
									<label for="{{ $project->evaluation->id }}_finalise"></label>
								</div>
							</td>
							<td>{{ $student->user->getFullName() }}</td>
							<td><a href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>

							<td><a href="mailto:{{ $supervisorUser->email }}">{{ $supervisorUser->getFullName() }}</a></td>
							<td><a href="mailto:{{ $markerUser->email }}">{{ $markerUser->getFullName() }}</a></td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</form>
	<div class="text-right mt-3">
		<button class="ml-auto btn btn-primary disabled" disabled title="Please select 1 or more checkboxes" id="manual-finalise">Finalise Selected</button>
	</div>
</div>
@endsection
