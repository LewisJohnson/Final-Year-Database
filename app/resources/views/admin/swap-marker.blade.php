@extends('layouts.app')
@section('content')
<div class="centered mw-1200">
	<h1>Swap Second Marker</h1>
	<h5>Select two projects to swap their second marker.</h5>

	<div class="mt-3">
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

	<div id="swap-dialog" class="dialog assign" data-dialog="swap">
		<div class="header">
			<h2>ASSIGN</h2>
		</div>

		<div class="content" style="padding: 1rem;">
			<p class="config-tip text-center" style="margin-bottom: 30px;margin-top: 0;">Are you sure you want to swap markers?</p>
			<div class="section-container">
				<div class="flex flex--wrap">
					<div>
						<h3>Student</h3>
						<p id="projectA-name"></p>
						<h3>Student's Marker</h3>
						<p id="projectA-marker"></p>
					</div>
				</div>

				<div class="arrow">
					<p>&#8596;</p>
				</div>

				<div class="flex flex--wrap right">
					<div>
						<h3>Student</h3>
						<p id="projectB-name"></p>
						<h3>Student's Marker</h3>
						<p id="projectB-marker"></p>
					</div>
				</div>
			</div>

			<div class="footer footer--dark">
				<button id="submitSwapMarker" type="button" class="button button--raised button--accent">SWAP MARKERS</button>
			</div>
		</div>
	</div>
</div>
@endsection
