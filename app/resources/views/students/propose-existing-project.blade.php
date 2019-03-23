@extends('layouts.app')
@section ('content')

<div class="centered mw-800">

@if(SussexProjects\Mode::getProjectSelectionDate()->gt(\Carbon\Carbon::now()))
		<div class="alert alert-danger" role="alert">You may not propose a project until {{ SussexProjects\Mode::getProjectSelectionDate(true) }}.</div>
		<script>
			$(function() {
				$('.form-field *').attr('disabled', true);
			});
		</script>
	@endif


	<div class="card">
		<div class="card-header">Propose Existing Project</div>

		<div class="card-body">
			<form class="form" method="POST" autocomplete="off" action="{{ action('StudentController@proposeExistingProject') }}">
				{{ csrf_field() }}
	
				<h1 class="text-capitalize text-center">{{ $project->title }}</h1>
				<h4 class="text-capitalize text-center text-muted">Created by {{ $project->student->getName() }}</h4>
	
				<h3 class="mt-3">Description</h3>
				<div>
					<p>{!! html_entity_decode($project->description) !!}</p>
				</div>
	
				<input type="hidden" name="project_id" value="{{ $project->id }}">
	
				<h3>Skills</h3>
				<p>{{ $project->skills }}</p>
	
				<div class="form-field">
					<label for="supervisor_id">Supervisor</label>
					<br>
					<select id="supervisor_id" name="supervisor_id">
						@foreach($supervisors as $supervisor)
							<option value="{{ $supervisor->user->id }}">{{ $supervisor->user->getFullName() }}</option>
						@endforeach
					</select>
				</div>
	
				@include ('partials.errors')
	
				<div class="text-right mt-3">
					<button class="btn btn-primary" type="submit" value="Submit">Propose</button>
				</div>
			</form>
		</div>
	</div>

	<div class="mt-3">
		<a class="btn btn-secondary" href="javascript:history.back()">Back</a>
	</div>
</div>
@endsection
