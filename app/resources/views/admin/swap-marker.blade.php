@extends('layouts.app')
@section('pageTitle', 'Swap Markers')

@section('content')

<div class="centered mw-1200 bg-white shadow-sm rounded p-4">

	<h2 class="main-title">Second Marker <small class="text-muted">/ Swap Second Markers</small></h2>

	<div class="row">
		<div class="col-4">
			<div class="form-inline">
				<div class="form-group w-100">
					<label for="project_year">Project Year</label>

					<select class="form-control ml-auto js-projectYear" style="width: 100px">
						@foreach(SussexProjects\Mode::all() as $mode)
							<option @if(!empty(Request::get('project_year')) && (Request::get('project_year') == $mode->project_year)) selected @elseif(empty(Request::get('project_year'))) @if(SussexProjects\Mode::getProjectYear() == $mode->project_year) selected @endif @endif data-href="{{ action('ProjectAdminController@swapSecondMarkerView', ['project_year' => $mode->project_year]) }}">{{ $mode->project_year }}</option>
						@endforeach
					</select>
				</div>
			</div>
		</div>

		<div class="col-8">
			<div class="alert alert-info">
				<span>💡</span>
				<span class="ml-2">Select two projects to swap their second markers.</span><br>
			</div>
		</div>
	</div>
	<hr>
	
	<div class="row mt-3">
		<div class="col-12">
			<table class="table table-hover bg-white data-table shadow-sm" id="swap-marker-student-table">
				<thead>
					<tr>
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
						@endphp

						<tr class="cursor--pointer" 
							data-marker-id="{{ $student->getSecondMarker()->id }}" 
							data-marker-name="{{ $student->getSecondMarker()->getFullName() }}"
							data-student-id="{{ $student->id }}" data-student-name="{{ $student->user->getFullName() }}"
						>
							<td>{{ $student->user->getFullName() }}</td>
							<td>{{ empty($project) ? '-' : $project->title }}</td>
							<td>{{ empty($project) ? '-' : $project->supervisor->user->getFullName() }}</td>
							<td>{{ $student->getSecondMarker()->getFullName() }}</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>

	<div id="swap-dialog" class="dialog assign" data-dialog="swap">
		<div class="container">
			<div class="border-bottom">
				<h4 id="dialog-title" class="text-center p-3 m-0 font-weight-bold">Swap Markers</h4>
			</div>

			<div class="alert alert-warning mt-3">
				<span>&#128161;</span><span class="ml-2">Have you selected the correct second markers?</span>
			</div>

			<div class="row mt-4 mb-5">
				<div class="col-5">
					<div>
						<h5 class="font-weight-bold">Student</h5>
						<p id="studentA-name"></p>

						<h5 class="font-weight-bold">Second Marker</h5>
						<p id="studentA-marker"></p>
					</div>
				</div>

				<div class="col-2">
					<h1>&#8596;</h1>
				</div>

				<div class="col-5">
					<div>
						<h5 class="font-weight-bold">Student</h3>
						<p id="studentB-name"></p>

						<h5 class="font-weight-bold">Second Marker</h5>
						<p id="studentB-marker"></p>
					</div>
				</div>
			</div>

			<div class="footer">
				<button id="submitSwapMarker" type="button" class="btn btn-primary">Swap</button>
			</div>
		</div>
	</div>
</div>
@endsection
