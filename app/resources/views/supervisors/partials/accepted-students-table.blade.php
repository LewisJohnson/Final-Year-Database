@php($user = Auth::user())
<table class="data-table" id="supervisor-accepted-students-table">
	@if (count($user->supervisor->getAcceptedStudents()))
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
			<th>Project</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		@foreach($user->supervisor->getAcceptedStudents() as $project)
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
				<td><a class="project-link" href="{{ action('ProjectController@show', $project) }}">{{ $project->title }}</a></td>
				<td><button class="button button--raised undo" data-student_id="{{ $project->student_id }}" data-project_id="{{ $project->id }}">Undo</button></td>
			</tr>
		@endforeach
	</tbody>
	@else
	<tfoot>
		<tr><td>You have not accepted any students yet.</td></tr>
	</tfoot>
	@endif
</table>