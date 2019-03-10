@extends('layouts.app')
@section ('content')

<div class="centered mw-800">
	<div class="card">
		<div class="card-header">Parameters</div>

		<div class="card-body">
			<form class="form" method="POST" action="{{ action('ProjectAdminController@amendParameters') }}">
				{{ csrf_field() }}
	
				<p>
					The date you set will be the day the action will be permitted, not midnight on this day.<br>
					For example, if you set the date to {{ Carbon\Carbon::now()->format('d/m/Y') }}, the action will be permitted on {{ Carbon\Carbon::now()->format('d/m/Y') }} 00:00.</p>

				<div class="form-field">
					<label for="project_selection">Student Selection Date</label>
					<input class="ml-2" type="date" name="project_selection" value="{{ SussexProjects\Mode::getProjectSelectionDate()->toDateString() }}">
				</div>
	
				<div class="form-field">
					<label for="supervisor_accept">Supervisor Accept Date</label>
					<input class="ml-2" type="date" name="supervisor_accept" value="{{ SussexProjects\Mode::getSupervisorAcceptDate()->toDateString() }}">
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
