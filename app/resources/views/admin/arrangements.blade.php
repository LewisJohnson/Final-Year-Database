@extends('layouts.app')
@section('content')
<div class="centered mw-1200">
	<h1>Amend Supervisor Arrangements</h1>
	<h3>Edit the arrangements you wish then press submit</h3>
	<form action="{{ action('ProjectAdminController@amendSupervisorArrangements') }}" method="POST" accept-charset="utf-8">
		{{ csrf_field() }}
		<div class="table-responsive">
			<table class="data-table shadow-2dp">
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
							<td><input type="number" id="{{ $supervisor->user->id }}_project_load" name="{{ $supervisor->user->id }}_project_load" value="{{ $supervisor->getProjectLoad() }}"></td>
							<td>
								<div class="checkbox">
									<input id="{{ $supervisor->user->id }}_take_students" name="{{ $supervisor->user->id }}_take_students" type="checkbox" @if($supervisor->getTakingStudents()) checked @endif>
									<label style="position: relative;left: -23px;" for="{{ $supervisor->user->id }}_take_students"></label>
								</div>
							</td>
						</tr>
					@endforeach
				</tbody>
			</table>
		</div>
		<input style="margin-top: 1rem" type="submit" class="button button--raised button--accent">
	</form>
</div>
@endsection
