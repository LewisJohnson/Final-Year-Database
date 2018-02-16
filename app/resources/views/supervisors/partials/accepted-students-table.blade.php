<table class="data-table" id="supervisor-accepted-students-table">
	@if (count(Auth::user()->supervisor->getAcceptedStudents()))
	<thead>
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
			<th></th>
		</tr>
	</thead>
	<tbody>
		@foreach(Auth::user()->supervisor->getAcceptedStudents() as $project)
			<tr>
				<td>
					<div class="checkbox">
						<input class="checkbox-input" id="accepted-{{ $project->student_name }}" type="checkbox">
						<label for="accepted-{{ $project->student_name }}" name="accepted-{{ $project->student_name }}"></label>
					</div>
				</td>
				<td><a href="mailto:{{ $project->student_email }}">{{ $project->student_name }}</a></td>
				@if($project->marker)
					<td>{{ $project->marker->user->getFullName() }}</td>
				@else
					<td>-</td>
				@endif
				<td><a href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>

				<td class="table-action">
					<a class="button button--svg button--danger-text supervisor-undo-accept" title="Un-accept {{ $project->student_name }} for {{ $project->title }}" data-student-id="{{ $project->student_id }}" data-student-name="{{ $project->student_name }}" data-project-title="{{ $project->title }}">
						@include('svg.undo')
					</a>
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
