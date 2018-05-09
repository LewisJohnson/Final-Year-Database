@extends('layouts.app')
@section('content')
<div class="centered width--1200">
	<h1>User Feedback</h1>
	<h3>Browse all of the user submitted feedback</h3>

	<table class="data-table table--dark-head sort-table">
		<thead>
			<tr>
				<th class="pointer">Page</th>
				<th class="pointer">Department</th>
				<th class="pointer">Education Level</th>
				<th class="pointer">Comment</th>
				<th class="pointer">Email</th>
			</tr>
		</thead>
		<tbody>
			@foreach($feedback as $piece)
				<tr>
					<td>{{ $piece->page }}</td>
					<td>{{ $piece->department }}</td>
					<td>{{ $piece->education_level }}</td>
					<td>{{ $piece->comment }}</td>
					<td><a class="blue-link" href="mailto:{{ $piece->email }}">{{ $piece->email }}</a></td>
				</tr>
			@endforeach
		</tbody>
	</table>
	

</div>
@endsection
