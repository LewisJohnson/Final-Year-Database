@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1200">
<div class="row">	

	<div class="col-12">
		<h1>Import Students</h1>

		<div class="card mt-3">
			<div class="card-body">
				<h3 class="card-title">File Format</h3>
			
				<span>You can export spreadsheets to CSV, all versions of Microsoft Excel and LibreOffice Calc support this feature.</span>
				<br>
				<span>The CSV file must be encoded in UTF-8.</span>
		
				<h5 class="mt-3">Example Spreadsheet</h5>
				<table class="table w-60">
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
	</div>

	<div class="col-12 mt-3">
		<div class="card w-100">
			<div class="card-body">
				<h3 class="card-title">Test Import Students</h3>
				<p>Uploading a file to this form will upload the data to a test table, then display the result.</p>
				<form class="import-student-form" data-type="test" action="{{ action('StudentController@importStudents', ['test' => true]) }}" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
					{{ csrf_field() }}
					<div class="form-field">
						<label>Select file to upload</label>
						<input type="file" accept=".csv" name="studentFile" class="file" required/>
					</div>

					<div class="text-right mt-3">
						<button class="btn btn-primary" type='submit'>Upload Test</button>
					</div>
				</form>
				<div id="import-student-test-result"></div>
			</div>
		</div>
	</div>

	<div class="col-12 mt-3">
		<div class="card">
			<div class="card-body">
				<h3 class="card-title">Real Import Students</h3>
				<p>Uploading a file to this form will upload the data to the {{ Session::get('department') }} {{ Session::get('education_level')["longName"] }} student table.</p>
				<form class="import-student-form" data-type="prod" action="{{ action('StudentController@importStudents') }}" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
					{{ csrf_field() }}

					<div class="form-field mb-2">
						<div class="checkbox">
							<input type="checkbox" name="auto_programmes" value="auto_programmes" id="auto_programmes">
							<label class="ml-1" for="auto_programmes">Auto import programmes</label>
							<p class="text-muted ml-4">This will import all of the programmes from the CSV to the database so you don't have to do it manually.<br>
								This will not affect any current data.</p>
						</div>
					</div>

					<div class="form-field mb-2">
						<div class="checkbox">
							<input type="checkbox" name="empty_students" value="empty_students" id="empty_students" onchange="$('#import-students-submit').addClass('btn-danger')">
							<label class="ml-1" for="empty_students">Empty students table</label>
						</div>
						<p class="text-danger ml-4">
							This will option will <b>empty</b> the <span class="text-uppercase">{{ Session::get('education_level')["shortName"] }}</span> students table and delete the entries from the user table.<br>
						</p>
					</div>

					<div class="form-field mb-2">
						<div class="checkbox">
							<input type="checkbox" name="empty_programmes" value="empty_programmes" id="empty_programmes" onchange="$('#import-students-submit').addClass('btn-danger')">
							<label class="ml-1" for="empty_programmes">Empty programmes table</label>
							<p class="text-danger ml-4">
								This will option will <b>empty</b> the <span class="text-uppercase">{{ Session::get('department') }}</span> programmes table, which is shared between all education levels.<br>
								You probably do not want to do this.
							</p>
						</div>
					</div>

					<div class="form-field">
						<label>Select file to upload</label>
						<input type="file" accept=".csv" name="studentFile" class="file" required/>
					</div>

					<div class="text-right mt-3">
						<button id="import-students-submit" class="btn btn-primary" type='submit'>Import</button>
					</div>
					<div id="import-student-result"></div>
				</form>
			</div>
		</div>
	</div>
</div>
@endsection
