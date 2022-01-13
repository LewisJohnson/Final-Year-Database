<table class="table table-hover bg-white shadow-sm sort-table" id="2nd-marker-supervisor-table">
	<thead class="thead-light">
		<tr>
			<th data-default="true" class="cursor--pointer">Supervisor</th>
			<th data-default="true" class="cursor--pointer">Project Load</th>
			<th data-default="true" class="cursor--pointer">Actual Load</th>
			<th data-default="true" class="cursor--pointer">2<sup>nd</sup> Marker Count</th>
			<th data-default="true" class="cursor--pointer">Target 2<sup>nd</sup> Marker Load</th>
			<th data-default="true" class="cursor--pointer">Lazy Score</th>
		</tr>
	</thead>
	<tbody>
		@foreach($supervisors as $supervisor)
			<tr>
				<td>{{ $supervisor->user->getFullName() }}</td>
				<td>{{ $supervisor->project_load }}</td>
				<td>{{ $supervisor->second_supervising_count }}</td>
				<td>{{ $supervisor->accepted_student_count }}</td>
				<td>{{ $supervisor->target_load }}</td>
				<td>{{ $supervisor->lazy_score }}</td>
			</tr>
		@endforeach
	</tbody>
</table>