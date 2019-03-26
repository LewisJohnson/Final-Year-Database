@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@php
	$interestedStudents = Auth::user()->supervisor->getInterestedStudents();
	$studentProposals = Auth::user()->supervisor->getStudentProjectProposals();
	$acceptedStudents = Auth::user()->supervisor->getAcceptedStudents();
	$secondMarkerProjects = Auth::user()->supervisor->getSecondMarkingProjects();
@endphp

{{-- INTRESTED STUDENTS --}}
<div class="row mt-3">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<h3 class="card-title">Pending Decisions <span class="fr @if(count($interestedStudents + $studentProposals) > 0) bg-primary text-white @else text-primary @endif px-2 py-1 rounded">{{ count($interestedStudents + $studentProposals) }}</span></h3>
				<h6 class="card-subtitle mb-2 text-muted">Your {{ Session::get('education_level')["longName"] }} project load is currently {{ Auth::user()->supervisor->getProjectLoad() }}.</h6>
			
				@if(SussexProjects\Mode::getSupervisorAcceptDate()->gt(\Carbon\Carbon::now()))
					<div class="alert alert-info" role="alert">
						You may not accept student offers until {{ SussexProjects\Mode::getSupervisorAcceptDate(true) }}
					</div>
				@endif
				
				@if(count($interestedStudents) > 0 || count($studentProposals) > 0)
					{{-- INTERESTED STUDENTS --}}
					<h5 class="mt-3">Interested</h5>
					<div class="table-responsive">
						<table class="table table-hover bg-white table data-table sort-table supervisor-table interested-students mt-1" data-supervisor-email="{{ Auth::user()->email }}" data-status="interested-students">
							@if($interestedStudents)
								<thead class="thead-light">
									<tr>
										<th>
											<div class="checkbox">
												<input class="checkbox-input master-checkbox" id="selected-students" type="checkbox">
												<label for="selected-students" name="selected-students"></label>
											</div>
										</th>
										<th>Student</th>
										<th>Project</th>
										<th title="The amount of times the student has been rejected" class="cursor--pointer text-right">Rejected</th>
										<th class="js-unsortable"></th>
										<th class="js-unsortable"></th>
									</tr>
								</thead>
								<tbody>
									@foreach($interestedStudents as $interested)
										<tr data-student-id="{{ $interested['student']->id }}" data-project-id="{{ $interested['project']->id }}">
											<td class="w-5">
												<div class="checkbox">
													<input class="checkbox-input" id="offer-{{ $interested['student']->user->getFullName() }}" type="checkbox" data-email="{{ $interested['student']->user->email }}">
													<label for="offer-{{ $interested['student']->user->getFullName() }}" name="offer-{{ $interested['student']->user->getFullName() }}"></label>
												</div>
											</td>
	
											<td class="w-25">
												<a href="mailto:{{ $interested['student']->user->email }}">{{ $interested['student']->user->getFullName() }}</a>
											</td>
	
											<td class="w-50">
												<a href="{{ action('ProjectController@show', $interested['project']) }}">{{ $interested['project']->title }}</a>
											</td>
	
											<td class="w-10 text-right">{{ $interested['student']->reject_count }}</td>
	
											<td class="w-5 text-right">
												<button class="offer-action btn btn-sm btn-outline-danger" title="Reject {{ $interested['student']->user->getFullName() }} for {{ $interested['project']->title }}" data-action-type="reject">Reject</button>
											</td>
											
											<td class="w-5 text-right">
												<button class="offer-action btn btn-sm btn-success" title="Accept {{ $interested['student']->user->getFullName() }} for {{ $interested['project']->title }}" data-action-type="accept">Accept</button>
											</td>
										</tr>
									@endforeach
								</tbody>
							@else
								<tfoot>
									<tr><td>No students have selected one of your projects yet.</td></tr>
								</tfoot>
							@endif
						</table>
					</div>

					{{-- STUDENT PROPOSALS --}}
					<h5 class="mt-3">Proposals</h5>
					<div class="table-responsive">
						<table class="table table-hover bg-white table data-table sort-table supervisor-table interested-students mt-1" data-supervisor-email="{{ Auth::user()->email }}" data-status="interested-students">
							@if($studentProposals)
								<thead class="thead-light">
									<tr>
										<th>
											<div class="checkbox">
												<input class="checkbox-input master-checkbox" id="selected-students-2" type="checkbox">
												<label for="selected-students-2" name="selected-students-2"></label>
											</div>
										</th>
										<th>Student</th>
										<th>Project</th>
										<th title="The amount of times the student has been rejected" class="cursor--pointer text-right">Rejected</th>
										<th class="js-unsortable"></th>
										<th class="js-unsortable"></th>
									</tr>
								</thead>
								<tbody>
									@foreach($studentProposals as $proposal)
										<tr data-student-id="{{ $proposal['student']->id }}" data-project-id="{{ $proposal['project']->id }}">
											<td class="w-5">
												<div class="checkbox">
													<input class="checkbox-input" id="offer-{{ $proposal['student']->user->getFullName() }}" type="checkbox" data-email="{{ $proposal['student']->user->email }}">
													<label for="offer-{{ $proposal['student']->user->getFullName() }}" name="offer-{{ $proposal['student']->user->getFullName() }}"></label>
												</div>
											</td>
	
											<td class="w-25">
												<a href="mailto:{{ $proposal['student']->user->email }}">{{ $proposal['student']->user->getFullName() }}</a>
											</td>
	
											<td class="w-50">
												<a href="{{ action('ProjectController@show', $proposal['project']) }}">{{ $proposal['project']->title }}</a>
											</td>
	
											<td class="w-10 text-right">{{ $proposal['student']->reject_count }}</td>

											<td class="w-5 text-right">
												<button class="offer-action btn btn-sm btn-outline-danger" title="Reject {{ $proposal['student']->user->getFullName() }} for {{ $proposal['project']->title }}" data-action-type="reject">Reject</button>
											</td>
											
											<td class="w-5 text-right">
												<button class="offer-action btn btn-sm btn-success" title="Accept {{ $proposal['student']->user->getFullName() }} for {{ $proposal['project']->title }}" data-action-type="accept">Accept</button>
											</td>
										</tr>
									@endforeach
								</tbody>
							@else
								<tfoot>
									<tr><td>You have no student project proposals yet.</td></tr>
								</tfoot>
							@endif
						</table>
					</div>

					<div class="text-right mt-3">
						<a class="btn btn-light email-selected interested-students" href="#">Email Selected</a>
					</div>
				@else
					<hr>
					<p>You have no pending decisions.</p>
				@endif
			</div>
		</div>
	</div>
</div>

{{-- ACCEPTED STUDENTS --}}
<div class="row mt-3">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<h3 class="card-title">Accepted Students <span class="fr text-primary px-2 py-1">{{ count($acceptedStudents) }}</span></h3>
				<h6 class="card-subtitle mb-2 text-muted">Every student you've accepted for {{ SussexProjects\Mode::getProjectYear() }}.</h6>

				@include('supervisors.partials.accepted-students-table')
				
				<div class="text-right mt-3">
					<a class="btn btn-light email-selected accepted-students" href="#">Email Selected</a>
				</div>
			</div>
		</div>
	</div>
</div>

{{-- SECOND MARKING PROJECTS --}}
<div class="row mt-3">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<h3 class="card-title">Second Marker Projects <span class="fr text-primary px-2 py-1">{{ count($secondMarkerProjects) }}</span></h3>
				<h6 class="card-subtitle mb-2 text-muted">Projects you're second marker to in {{ SussexProjects\Mode::getProjectYear() }}.</h6>

				<table class="table table-hover bg-white table data-table mt-1">
					@if($secondMarkerProjects)
						<thead class="thead-light">
							<tr>
								<th>Student</th>
								<th>Project</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							@foreach($secondMarkerProjects as $markerProjects)
								<tr>
									<td class="w-25">
										<a href="mailto:{{ $markerProjects['student']->user->email }}">{{ $markerProjects['student']->user->getFullName() }}</a>
									</td>

									<td class="w-50">
										<a href="{{ action('ProjectController@show', $markerProjects['project']) }}">{{ $markerProjects['project']->title }}</a>
									</td>

									<td class="w-5 text-right">
										<a class="btn btn-sm btn-outline-secondary" href="{{ action('ProjectEvaluationController@show', $markerProjects['project']->id) }}">Evaluation</a>
									</td>
								</tr>
							@endforeach
						</tbody>
					@else
						<tfoot>
							<tr><td>You are not second marker to any projects yet.</td></tr>
						</tfoot>
					@endif
				</table>
			</div>
		</div>
	</div>
</div>