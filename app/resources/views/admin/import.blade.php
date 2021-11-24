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
				
					<span>You can easily export spreadsheets to CSV, all versions of Microsoft Excel and LibreOffice Calc support this feature.</span>
					<br>
					<span>The CSV file must be encoded in UTF-8.</span>
			
					<h5 class="mt-3">Example Spreadsheet</h5>
					<table class="table w-60">
						<thead class="thead-light">
							<tr>
								<th>Candidate Number</th>
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
							<tr>
								<td>21291433</td>
								<td>Stone</td>
								<td>Hannah</td>
								<td>GAME</td>
								<td>hs145</td>
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
					<p>
						Uploading a file to this form will upload the data to a test table, then display the result.<br>
						This will not affect any real data.
					</p>
					<form class="import-student-form" data-type="test" action="{{ action('StudentController@importStudents', ['test' => true]) }}" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
						{{ csrf_field() }}
						<div class="form-field">
							<label class="d-block m-0">Select test file</label>
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
					<p>Uploading a file to this form will upload the data to the {{ Session::get('department') }} {{ get_el_long_name() }} student table.</p>
					<form class="import-student-form" data-type="prod" action="{{ action('StudentController@importStudents') }}" method="POST" accept-charset="utf-8" enctype="multipart/form-data">
						{{ csrf_field() }}

						<div class="row">
							<div class="col-6">
									<div class="form-field mb-2">
										<div class="checkbox">
											<input type="checkbox" name="auto_programmes" value="auto_programmes" id="auto_programmes">
											<label class="ml-1" for="auto_programmes">Auto import programmes</label>
											<p class="text-muted ml-4">
												This will import all of the programmes from the CSV to the database so you don't have to do it manually.
												This will not affect any current programme data.
											</p>
										</div>
									</div>
			
									<hr>
			
									<div class="form-field mb-2">
										<div class="checkbox">
											<input type="checkbox" name="ignore_duplicate_entries" value="ignore_duplicate_entries" id="ignore_duplicate_entries">
											<label class="ml-1" for="ignore_duplicate_entries">Ignore duplicate entries</label>
											<p class="text-info ml-4">
												This will option will ignore the duplicate entries on import.
											</p>
										</div>
									</div>
			
									<hr>
			
									<div class="form-field mb-2">
										<div class="checkbox">
											<input type="checkbox" name="update_duplicate_entries" value="update_duplicate_entries" id="update_duplicate_entries" onchange="$('#import-students-submit').addClass('btn-warning')">
											<label class="ml-1" for="update_duplicate_entries">Update duplicate entries</label>
											<p class="text-warning ml-4">
												This option will update the Username, Last Name, First Name and Programme of a Student if a matching candidate number is found.
											</p>
										</div>
									</div>
							</div>
	
							<div class="col-6">
								<div class="form-field mb-2">
									<div class="checkbox">
										<input type="checkbox" name="empty_students" value="empty_students" id="empty_students" onchange="$('#import-students-submit').addClass('btn-danger')">
										<label class="ml-1" for="empty_students">Empty students table</label>
									</div>
									<p class="text-danger ml-4">
										This will option will <b>empty</b> the <span class="text-uppercase">{{ get_el_short_name() }}</span> students table and delete the entries from the user table.<br>
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
							</div>

							<div class="col-6 offset-6 text-right">
								<div class="form-group">
									<label class="d-inline-block" for="studentFile">Select file to upload</label>
									<input type="file" accept=".csv" id="studentFile" name="studentFile" class="file" required/>
								</div>

                                <button id="import-students-submit" class="btn btn-primary" type='submit'>Import</button>
							</div>
						</div>

						<div id="import-student-result"></div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<style type="text/css">
	.jconfirm-content {
		text-align: left !important;
	}
</style>
@endsection
