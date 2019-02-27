@extends('layouts.app')
@section ('content')

<div class="centered mw-800">
	<div class="card">
		<div class="card-header">Parameters</div>

		<div class="card-body">
			<form class="form d-flex" method="POST" action="{{ action('ProjectAdminController@amendParameters') }}">
				{{ csrf_field() }}
	
				<div class="form-field">
					<label for="project_selection">Student Selection Date</label>
					<input type="date" name="project_selection" value="{{ SussexProjects\Mode::getProjectSelectionDate()->toDateString() }}">
				</div>
	
				<div class="form-field">
					<label for="supervisor_accept">Supervisor Accept Date</label>
					<input type="date" name="supervisor_accept" value="{{ SussexProjects\Mode::getSupervisorAcceptDate()->toDateString() }}">
				</div>
	
				<div class="form-field">
					<label for="project_year">Project Year</label>
					<select id="project_year" name="project_year" />
						@for ($i = (date("Y") - 5); $i < (date("Y") + 5); $i++)
							<option @if($i == SussexProjects\Mode::getProjectYear()) selected @endif>{{ $i }}</option>
						@endfor
					</select>
				</div>
	
				<div class="text-right">
					<button class="btn btn-primary" type="submit" value="Submit">Update</button>
				</div>
	
				@include ('partials.errors')
			</form>
		</div>
	</div>
	<div class="mt-3">
		<a class="btn btn-secondary" href="javascript:history.back()">Back</a>
	</div>
</div>

@endsection
