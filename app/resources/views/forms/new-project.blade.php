@php ($user = Auth::user())

<form class="form form--flex" method="POST" @if($user_type == "student") action="/students/proposeProject" @elseif($user_type == "supervisor") action="/projects" @endif>
	{{ csrf_field() }}
	@if($user_type == "supervisor")
		<p><b>Supervisor:</b> {{ $user->getFullName() }}</p>
	@elseif($user_type == "student")
		<p><b>Student:</b> {{ $user->getFullName() }}</p>
	@endif
	
	<div class="form-field">
		<label class="hover-label" for="title">Title</label>
		<input maxlength="255" type="text" name="title" id="title" required>
	</div>
	
	<div class="form-field">
		<label class="hover-label" for="description">Description</label>
		<textarea maxlength="16777215" type="text" name="description" id="description" required></textarea>
	</div>

	<div class="form-field">
		<label class="hover-label" for="skills">Skills</label>
		<input maxlength="255" type="text" name="skills" id="skills"></input>
	</div>

	<div class="form-field">
		<label class="hover-label" for="skills">Status</label>
		<select name="status" id="status">
			<option value="on-offer">On Offer</option>
			<option value="withdrawn">Withdrawn</option>
			<option value="archived">Archived</option>
		</select>
	</div>

	<div class="form-field">
		<button class="button button--raised button--accent" type="submit" value="Submit">Create</button>
	</div>
	
	@include ('partials.errors')
</form>