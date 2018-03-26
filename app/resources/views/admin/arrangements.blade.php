@extends('layouts.app')
@section('content')
<div class="centered width--1200">
	<h1>Amend Supervisor Arrangements</h1>
	<h3>{{ lang_sess('select_supervisor_arragments') }}</h3>
	<form action="{{ action('AdminController@amendSupervisorArrangements') }}" method="POST" accept-charset="utf-8">
		{{ csrf_field() }}
		<div class="arrangements-container">
			<table class="data-table data-table--selectable shadow-2dp">
				<thead>
					<tr>
						<th>
							<div class="checkbox">
								<input class="checkbox-input master-checkbox" id="arrangements" type="checkbox">
								<label for="arrangements"></label>
							</div>
						</th>
						<th>Name</th>
						<th>Username</th>
						<th>Project Load</th>
						<th>Take Students</th>
					</tr>
				</thead>
				<tbody>
					@foreach($supervisors as $supervisor)
						<tr class="pointer">
							<td>
								<div class="checkbox">
									<input class="checkbox-input" id="supervisor-{{ $supervisor->id }}" type="checkbox" name="supervisor-{{ $supervisor->id }}">
									<label for="supervisor-{{ $supervisor->id }}"></label>
								</div>
							</td>

							<td>{{ $supervisor->user->getFullName() }}</td>
							<td>{{ $supervisor->user->username }}</td>
							<td>{{ $supervisor->getProjectLoad() }}</td>
							<td>{{ $supervisor->getTakingStudents() ? 'Yes' : 'No' }}</td>
						</tr>

					@endforeach
				</tbody>
			</table>

			<div class="side-content card">
				<div class="form-field" title="Leave project load blank to keep current project loads.">
					<label for="project_load">Project Load</label>
					<input type="number" name="project_load" id="project_load">
				</div>

				<div class="form-field">
					<div class="checkbox">
						<input id="take_students" name="take_students" type="checkbox" checked>
						<label for="take_students">Take Students</label>
					</div>
				</div>

				<input type="submit" class="button button--raised button--accent">
			</div>
		</div>
	</form>
</div>
@endsection
