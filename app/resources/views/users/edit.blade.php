@extends('layout')

@section('content')
<form method="POST" action="{{ route('register') }}">
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
		<label for="access_type">Access Type</label>
		<select name="access_type" name="access_type">
			<option value="student">Student</option>
			<option value="staff">Staff</option>
			<option value="supervisor">Supervisor</option>
			<option value="admin">Administrator</option>
		</select>
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

	<div class="form-field">
		<button type="submit" class="btn btn-primary">Register</button>
	</div>
</form>
@endsection
