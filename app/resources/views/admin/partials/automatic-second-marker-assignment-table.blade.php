<table class="data-table shadow-2dp" id="2nd-marker-supervisor-table">
	<thead>
		<tr>
			<th>Supervisor</th>
			<th>Project Load</th>
			<th>Actual Load</th>
			<th>Target 2<sup>nd</sup> Supervisor Load</th>
			<th>Lazy Score</th>
		</tr>
	</thead>
	<tbody>
		@foreach($supervisors as $supervisor)
			<tr>
				<td>{{ $supervisor->user->getFullName() }}</td>
				<td>{{ $supervisor->project_load }}</td>
				<td>{{ $supervisor->accepted_student_count }}</td>
				<td>{{ $supervisor->target_load }}</td>
				<td>{{ $supervisor->lazy_score }}</td>
			</tr>
		@endforeach
	</tbody>
</table>

<p>Slack: {{ $slack }}</p>

<form action="{{ action('AdminController@calculateSecondMarkers') }}" id="calculateSecondMarkers" method="POST" accept-charset="utf-8">
	{{ csrf_field() }}
	<button type="submit" class="button button--accent">Calculate</button>
</form>
