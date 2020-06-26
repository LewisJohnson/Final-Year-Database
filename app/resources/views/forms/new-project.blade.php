{!! SussexProjects\Topic::getDatalist() !!}
<div class="card-body">
	<form id="create-project-form" class="js-project-form" method="POST" autocomplete="off" @if($user_type == "student") action="{{ action('StudentController@proposeProject') }}" @elseif($user_type == "supervisor") action="{{ action('ProjectController@store') }}" @endif>
		{{ csrf_field() }}
		@if($user_type == "supervisor")
			<p><b>Supervisor: </b>{{ Auth::user()->getFullName() }}</p>
		@elseif($user_type == "student")
			<p><b>Student: </b>{{ Auth::user()->getFullName() }}</p>
		@endif

		<div class="form-group">
			<label for="title" class="w-100">
				Title
				<small>
					<span class="ml-1 text-muted">We recommended a maximum of 40 characters.</ins>
					<ins id="title-character-count" class="fr transition--medium"></ins>
				</small>
			</label>

			<input class="js-project-title form-control" maxlength="255" type="text" name="title" id="title" autofocus="true" value="{{ old('title') }}" required>

			<div class="alert alert-danger mt-2" role="alert" id="title-already-used" style="display: none;">
				This project title is already in use.
			</div>

			<div class="alert alert-primary mt-2" role="alert" id="similar-title-already-used" style="display: none;">
				A similar project title is already in use.
			</div>
		</div>

		<div class="form-group">
			<label class="d-inline-block" for="description">Description</label>
			<div class="html-editor">
				<textarea id="html-editor--input" required class="form-control html-editor--input" maxlength="16777215" type="text" name="description" id="description">{{ old('description') }}</textarea>
			</div>
		</div>

		<div class="form-group">
			<label for="skills">Skills</label>
			<input class="form-control" maxlength="255" type="text" name="skills" id="skills" required value="{{ old('skills') }}">
		</div>

		@if($user_type == "supervisor")
			<div class="form-group">
				<label>Topics <span class="ml-1 text-muted" style="font-size: 12px;">Press COMMA to save topic.</span></label>
				<div id="create-topic-input-container" class="border p-2">
					<ul class="topics-list create">
						<input class="form-control" list="topicsDataList" type="text" id="create-project-add-topic-input">
					</ul>
					<div class="spinner spinner-border text-primary" style="display: none"></div>
				</div>
			</div>

			<div class="form-group">
				<label for="skills">Status</label>
				<br>
				<select class="form-control w-auto" name="status" id="status">
					<option value="on-offer">On Offer</option>
					<option value="withdrawn">Withdrawn</option>
				</select>
			</div>
		@elseif($user_type == "student")
			<input type="hidden" name="status" value="student-proposed">
		@endif

		@if($user_type == "student")
			<div class="form-group">
				<label for="supervisor_id">Supervisor</label>
				<br>
				<select class="form-control w-auto" id="supervisor_id" name="supervisor_id">
					@foreach($supervisors as $supervisor)
						<option value="{{ $supervisor->user->id }}">{{ $supervisor->user->getFullName() }}</option>
					@endforeach
				</select>
			</div>
		@endif

		@include ('partials.errors')

		<div class="text-right">
			<button class="btn btn-primary" type="submit" value="Submit">Create</button>
		</div>
	</form>
</div>
