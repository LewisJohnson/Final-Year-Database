@extends('layouts.app')
@section('content')

<div class="centered mw-1600">
	<div>
		@if($studentCount > 0)
			<button data-activator="true" data-dialog="supervisor-emails" class="btn btn-sm fr">
				<svg style="width:36px; height:36px" viewBox="0 0 24 24">
					<path fill="rgba(0, 0, 0, 0.5)" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"></path>
				</svg>
			</button>

			<div id="supervisor-emails-dialog" class="dialog p-3" data-dialog="supervisor-emails">
				<div class="header">
					<h2>Email Students</h2>
				</div>

				<div class="content mt-5">
					<div class="row">
						<div class="col-2"><p class="btn">Email:</p></div>
						<div class="col-10">
							<a class="btn text-primary text-left w-100" href="{{ SussexProjects\Student::getAllStudentsMailtoString() }}" title="Email all students">All Students</a>
							<a class="btn text-primary text-left w-100" href="{{ SussexProjects\Student::getAllStudentsNeverLoggedInMailtoString() }}" title="Email all that have never logged in">Students never logged-in</a>
							<a class="btn text-primary text-left w-100" href="{{ SussexProjects\Student::getAllStudentsAcceptedMailtoString() }}" title="Email all students accepted">Students accepted</a>
							<a class="btn text-primary text-left w-100" href="{{ SussexProjects\Student::getAllStudentsWithoutProjectMailtoString() }}" title="Email all students not accepted">Students not accepted</a>
						</div>
					</div>
				</div>
			</div>
		@endif

		<h1>Student Report</h1>

		@if($studentCount > 0)
			<h5>There are a total of <b>{{ $studentCount }}</b> {{ lang_sess('full_name') }} students.</h5>
		@endif
	</div>

	<div class="row mt-3">
		@if($studentCount > 0)
			@foreach(SussexProjects\Student::getAllStatuses() as $status)
				@php
					$user = new SussexProjects\User;
					$student = new SussexProjects\Student;

					$students = SussexProjects\Student::select($student->getTable().'.*')
						->join($user->getTable().' as user', 'user.id', '=', $student->getTable().'.id')
						->where('project_status', $status)
						->where('user.active_year', SussexProjects\Mode::getProjectYear())
						->orderBy('last_name', 'asc')
						->get();

					$currentStatusStudentCount = count($students);
				@endphp

				@if($currentStatusStudentCount)
					<div class="col-12 col-md-6 col-lg-3 mt-3">
						<div class="card">
							<div class="card-body px-0">
								<div class="d-flex px-3">
									<h5>{{ ucfirst($status) }} <span class="text-muted">({{ round(($currentStatusStudentCount / $studentCount) * 100, 2) }}%)</span></h5>
									<h5 class="ml-auto text-primary">{{ $currentStatusStudentCount }}</h5>
								</div>
								<table data-admin-email="{{ Auth::user()->email }}" class="table table-sm data-table sort-table email-table border-0 mt-3 {{ $status }}" data-status="{{ $status }}">
									<thead>
										<tr>
											<th>
												<div class="checkbox">
													<input class="checkbox-input master-checkbox" id="{{ $status }}" type="checkbox">
													<label for="{{ $status }}" name="{{ $status }}"></label>
												</div>
											</th>
											<th>Name</th>
											<th class="text-right">Reject Count</th>
											<th>Last Login</th>
										</tr>
									</thead>
									<tbody class="border-0">
										@foreach($students as $student)
											<tr class="student-edit-item">
												<td>
													<div class="checkbox">
														<input class="checkbox-input" id="student-{{ $student->user->id }}" data-email="{{ $student->user->email }}" type="checkbox">
														<label for="student-{{ $student->user->id }}" name="student-{{ $student->user->id }}"></label>
													</div>
												</td>
												<td><a @if($student->project != null) href="{{ action('ProjectController@show', $student->project) }}" @endif>{{ $student->user->first_name }} {{ $student->user->last_name }}</a></td>
												<td class="text-right">{{ $student->reject_count }}</td>
												@if($student->user->last_login)
													<td>{{ $student->user->last_login->diffForHumans() }}</td>
												@else
													<td>Never</td>
												@endif
											</tr>
										@endforeach
									</tbody>
								</table>

								<div class="mt-3 text-right px-3">
									<a class="btn btn-secondary email-selected {{ $status }}" href="mailto:">Email Selected</a>
								</div>
							</div>
						</div>
					</div>
					@else
						<div class="col-12 col-md-6 col-lg-3 mt-3">
							<div class="card">
								<div class="card-body">
									<h5>{{ ucfirst($status) }}</h5>
									<p>There are no students in the <b>{{ $status }}</b> category.</p>
								</div>
							</div>					
						</div>
					@endif
			@endforeach
		@else
			<div class="col-12">
				<p>There are no students to report.</p>
			</div>
		@endif
	</div>
</div>
@endsection
