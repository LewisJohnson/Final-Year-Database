@extends('layouts.app')
@section ('content')

<div class="centered width--800">
	<div class="card">
		<h1>Parameters</h1>

		<form class="form form--flex" method="POST" action="{{ action('ProjectAdminController@computeSecondMarkerView') }}">
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

			<div class="form-field">
				<button class="button button--raised button--accent" type="submit" value="Submit">Update</button>
			</div>

			@include ('partials.errors')
		</form>
	</div>
	<div class="button-group button-group--horizontal">
		<a class="button button--raised" href="javascript:history.back()">Back</a>
	</div>
</div>

@endsection
