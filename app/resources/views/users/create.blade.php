@extends('layouts.admin')

@section('content')
<form method="POST" action="/users">
	{{ csrf_field() }}
	<div class="form-field{{ $errors->has('username') ? ' has-error' : '' }}">
		<label for="username" class="hover-label">Username</label>
			<input id="username" type="text" class="form-control" name="username" value="{{ old('username') }}" required autofocus>
			@if ($errors->has('username'))
				<span class="help-block">
					<strong>{{ $errors->first('username') }}</strong>
				</span>
			@endif
	</div>

	<div class="form-field{{ $errors->has('password') ? ' has-error' : '' }}">
		<label for="password" class="hover-label">Password</label>
			<input id="password" type="password" class="form-control" name="password" required>
			@if ($errors->has('password'))
				<span class="help-block">
					<strong>{{ $errors->first('password') }}</strong>
				</span>
			@endif
	</div>

	<div class="form-field">
		<label for="password-confirm" class="hover-label">Confirm Password</label>
		<input id="password-confirm" type="password" name="password_confirmation" required>
	</div>

	<div class="form-field{{ $errors->has('first_name') ? ' has-error' : '' }}">
		<label for="first_name" class="hover-label">First Name</label>
			<input id="first_name" type="text" class="form-control" name="first_name" value="{{ old('first_name') }}" required autofocus>
			@if ($errors->has('first_name'))
				<span class="help-block">
					<strong>{{ $errors->first('first_name') }}</strong>
				</span>
			@endif
	</div>

	<div class="form-field{{ $errors->has('last_name') ? ' has-error' : '' }}">
		<label for="last_name" class="hover-label">Last Name</label>
			<input id="last_name" type="text" class="form-control" name="last_name" value="{{ old('last_name') }}" required autofocus>
			@if ($errors->has('last_name'))
				<span class="help-block">
					<strong>{{ $errors->first('last_name') }}</strong>
				</span>
			@endif
	</div>

	<div class="form-field{{ $errors->has('email') ? ' has-error' : '' }}">
		<label for="email" class="hover-label">E-Mail Address</label>
		<input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>
		@if ($errors->has('email'))
			<span class="help-block">
				<strong>{{ $errors->first('email') }}</strong>
			</span>
		@endif
	</div>

	<div class="form-field">
		<label for="access_type" class="hover-label">Access Type</label>
		<select id="create-form-access-select" size="4" class="vertical-select" name="access_type" name="access_type">
			<option id="student-option" selected="selected" value="student">Student</option>
			<option value="staff">Staff</option>
			<option id="supervisor-option" value="supervisor">Supervisor</option>
			<option id="admin-option" value="admin">Administrator</option>
		</select>
	</div>

	<div id="student-form">
		<div class="form-field">
			<label for="programme" class="hover-label">Programme</label>
			<input id="programme" type="text" name="programme">
		</div>

		<div class="form-field">
			<label for="registration_number" class="hover-label">Registration Number</label>
			<input id="registration_number" type="text" name="registration_number">
		</div>
	</div>

	<div id="supervisor-form">
		<div class="form-field">
			<label for="title" class="hover-label">Title</label>
			<input id="title" type="text" name="title">
		</div>

		<div class="form-field">
			<label for="contact_type" class="hover-label">Contact Type</label>
			<input id="contact_type" type="text" name="contact_type">
		</div>

		<div class="form-field">
			<label for="project_load" class="hover-label">Project Load</label>
			<input id="project_load" type="number" name="project_load">
		</div>

		<div class="form-field">
			<label for="take_students" class="hover-label">Take Students</label>
			<input id="take_students" type="checkbox" name="take_students">
		</div>
	</div>

	<div id="admin-form">
		<h2>ARE YOU SURE YOU WANT TO CREATE ANOTHER ADMINISTRATOR?</h2>
	</div>

	<div class="form-field">
		<button type="submit" class="btn btn-primary">Register</button>
	</div>
</form>
@endsection