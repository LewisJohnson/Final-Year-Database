@extends('layouts.app')
@section('content')

<div class="centered width--1600">
	<div>
		@if($studentCount > 0)
			<a style="float: right" class="button button--raised" href="{{ SussexProjects\Student::getAllStudentsWithoutProjectMailtoString() }}">Email students without project</a>
		@endif

		<h1>Student Report</h1>

		@if($studentCount > 0)
			<h3>There are a total of <b>{{ $studentCount }}</b> {{ lang_sess('full_name') }} students.</h3>
		@endif
	</div>

	<div class="section-container">
		@if($studentCount > 0)
			@foreach(SussexProjects\Student::getAllStatuses() as $status)
				@php
					$user = new SussexProjects\User;
					$student = new SussexProjects\Student;

					$students = SussexProjects\Student::select($student->getTable().'.*')
						->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
						->where('project_status', $status)
						->orderBy('last_name', 'asc')
						->get();
				@endphp

				@if(count($students))
					<div class="section horizontal">
							<div class="flex flex--row flex--no-wrap">
								<p style="margin-top: 0px; margin-bottom: 0px;"><b>{{ ucfirst($status) }}</b> <ins> {{ round((count($students) / $studentCount) * 100, 2) }}%</ins></p>
								<p style="margin-top: 0px; margin-bottom: 0px; margin-left: auto; color: darkgray;">Total: {{ count($students) }}</p>
							</div>
							<table data-admin-email="{{ Auth::user()->email }}" class="data-table sort-table email-table table--small {{ $status }}" data-status="{{ $status }}">
								<thead>
									<tr>
										<th>
											<div class="checkbox">
												<input class="checkbox-input master-checkbox" id="{{ $status }}" type="checkbox">
												<label for="{{ $status }}" name="{{ $status }}"></label>
											</div>
										</th>
										<th>Name</th>
										<th>Reject Count</th>
										<th>Last Login</th>
									</tr>
								</thead>
								<tbody>
									@foreach($students as $student)
										@include('partials.student-edit', array('student'=> $student))
									@endforeach
								</tbody>
							</table>
							<div class="button-group button-group--horizontal">
								<a class="button button--raised email-selected {{ $status }}" href="mailto:">Email Selected</a>
							</div>
						</div>
					@else
						<div class="section horizontal">
							<p style="margin-top: 0px; margin-bottom: 0px;"><b>{{ ucfirst($status) }}</b></p>
							<p>There are no students in the <b>{{ $status }}</b> category.</p>
						</div>
					@endif
			@endforeach
		@else
			<p>There are no students to report.</p>
		@endif
	</div>
</div>
@endsection
