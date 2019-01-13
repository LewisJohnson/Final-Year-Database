@extends('layouts.app')
@section('content')
<div class="centered mw-1200">
	<h1>Swap Second Marker</h1>
	<h3>Select two students to swap their second marker.</h3>
	<div class="section-container">
		<table class="data-table shadow-2dp" id="swap-marker-student-table">
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
					<tr class="cursor--pointer" 

						@if($student->project != null) data-supervisor-id="{{ $student->project->supervisor->id }}" @endif
						@if($student->marker != null) data-marker-id="{{ $student->marker->id }}" data-marker-name="{{ $student->marker->user->getFullName() }}" @endif
						data-student-id="{{ $student->user->id }}" data-student-name="{{ $student->getName() }}">
						<td>{{ $student->getName() }}</td>

						@if($student->project == null)
							<td>-</td>
							<td>-</td>
						@else
							<td title="{{ $student->project->description }}">{{ $student->project->title }}</td>
							<td>{{ $student->project->supervisor->user->getFullName() }}</td>
						@endif
						<td>{{ $student->marker->user->getFullName() }}</td>
					</tr>
				@endforeach
			</tbody>
		</table>
	</div>

	<div id="swap-dialog" class="dialog assign marker-dialog" data-dialog="swap">
		<div class="header">
			<h2>ASSIGN</h2>
		</div>

		<div class="content" style="padding: 1rem;">
			<p class="config-tip" style="text-align: center;margin-bottom: 30px;margin-top: 0;">Are you sure you want to swap markers?</p>
			<div class="section-container">
				<div class="flex flex--wrap">
					<div>
						<h3>Student A</h3>
						<p id="studentA-name"></p>
						<h3>Student A's Marker</h3>
						<p id="studentA-marker"></p>
					</div>
				</div>

				<div class="arrow">
					<p>&#8596;</p>
				</div>

				<div class="flex flex--wrap right">
					<div>
						<h3>Student B</h3>
						<p id="studentB-name"></p>
						<h3>Student B's Marker</h3>
						<p id="studentB-marker"></p>
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
