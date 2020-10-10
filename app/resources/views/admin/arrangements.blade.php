@extends('layouts.app')
@section('content')
<div class="centered mw-1000">
	<h2>Supervisors <small class="text-muted">/ Amend {{ ucfirst(get_el_long_name()) }} Supervisor Arrangements</small></h2>
	
	<div class="alert alert-info mt-3">
		<span>&#128161;</span><span class="ml-2">Amend the arrangements you wish then press submit at the bottom of the page</span>
	</div>

	<form action="{{ action('ProjectAdminController@amendSupervisorArrangements') }}" method="POST" accept-charset="utf-8">
		{{ csrf_field() }}
		<div class="table-responsive mt-5">
			<table class="table table-hover bg-white data-table shadow-sm">
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Project Load</th>
						<th class="text-right">Take Students</th>
					</tr>
				</thead>
				<tbody>
					@foreach($supervisors as $supervisor)
						<tr>
							<td>{{ $supervisor->user->getFullName() }}</td>
							<td>{{ $supervisor->user->username }}</td>
							<td>
								<input type="number" id="{{ $supervisor->user->id }}_project_load" name="{{ $supervisor->user->id }}_project_load" value="{{ $supervisor->getProjectLoad() }}" class="py-0 form-control">
							</td>
							<td class="text-right">
								<div class="checkbox">
									<input id="{{ $supervisor->user->id }}_take_students" name="{{ $supervisor->user->id }}_take_students" type="checkbox" @if($supervisor->getTakingStudents()) checked @endif>
									<label style="position: relative;left: -23px;" for="{{ $supervisor->user->id }}_take_students"></label>
								</div>
							</td>
						</tr>
					@endforeach
				</tbody>
			</table>
			<div class="text-right mt-3">
				<input type="submit" value="Submit" class="btn btn-primary">
			</div>
		</div>
	</form>
</div>
@endsection
