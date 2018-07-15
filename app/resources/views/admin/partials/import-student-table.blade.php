<div class="section-container section-user-selector">
	<div class="section horizontal">
		<h4>User Table</h4>
		<div class="table-responsive">
			<table class="data-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Programme</th>
					</tr>
				</thead>
				<tbody>
					@foreach($users as $user)
						<tr>
							<td>{{ $user->id }}</td>
							<td>{{ $user->username }}</td>
							<td>{{ $user->first_name }}</td>
							<td>{{ $user->last_name }}</td>
							<td>{{ $user->email }}</td>
							<td>{{ $user->programme_relationship->name }}</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>

	<div class="section horizontal">
		<h4>Student Table</h4>
		<div class="table-responsive">
			<table class="data-table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Registration Number</th>
					</tr>
				</thead>
				<tbody>
					@foreach($students as $student)
						<tr>
							<td>{{ $student->id }}</td>
							<td>{{ $student->registration_number }}</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
	</div>
</div>



