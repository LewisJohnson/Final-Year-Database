@extends('layouts.app')
@section('content')
<div class="centered mw-1600 js-show-scroll-top">

	<h2>Project Evaluations <small class="text-muted">/ Amend Canvas URLs</small></h2>
	<div class="alert alert-info mt-3">
		<span>&#128161;</span><span class="ml-2">Only students with project evaluations will be shown</span>
	</div>

	<form action="{{ action('ProjectEvaluationController@amendCanvasUrls') }}" method="POST" accept-charset="utf-8">
		{{ csrf_field() }}

		<div class="table-responsive">
			<table class="table bg-white data-table sort-table shadow-sm mt-3">
				<thead>
					<tr>
						<th>Student</th>
						<th>Project Title</th>
						<th>Supervisor</th>
						<th>2<sup>nd</sup> Marker</th>
						<th class="border-left">Canvas URL</th>
						<th class="border-left"></th>
					</tr>
				</thead>
				<tbody>
					@foreach($students as $student)
						@if(!empty($student->project) && !empty($student->project->evaluation))
							@php
								$project = $student->project;
								$evaluation = $project->evaluation;

								$canvasUrl = $evaluation->canvas_url;

							@endphp

							<tr>
								<td>{{ $student->user->getFullName() }}</td>
								<td><a href="{{ action('ProjectController@show', $student->project) }}">{{ $student->project->title }}</a></td>
		
								<td><a href="mailto:{{ $project->supervisor->user->email }}">{{ $project->supervisor->user->getFullName() }}</a></td>
		
								<td><a href="mailto:{{ $project->marker->user->email }}">{{ $project->marker->user->getFullName() }}</a></td>

								<td class="border-left">
									<input class="form-control" type="url" name="{{ $student->project->evaluation->id }}_canvas_url" value="{{ $canvasUrl }}">
								</td>

								<td class="border-left text-right">
									<a class="btn btn-sm btn-outline-primary" href="{{ action('ProjectEvaluationController@show', $project->id) }}">Evaluation</a>
								</td>
							</tr>
						@endif
					@endforeach
				</tbody>
			</table>

			<div class="text-right mt-3">
				<input type="submit" value="Submit" class="btn btn-primary">
			</div>
		</div>
	</form>
</div>

<style type="text/css">
	.table-responsive .table th, .table-responsive .table td {
		vertical-align: middle;
	}
</style>
@endsection