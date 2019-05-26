@php
	$acceptedStudents = Auth::user()->supervisor->getAcceptedStudents();
@endphp

<div class="table-responsive">
	<table class="table table-hover bg-white mt-3 mb-1 data-table sort-table supervisor-table accepted-students" id="supervisor-accepted-students-table" data-supervisor-email="{{ Auth::user()->email }}" data-status="accepted-students">
		@if($acceptedStudents)
			<thead class="thead-light">
				<tr>
					<th>
						<div class="checkbox">
							<input class="checkbox-input master-checkbox" id="accepted" type="checkbox">
							<label for="accepted" name="accepted"></label>
						</div>
					</th>
					<th>Student Name</th>
					<th>Second Marker</th>
					<th>Project Title</th>
					@if(SussexProjects\Mode::getProjectEvaluationDate()->lte(\Carbon\Carbon::now()))
						<th>Evaluation Status</th>
					@endif
					<th class="js-unsortable"></th>
				</tr>
			</thead>
			<tbody>
				@foreach($acceptedStudents as $accepted)
					<tr>
						<td>
							<div class="checkbox">
								<input class="checkbox-input" id="accepted-{{ $accepted['student']->user->getFullName() }}" type="checkbox" data-email="{{ $accepted['student']->user->email }}">
								<label for="accepted-{{ $accepted['student']->user->getFullName() }}" name="accepted-{{ $accepted['student']->user->getFullName() }}"></label>
							</div>
						</td>
						<td>
							<a href="mailto:{{ $accepted['student']->user->email }}">{{ $accepted['student']->user->getFullName() }}</a>
						</td>

						@if(isset($accepted['project']->marker))
							<td>
								<a href="mailto:{{ $accepted['project']->marker->user->email }}">{{ $accepted['project']->marker->user->getFullName() }}</a>
							</td>
						@else
							<td>-</td>
						@endif
						
						<td>
							<a href="{{ action('ProjectController@show', $accepted['project']) }}">{{ $accepted['project']->title }}</a>
						</td>

						@if(SussexProjects\Mode::getProjectEvaluationDate()->lte(\Carbon\Carbon::now()))
							<td>
								@if(!empty($accepted['project']->evaluation))
									<span class="{{ $accepted['project']->evaluation->getStatusBootstrapClass() }}">{{ $accepted['project']->evaluation->getStatus() }}</span>
								@else
									Not Started
								@endif
							</td>
						@endif
						<td class="text-right">
							@if(Session::get('logged_in_as') != null)
								<button class="btn btn-sm btn-outline-danger supervisor-undo-accept" 
									title="Un-accept {{ $accepted['student']->user->getFullName() }} for {{ $accepted['project']->title }}" 
									data-student-id="{{ $accepted['student']->id }}" data-student-name="{{ $accepted['student']->user->getFullName() }}" 
									data-project-title="{{ $accepted['project']->title }}">Undo</button>
							@endif

							@if(SussexProjects\Mode::getProjectEvaluationDate()->lte(\Carbon\Carbon::now()))
								<a class="btn btn-sm btn-outline-secondary" href="{{ action('ProjectEvaluationController@show', $accepted['project']->id) }}">Evaluation</a>
							@endif
						</td>
					</tr>
				@endforeach
			</tbody>
		@else
			<tfoot>
				<tr><td>You have not accepted any students yet.</td></tr>
			</tfoot>
		@endif
	</table>
</div>