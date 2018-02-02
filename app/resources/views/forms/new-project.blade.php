<form class="form form--flex" method="POST" autocomplete="off" @if($user_type == "student") action="/students/project-propose" @elseif($user_type == "supervisor") action="/projects" @endif>
	{{ csrf_field() }}
	@if($user_type == "supervisor")
		<p><b>Supervisor:</b> {{ Auth::user()->getFullName() }}</p>
	@elseif($user_type == "student")
		<p><b>Student:</b> {{ Auth::user()->getFullName() }}</p>
	@endif

	<div class="form-field">
		<label for="title">Title</label>
		<input maxlength="255" type="text" name="title" id="title" autofocus="true" required>
	</div>

	<div class="form-field">
		<label for="description">Description</label>
		<textarea maxlength="16777215" type="text" name="description" id="description" required></textarea>
	</div>

	<div class="form-field">
		<label for="skills">Skills</label>
		<input maxlength="255" type="text" name="skills" id="skills"></input>
	</div>

	@if($user_type == "supervisor")
		<div class="form-field">
			<label for="skills">Status</label>
			<select name="status" id="status">
				<option value="on-offer">On Offer</option>
				<option value="withdrawn">Withdrawn</option>
				<option value="archived">Archived</option>
			</select>
		</div>
	@elseif($user_type == "student")
		<input type="hidden" name="status" value="student-proposed">
	@endif

	<div class="form-field">
		<label>Topics</label>
		<p>You may add topics after the project has been created.</p>
	</div>

	@if($user_type == "student")
		<div class="form-field">
			<label for="supervisor_id">Supervisor</label>
			<select id="supervisor_id" name="supervisor_id">
				@foreach(SussexProjects\Supervisor::all() as $supervisor)
					<option value="{{ $supervisor->user->id }}">{{ $supervisor->user->getFullName() }}</option>
				@endforeach
			</select>
		</div>
	@endif
	<div class="form-field">
		<button class="button button--raised button--accent" type="submit" value="Submit">Create</button>
	</div>

	@include ('partials.errors')
</form>
