@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered width--1200">
	<h1>Import Students</h1>
	<div class="card card--margin-vertical">
		<h2>File Format</h2>

		<p style="margin: 0">You can export spreadsheets to CSV, all versions of Microsoft Excel and LibreOffice Calc support this feature.</p>
		<p style="margin: 0; margin-top: 3px;">The CSV file must be encoded in UTF-8.</p>

		<h4>Example Spreadsheet</h4>
		<div class="table-responsive">
			<table style="max-width: 800px">
				<thead>
					<tr>
						<th>Registration Number</th>
						<th>Last Name</th>
						<th>First Name</th>
						<th>Programme</th>
						<th>Username</th>
					</tr>
				</thead>
				<tbody>
						<tr>
							<td>21201297</td>
							<td>Smith</td>
							<td>Amadeus</td>
							<td>Computer Science</td>
							<td>as997</td>
						</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="card card--margin-vertical">
		<h2>Test Import Students</h2>
		<p>Uploading a file to this form will upload the data to a test table, then display the result.</p>
		<form class="import-student-form" data-type="test" action="{{ action('StudentController@importStudents', ['test' => true]) }}" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
			{{ csrf_field() }}
			<div class="form-field">
				<label>Select file to upload</label>
				<input type="file" accept=".csv" name="studentFile" class="file" required/>
				<button class="button" type='submit'>Upload Test</button>
			</div>
		</form>
		<div id="import-student-test-result"></div>
	</div>

	<div class="card card--margin-vertical">
		<h2>Import Students</h2>
		<p>Uploading a file to this form will upload the data to the {{ Session::get('department') }} {{ Session::get('education_level')["longName"] }} student table.</p>
		<form class="import-student-form" data-type="prod" action="{{ action('StudentController@importStudents') }}" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
			{{ csrf_field() }}
			<div class="form-field">
				<label>Select file to upload</label>
				<input type="file" accept=".csv" name="studentFile" class="file" required/>
				<button class="button" type='submit'>Upload</button>
			</div>
			<div id="import-student-result"></div>
		</form>
	</div>

</div>
@endsection
