@php ($user = Auth::user())

<form method="POST" @if($user_type == "student") action="/students/proposeProject" @elseif($user_type == "supervisor") action="/projects" @endif>
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
		<input maxlength="255" type="text" name="skills" id="skills" required></input>
	</div>

	<div class="form-field">
		<select name="status">
			<option value="on-offer">On Offer</option>
			<option value="withdrawn">Withdrawn</option>
		</select>
	</div>

	<div class="form-field">
		<button type="submit" value="Submit">Add</button>
	</div>
	
	@include ('partials.errors')
</form>