@extends('layouts.app')
@section('content')
<div class="centered width--1200">
	<h1>Amend Supervisor Arrangements</h1>
	<h3>Edit the parameters of a supervisor then press submit</h3>
	<form action="{{ action('AdminController@amendSupervisorArrangements') }}" method="POST" accept-charset="utf-8">
		{{ csrf_field() }}
		<table class="data-table data-table--selectable shadow-2dp">
			<thead>
				<tr>
					<th>Name</th>
					<th>Username</th>
					<th>Project Load</th>
					<th>Take Students</th>
				</tr>
			</thead>
			<tbody>
				@foreach($supervisors as $supervisor)
					<tr>
						<td>{{ $supervisor->user->getFullName() }}</td>
						<td>{{ $supervisor->user->username }}</td>
						<td><input type="number" name="{{ $supervisor->user->username }}_project_load" id="{{ $supervisor->user->username }}_project_load" value="{{ $supervisor->getProjectLoad() }}"></td>
						<td>
							<input id="{{ $supervisor->user->username }}_take_students" name="{{ $supervisor->user->username }}_take_students" type="checkbox" @if($supervisor->getTakingStudents()) checked @endif>
						</td>
					</tr>
				@endforeach
			</tbody>
		</table>

		<input style="margin-top: 1rem" type="submit" class="button button--raised button--accent">
	</form>
</div>
@endsection
