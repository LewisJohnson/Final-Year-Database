<h3>Automatic Assignment Report</h3>

<table class="data-table shadow-2dp">
	<thead>
		<tr>
			<th>Supervisor</th>
			<th>Student</th>
		</tr>
	</thead>
	<tbody>
		@foreach($supervisors as $supervisor)
			<tr>
				<td>{{ $supervisor->user->getFullName() }}</td>
				<td>Supervising {{ $supervisor->accepted_student_count }} students and second marker to {{ count($supervisor->getSupervisingStudents()) }} students</td>
			</tr>
			@foreach($supervisor->getSupervisingStudents() as $student)
				<tr>
					<td>-</td>
					<td>{{ $student->student_name }}</td>
				</tr>
			@endforeach
		@endforeach
	</tbody>
</table>
