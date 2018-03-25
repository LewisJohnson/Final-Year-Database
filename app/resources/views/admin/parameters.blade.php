@extends('layouts.app')
@section ('content')

<div class="centered width--800">
	<div class="card">
		<h1>Parameters</h1>

		<form class="form form--flex" method="POST" action="{{ action('AdminController@amendParameters') }}">
			{{ csrf_field() }}

			<div class="form-field">
				<label for="mode">Mode</label>
				<input maxlength="255" type="text" name="mode" id="mode" value="{{ SussexProjects\Mode::getMode() }}">
			</div>

			<div class="form-field">
				<label for="start_date">Start Date</label>
				<input type="date" name="start_date" value="{{ SussexProjects\Mode::getStartDate()->toDateString() }}">
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
