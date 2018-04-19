@extends('layouts.app')
@section('content')
<div class="centered width--1200">
	<h1>User Feedback</h1>
	<h3>Browse all of the user submitted feedback</h3>

	<table>
		<thead>
			<tr>
				<th>Page</th>
				<th>Department</th>
				<th>Education Level</th>
				<th>Comment</th>
				<th>Email</th>
			</tr>
		</thead>
		<tbody>
			@foreach($feedback as $piece)
				<tr>
					<td>{{ $piece->page }}</td>
					<td>{{ $piece->department }}</td>
					<td>{{ $piece->education_level }}</td>
					<td>{{ $piece->comment }}</td>
					<td>{{ $piece->email }}</td>
				</tr>
			@endforeach
		</tbody>
	</table>
	

</div>
@endsection
