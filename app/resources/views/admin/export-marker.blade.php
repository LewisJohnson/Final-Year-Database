@extends('layouts.app')
@section('content')
<div class="centered width--1200">
	<h1>Export Second Marker Data</h1>

	<p>The second marker export includes the student's name followed by their project, supervisor and second marker.</p>

	<h4>Example Export</h4>
	<div class="table-responsive" style="margin-bottom: 1rem">
		<table style="max-width: 800px">
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
	<div class="button-group button-group--horizontal">
		<form title="Download second marker data as CSV" action="{{ action('ProjectAdminController@exportSecondMarkerData') }}" method="GET" accept-charset="utf-8">
			{{ csrf_field() }}
			<input type="hidden" name="type" value="csv">
			<div class="form-field">
				<button class="button button--raised">Download CSV</button>
			</div>
		</form>

		<form title="Download second marker data as JSON" action="{{ action('ProjectAdminController@exportSecondMarkerData') }}" method="GET" accept-charset="utf-8">
			{{ csrf_field() }}
			<input type="hidden" name="type" value="json">
			<div class="form-field">
				<button class="button button--raised">Download JSON</button>
			</div>
		</form>
	</div>
</div>
@endsection
