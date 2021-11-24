<hr>
<h5>Imported Students</h5>
<div class="table-responsive mt-3">
	<table class="table table-hover bg-white data-table">
		<thead class="thead-light">
			<tr>
				<th>ID</th>
				<th>Candidate Number</th>
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
					<td class="text-truncate" style="max-width: 50px" title="{{ $user->id }}">{{ $user->id }}</td>

					@if($test)
						<td>{{ $students[$loop->index]->registration_number }}</td>
					@else
						<td>{{ $students[$loop->index]["registration_number"] }}</td>
					@endif

					<td>{{ $user->username }}</td>
					<td>{{ $user->first_name }}</td>
					<td>{{ $user->last_name }}</td>
					<td>{{ $user->email }}</td>
					@if(!empty($user->programme_relationship))
						<td>{{ $user->programme_relationship->name }}</td>
					@else
						<td>{{ $user->programme }}</td>
					@endif
				</tr>
			@endforeach
		</tbody>
	</table>
</div>

