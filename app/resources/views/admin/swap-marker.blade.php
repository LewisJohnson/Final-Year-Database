@extends('layouts.app')
@section('content')

<div class="centered mw-1200">

	<h2>Second Marker <small class="text-muted">/ Swap Second Markers</small></h2>
	<div class="alert alert-info mt-3">
		<span>&#128161;</span><span class="ml-2">Select two projects to swap their second markers</span>
	</div>

	<div class="row mt-3">
		<div class="col-12">
			<table class="table table-hover bg-white data-table shadow-sm" id="swap-marker-student-table">
				<thead>
					<tr>
						<th>Project Title</th>
						<th>Student</th>
						<th>Supervisor</th>
						<th>Marker</th>
					</tr>
				</thead>
				<tbody>
					@foreach($projects as $project)
						@php
							$student = $project->getAcceptedStudent();
						@endphp

						<tr class="cursor--pointer" 
							data-project-id="{{ $project->id }}" data-supervisor-id="{{ $project->supervisor_id }}"
							data-marker-id="{{ $project->marker->id }}" data-marker-name="{{ $project->marker->user->getFullName() }}"
							data-student-id="{{ $student->id }}" data-student-name="{{ $student->user->getFullName() }}">

							<td title="{{ $project->description }}">{{ $project->title }}</td>
							<td>{{ $student->user->getFullName() }}</td>
							<td>{{ $project->supervisor->user->getFullName() }}</td>
							<td>{{ $project->marker->user->getFullName() }}</td>
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
						<p id="projectA-name"></p>

						<h5 class="font-weight-bold">Student's Marker</h5>
						<p id="projectA-marker"></p>
					</div>
				</div>

				<div class="col-2">
					<h1>&#8596;</h1>
				</div>

				<div class="col-5">
					<div>
						<h5 class="font-weight-bold">Student</h3>
						<p id="projectB-name"></p>

						<h5 class="font-weight-bold">Student's Marker</h5>
						<p id="projectB-marker"></p>
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
