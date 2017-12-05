@extends('layouts.admin')
@section('content')
<div class="centered width-1200">
<h1>Supervisors</h1>
@if(Session::get("db_type") == "ug")
<h3>Select a supervisor to amend their undergradate arrangements.</h3>
@else
<h3>Select a supervisor to amend their masters arrangements.</h3>
@endif
<div class="arrangements-container">
<table class="data-table data-table--selectable shadow-2dp">
	<thead>
	<tr>
		<th>			
			<div class="checkbox">
				<input class="checkbox-input master-checkbox" id="arrangements" type="checkbox">
				<label for="arrangements" name="arrangements"></label>
			</div>
		</th>
		<th>Name</th>
		<th>Username</th>
		<th>Access Type</th>
		<th>Project Load</th>
		<th>Take Students</th>
	</tr>
	</thead>
	<tbody>
	@foreach($supervisors as $supervisor)
		<tr>
			<td>
				<div class="checkbox checkbox--row">
					<input class="checkbox-input" id="supervisor-{{ $supervisor->id }}" type="checkbox">
					<label for="supervisor-{{ $supervisor->id }}" name="supervisor-{{ $supervisor->id }}"></label>
				</div>
			</td>
			<td>{{ $supervisor->user->getFullName() }}</td>
			<td>{{ $supervisor->user->username }}</td>
			<td>{{ $supervisor->user->access_type }}</td>
			@if(Session::get("db_type") == "ug")
				<td>{{ $supervisor->project_load_ug }}</td>
				<td>{{ $supervisor->take_students_ug }}</td>
			@else
				<td>{{ $supervisor->project_load_masters }}</td>
				<td>{{ $supervisor->take_students_masters }}</td>
			@endif
		</tr>
	@endforeach
	</tbody>
</table>
<form class="card form form--flex" action="" method="POST" accept-charset="utf-8">
	{{ csrf_field() }}
	<div id="login-loader" class="loader" style="width: 75px; height: 75px;"></div>

	<div class="form-field">
		<label for="project_load">Project Load</label>
		<input type="number" name="project_load" id="project_load">
	</div>

	<div class="form-field">
		<div class="checkbox">
			<input id="take_students" name="take_students" type="checkbox">
			<label for="take_students">Take Students</label>
		</div>
	</div>
	<div>
		<input type="submit" class="button button--raised button--accent" name="save" value="Save">	
	</div>
</form>
</div>
</div>
@endsection
{{-- 
	<li style="padding: 0;">
		<a style="display: flex; width: 100%; padding: 10px;" href="{{ action('AdminController@supervisorArrangements', $supervisor->id)}}">
			<p>{{ $supervisor->user->getFullName() }}</p>
		<a>
	</li> --}}