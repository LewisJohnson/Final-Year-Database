@extends('layouts.app')
@section ('content')

<div class="centered mw-800">

@if(SussexProjects\Mode::getProjectSelectionDate()->gt(\Carbon\Carbon::now()))
		<p class="config-tip">You may not propose a project until {{ SussexProjects\Mode::getProjectSelectionDate(true) }}.</p>
		<script>
			$(function() {
				$('.form-field *').attr('disabled', true);
			});
		</script>
	@endif

	<h1>Propose Existing Project</h1>

	<div class="card">
		<form class="form form--flex" method="POST" autocomplete="off" action="{{ action('StudentController@proposeExistingProject') }}">
			{{ csrf_field() }}

			<h1 class="title">{{ $project->title }}</h1>

			<h2 class="supervisor">Created by {{ $project->student->getName() }}</h2>

			<h3>Description</h3>
			<div>
				<p>{!! html_entity_decode($project->description) !!}</p>
			</div>

			<input type="hidden" name="project_id" value="{{ $project->id }}">

			<h3>Skills</h3>
			<p>{{ $project->skills }}</p>

			<div class="form-field">
				<label for="supervisor_id">Supervisor</label>
				<select id="supervisor_id" name="supervisor_id">
					@foreach($supervisors as $supervisor)
						<option value="{{ $supervisor->user->id }}">{{ $supervisor->user->getFullName() }}</option>
					@endforeach
				</select>
			</div>

			@include ('partials.errors')

			<div class="form-field">
				<button class="button button--raised button--accent" type="submit" value="Submit">Propose</button>
			</div>
		</form>
	</div>

	<div class="button-group margin-children--horizontal">
		<a class="button button--raised" href="javascript:history.back()">Back</a>
	</div>
</div>
@endsection
