@extends ('layout')
@section ('content')
<h1>Create new project</h1>

<form method="POST" action="/projects">
	{{ csrf_field() }}
	
	<div class="form-field">
		<label class="hover-label" for="supervisor">Supervisor</label>
		<input type="text" name="supervisor" id="supervisor" required>
	</div>
	
	<div class="form-field">
		<label class="hover-label" for="title">Title</label>
		<input type="text" name="title" id="title" required>
	</div>
	
	<div class="form-field">
		<label class="hover-label" for="description">Description</label>
		<textarea type="text" name="description" id="description" required></textarea>
	</div>
	<div class="form-field">
		<label for="archived">Sumbit as archived?</label>
		<input class="bitValueCheckbox" id="archived" name="archived" type="checkbox" value="0">
	</div>
	<div class="form-field">
		<button type="submit" value="Submit">Add</button>
	</div>
	@include ('partials.errors')
</form>


<a href="/projects" title="">Back</a>
@endsection