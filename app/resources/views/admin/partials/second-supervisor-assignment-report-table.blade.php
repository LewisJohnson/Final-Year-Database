<h3>Automatic Assignment Report</h3>

<table class="data-table shadow-2dp">
	<thead>
		<tr>
			<th>Supervisor</th>
			<th>Details / Student</th>
		</tr>
	</thead>
	<tbody>
		@foreach($supervisors as $supervisor)
			<tr>
				<td>{{ $supervisor->user->getFullName() }}</td>
				<td>Supervising {{ $supervisor->accepted_student_count }} / Second marker {{ count($supervisor->getSecondSupervisingStudents()) }}</td>
			</tr>
			@foreach($supervisor->getSecondSupervisingStudents() as $secondSupervising)
				<tr style="background: rgb(0, 0, 0, 0.02)">
					<td>-</td>
					<td>{{ $secondSupervising["student"]->user->getFullName() }}</td>
				</tr>
			@endforeach
		@endforeach
	</tbody>
</table>
