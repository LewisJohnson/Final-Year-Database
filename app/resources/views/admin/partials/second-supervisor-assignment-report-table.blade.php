<h3>Automatic Assignment Report</h5>

<table class="table table-hover bg-white shadow-sm mt-3">
	<thead class="thead-light">
		<tr>
			<th>Supervisor</th>
			<th>Details / Student</th>
		</tr>
	</thead>
	<tbody>
		@foreach($supervisors as $supervisor)
			<tr>
				<td>{{ $supervisor->user->getFullName() }}</td>
				<td>Supervising {{ count($supervisor->getAcceptedStudents()) }} <br> Second Marking {{ count($supervisor->getSecondMarkingStudents()) }}</td>
			</tr>
			@foreach($supervisor->getSecondMarkingStudents() as $secondSupervising)
				<tr style="background: rgb(0, 0, 0, 0.02)">
					<td></td>
					<td>{{ $secondSupervising["student"]->user->getFullName() }}</td>
				</tr>
			@endforeach
		@endforeach
	</tbody>
</table>
