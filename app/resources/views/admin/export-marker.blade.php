@extends('layouts.app')
@section('content')
<div class="centered mw-1200">

	<h2>Second Marker <small class="text-muted">/ Export Second Marker Data</small></h2>
	<div class="alert alert-info mt-3">
		<span>&#128161;</span><span class="ml-2">The second marker export includes the student's name followed by their project, supervisor and second marker.</span>
	</div>

	<h4 class="mt-5">Example Export</h4>
	<div class="table-responsive">
		<table class="table table-hover bg-white mw-800">
			<thead>
				<tr>
					<th>Student Name</th>
					<th>Project Title</th>
					<th>Supervisor</th>
					<th>Second Marker</th>
				</tr>
			</thead>
			<tbody>
					<tr>
						<td>John Smith</td>
						<td>Machine Learning</td>
						<td>Prof Jonathan Smith</td>
						<td>Prof Wesley Dale</td>
					</tr>
					<tr>
						<td>Timothy Atkins</td>
						<td>Haskell Compiler</td>
						<td>Dr Rex Akguinda</td>
						<td>Prof Jonathan Smith</td>
					</tr>
					<tr>
						<td>Charles Van Der Pol</td>
						<td>Spatial Audio Engine</td>
						<td>Dr Harry Yolks</td>
						<td>Prof Wesley Dale</td>
					</tr>
			</tbody>
		</table>
	</div>

	<hr>
	<div class="d-flex">
		<form title="Download second marker data as CSV" action="{{ action('ProjectAdminController@exportSecondMarkerData') }}" method="GET" accept-charset="utf-8">
			{{ csrf_field() }}
			<button class="btn btn-primary">Download CSV</button>
		</form>
	</div>
</div>
@endsection
