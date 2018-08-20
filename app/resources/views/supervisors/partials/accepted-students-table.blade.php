<table class="data-table sort-table table--dark-head" id="supervisor-accepted-students-table">
	@if(Auth::user()->supervisor->getAcceptedStudents())
		<thead>
			<tr>
{{-- 				<th>
					<div class="checkbox">
						<input class="checkbox-input master-checkbox" id="accepted" type="checkbox">
						<label for="accepted" name="accepted"></label>
					</div>
				</th> --}}
				<th class="pointer">Student Name</th>
				<th class="pointer">Second Marker</th>
				<th class="pointer">Project Title</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			@foreach(Auth::user()->supervisor->getAcceptedStudents() as $accepted)
				<tr>
{{-- 					<td>
						<div class="checkbox">
							<input class="checkbox-input" id="accepted-{{ $accepted['student']->user->getFullName() }}" type="checkbox">
							<label for="accepted-{{ $accepted['student']->user->getFullName() }}" name="accepted-{{ $accepted['student']->user->getFullName() }}"></label>
						</div>
					</td> --}}
					<td><a href="mailto:{{ $accepted['student']->user->email }}">{{ $accepted['student']->user->getFullName() }}</a></td>
					@if($accepted['student']->marker)
						<td>{{ $accepted['student']->marker->user->getFullName() }}</td>
					@else
						<td>-</td>
					@endif
					<td><a href="{{ action('ProjectController@show', $accepted['project']) }}">{{ $accepted['project']->title }}</a></td>

					<td>
						<button class="button button--danger-text supervisor-undo-accept" title="Un-accept {{ $accepted['student']->user->getFullName() }} for {{ $accepted['project']->title }}" data-student-id="{{ $accepted['student']->id }}" data-student-name="{{ $accepted['student']->user->getFullName() }}" data-project-title="{{ $accepted['project']->title }}">Undo</button>
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
