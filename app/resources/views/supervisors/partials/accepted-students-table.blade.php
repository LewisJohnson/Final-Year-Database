<div class="table-responsive">
	<table class="table table-hover bg-white mt-3 mb-1 data-table sort-table supervisor-table accepted-students" id="supervisor-accepted-students-table" data-supervisor-email="{{ Auth::user()->email }}" data-status="accepted-students">
		@if(count($acceptedStudents) > 0)
			<thead class="thead-light">
				<tr>
					<th>
						<div class="checkbox">
							<input class="checkbox-input master-checkbox" id="accepted" type="checkbox">
							<label for="accepted" name="accepted"></label>
						</div>
					</th>
					<th>Student Name</th>
					<th class="js-unsortable">Candidate No.</th>
					<th>Second Marker</th>
					<th>Project Title</th>
					@if($showEvaluationButton)
						<th>Evaluation Status</th>
					@endif
					<th class="js-unsortable"></th>
				</tr>
			</thead>
			<tbody>
				@foreach($acceptedStudents as $accepted)
					@php
						$evaluation = $accepted['student']->getEvaluation()
					@endphp

					<tr>
						<td>
							<div class="checkbox">
								<input class="checkbox-input" id="accepted-{{ $accepted['student']->user->getFullName() }}" type="checkbox" data-email="{{ $accepted['student']->user->email }}">
								<label for="accepted-{{ $accepted['student']->user->getFullName() }}" name="accepted-{{ $accepted['student']->user->getFullName() }}"></label>
							</div>
						</td>

						<td style="line-height: 16px">
							{{ $accepted['student']->user->getFullName() }}<br>
							<small><a href="mailto:{{ $accepted['student']->user->email }}">{{ $accepted['student']->user->email }}</a></small>
						</td>

						<td style="line-height: 16px">
							{{ $accepted['student']->registration_number }}<br>
						</td>

						@if(isset($accepted['student']->marker))
							<td>
								<a href="mailto:{{ $accepted['student']->marker->user->email }}">{{ $accepted['prostudentject']->marker->user->getFullName() }}</a>
							</td>
						@else
							<td>-</td>
						@endif
						
						<td>
							<a href="{{ action('ProjectController@show', $accepted['project']) }}">{{ $accepted['project']->title }}</a>
						</td>

						@if($showEvaluationButton)
							<td>
								
								@if(!empty($evaluation))
									<span class="{{ $evaluation->getStatusBootstrapClass() }}">{{ $evaluation->getStatus() }}</span>
								@else
									Not Started
								@endif
							</td>
						@endif

						<td class="text-right">
							@if($showEvaluationButton)
								<a class="btn btn-sm btn-outline-secondary mb-1" style="width: 80px" href="{{ action('ProjectEvaluationController@show', $accepted['student']->id) }}">Evaluation</a>
							@endif

							@if(Session::get('logged_in_as') != null || Auth::user()->isProjectAdmin())
								<button class="btn btn-sm btn-outline-danger supervisor-undo-accept" style="width: 80px"
									title="Un-accept {{ $accepted['student']->user->getFullName() }} for {{ $accepted['project']->title }}" 
									data-student-id="{{ $accepted['student']->id }}" data-student-name="{{ $accepted['student']->user->getFullName() }}" 
									data-project-title="{{ $accepted['project']->title }}">Undo</button>
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
