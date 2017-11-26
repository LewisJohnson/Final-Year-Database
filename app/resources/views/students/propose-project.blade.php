@extends('layouts.app')
@section ('content')
<div class="centered width-800 card">
<h1>Purpose Project</h1>

<form method="POST" action="/projects">
	{{ csrf_field() }}
	
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
</div>
@endsection