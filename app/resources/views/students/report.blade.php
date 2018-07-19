@extends('layouts.app')
@section('content')

<div class="centered width--1600">
	<div id="report-header">
		<a style="float: right" class="button button--raised" href="{{ SussexProjects\Student::getAllStudentsWithoutProjectMailtoString() }}">Email students without project</a>

		<h1>Report by Student</h1>
		<h3>There are a total of <b>{{ $studentCount }}</b> {{ lang_sess('full_name') }} students.</h3>
	</div>

	<div class="section-container">
		@foreach(SussexProjects\Student::getAllStatuses() as $status)
			@php
				$students = SussexProjects\Student::Where('project_status', $status)->get();
				$sortedStudents = $students->sortBy(function ($student, $key) { return $student->user->last_name; });
			@endphp
			@if(count($sortedStudents) > 0)
				<div class="section horizontal">
						<div class="flex flex--row flex--no-wrap">
							<p style="margin-top: 0px; margin-bottom: 0px;"><b>{{ ucfirst($status) }}</b> <ins> {{ round((count($sortedStudents) / $studentCount) * 100, 2) }}%</ins></p>
							<p style="margin-top: 0px; margin-bottom: 0px; margin-left: auto; color: darkgray;">Total: {{ count($sortedStudents) }}</p>
						</div>
						<table class="data-table sort-table email-table table--small {{ $status }}" data-status="{{ $status }}">
							<thead>
								<tr>
									<th>
										<div class="checkbox">
											<input class="checkbox-input master-checkbox" id="{{ $status }}" type="checkbox">
											<label for="{{ $status }}" name="{{ $status }}"></label>
										</div>
									</th>
									<th>Name</th>
									<th>Last Login</th>
								</tr>
							</thead>
							<tbody>
								@foreach($sortedStudents as $student)
									@include('partials.student-edit', array('student'=> $student))
								@endforeach
							</tbody>
						</table>
						<div class="button-group button-group--horizontal">
							<a class="button button--raised email-selected {{ $status }}" href="mailto:">Email Selected</a>
						</div>
					</div>
				@else
					<script>$("#report-header").append('<div class=""><p>There are no students in the {{ $status }} category.</p></div>');</script>
				@endif
		@endforeach
	</div>
</div>
@endsection
