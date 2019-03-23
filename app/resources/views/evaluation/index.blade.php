@extends('layouts.app')
@section('content')

@section('scripts')
@endsection

@section('content')

<div class="centered mw-1400 js-show-scroll-top">

	<h1>Project Evaluations</h1>

	<table class="table bg-white data-table sort-table shadow-sm mt-3">
		<thead>
			<tr>
				<th>Student</th>
				<th>Project Title</th>
				<th class="border-left">Supervisor<br><span class="text-muted">Name</span></th>
				<th class="text-muted">Mark</th>
				<th class="border-left">2<sup>nd</sup> Marker<br><span class="text-muted">Name</span></th>
				<th class="text-muted">Mark</th>
				<th class="border-left">Final Mark</th>
				<th class="border-left"></th>
			</tr>
		</thead>
		<tbody>
			@foreach($students as $student)
				@if(!empty($student->project) && !empty($student->project->evaluation))
					@php
						$dissertation = $student->project->evaluation->getQuestions()[SussexProjects\ProjectEvaluation::DissertationMarkIndex];
					@endphp
					<tr>
						<td>{{ $student->getName() }}</td>
						<td>{{ $student->project->title }}</td>
						<td class="border-left">{{ $student->project->supervisor->user->getFullName() }}</td>
						<td>{{ $dissertation->SupervisorValue }}</td>
						<td class="border-left">{{ $student->project->marker->user->getFullName() }}</td>
						<td>{{ $dissertation->MarkerValue }}</td>
						<td class="border-left">{{ $dissertation->FinalValue }}</td>
						<td class="border-left text-right">
							<a class="btn btn-sm btn-outline-primary" href="{{ action('ProjectEvaluationController@show', $student->project->id) }}">Evaluation</a>
						</td>
					</tr>
				@elseif(!empty($student->project) && !empty($student->project->marker))
					<tr style="opacity: 0.6">
						<td>{{ $student->getName() }}</td>
						<td>{{ $student->project->title }}</td>
						<td class="border-left">{{ $student->project->supervisor->user->getFullName() }}</td>
						<td>-</td>
						<td class="border-left">{{ $student->project->marker->user->getFullName() }}</td>
						<td>-</td>
						<td class="border-left">-</td>
						<td class="border-left text-right">
							<a class="btn btn-sm btn-outline-secondary" href="{{ action('ProjectEvaluationController@show', $student->project->id) }}">Create Evaluation</a>
						</td>
					</tr>
				@else
					<tr style="opacity: 0.3">
						<td>{{ $student->getName() }}</td>
						<td>No Project</td>
						<td class="border-left">-</td>
						<td>-</td>
						<td class="border-left">-</td>
						<td>-</td>
						<td class="border-left">-</td>
						<td class="border-left text-right"></td>
					</tr>
				@endif
			@endforeach
		</tbody>
	</table>
</div>
@endsection
