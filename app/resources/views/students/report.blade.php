@extends('layouts.app')
@section('content')

<div class="centered width-1600">

	<div id="report-header">
		<h1>Report by Student</h1>

		@if(Session::get('db_type') == 'ug')
			<h3>There are a total of <b>{{ count(SussexProjects\StudentUg::get()) }}</b> undergraduate students.</h3>
		@elseif(Session::get('db_type') == 'masters')
			<h3>There are a total of <b>{{ count(SussexProjects\StudentMasters::get()) }}</b> masters students.</h3>
		@endif
	</div>

	<div class="section-container">
	@foreach(SussexProjects\Project::getAllStatuses() as $status)
		@php
			if(Session::get("db_type") == "ug"){
				$students = SussexProjects\StudentUg::Where('project_status', $status)->get();
			} elseif(Session::get("db_type") == "masters"){
				$students = SussexProjects\StudentMasters::Where('project_status', $status)->get();
			}
			$sortedStudents = $students->sortBy(function ($student, $key) { return $student->user->last_name; });
		@endphp
		@if(count($sortedStudents) > 0)
			<div class="section horizontal" data-status= "{{ $status }}">
					<h3>{{ ucfirst($status) }}</h3>
					<table class="data-table {{ $status }}  full-detail shadow-2dp" id="student-edit-list">
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
						<button class="button button--raised email-selected {{ $status }}" type="">Email Selected</button>
					</div>
				</div>
			@else
				<script>$("#report-header").append("There are no students in the {{ $status }} category.");</script>
			@endif
	@endforeach
	</div>
</div>
@endsection
