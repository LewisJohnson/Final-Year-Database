@php
	$acceptedStudents = Auth::user()->supervisor->getAcceptedStudents();
@endphp

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
				<th class="cursor--pointer">Student Name</th>
				<th class="cursor--pointer">Second Marker</th>
				<th class="cursor--pointer">Project Title</th>
				<th></th>
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
					<td><a href="mailto:{{ $accepted['student']->user->email }}">{{ $accepted['student']->user->getFullName() }}</a></td>
					@if(isset($accepted['project']->marker))
						<td>{{ $accepted['project']->marker->user->getFullName() }}</td>
					@else
						<td>-</td>
					@endif
					<td>
						<a href="{{ action('ProjectController@show', $accepted['project']) }}">{{ $accepted['project']->title }}</a>
					</td>

					<td class="text-right">
						@if(Session::get('logged_in_as') != null)
							<button class="btn btn-sm btn-outline-danger supervisor-undo-accept" 
								title="Un-accept {{ $accepted['student']->user->getFullName() }} for {{ $accepted['project']->title }}" 
								data-student-id="{{ $accepted['student']->id }}" data-student-name="{{ $accepted['student']->user->getFullName() }}" 
								data-project-title="{{ $accepted['project']->title }}">Undo</button>
						@endif

						<a class="btn btn-sm btn-outline-secondary" href="{{ action('ProjectEvaluationController@show', $accepted['project']->id) }}">Evaluation</a>
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
