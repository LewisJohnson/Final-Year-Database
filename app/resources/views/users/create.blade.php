@extends('layouts.app')

@section('content')
<div class="centered width-600 card">
<h1>Add New User</h1>
<form class="form form--flex" role="form" method="POST" action="/users">
	{{ csrf_field() }}
	<div class="form-field{{ $errors->has('username') ? ' has-error' : '' }}">
		<label for="username" >Username</label>
		<input id="username" type="text" class="form-control" name="username" value="{{ old('username') }}" required autofocus>

		@if($errors->has('username'))
			<span class="help-block">
				<strong>{{ $errors->first('username') }}</strong>
			</span>
		@endif
	</div>

	<div class="form-field{{ $errors->has('password') ? ' has-error' : '' }}">
		<label for="password" >Password</label>
		<input id="password" type="password" class="form-control" name="password" required>

		@if($errors->has('password'))
			<span class="help-block">
				<strong>{{ $errors->first('password') }}</strong>
			</span>
		@endif
	</div>

	<div class="form-field">
		<label for="password-confirm" >Confirm Password</label>
		<input id="password-confirm" type="password" name="password_confirmation" required>
	</div>

	<div class="form-field{{ $errors->has('first_name') ? ' has-error' : '' }}">
		<label for="first_name" >First Name</label>
		<input id="first_name" type="text" class="form-control" name="first_name" value="{{ old('first_name') }}" required>

		@if($errors->has('first_name'))
			<span class="help-block">
				<strong>{{ $errors->first('first_name') }}</strong>
			</span>
		@endif
	</div>

	<div class="form-field{{ $errors->has('last_name') ? ' has-error' : '' }}">
		<label for="last_name" >Last Name</label>
		<input id="last_name" type="text" class="form-control" name="last_name" value="{{ old('last_name') }}" required>

		@if($errors->has('last_name'))
			<span class="help-block">
				<strong>{{ $errors->first('last_name') }}</strong>
			</span>
		@endif
	</div>

	<div class="form-field{{ $errors->has('email') ? ' has-error' : '' }}">
		<label for="email" >E-Mail Address</label>
		<input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>

		@if($errors->has('email'))
			<span class="help-block">
				<strong>{{ $errors->first('email') }}</strong>
			</span>
		@endif
	</div>

	<div class="form-field{{ $errors->has('privileges') ? ' has-error' : '' }}">
		<label>Privileges</label>

		@if($errors->has('privileges'))
			<span class="help-block">
				<strong>{{ $errors->first('privileges') }}</strong>
			</span>
		@endif

		<div>
			<div class="button-group flex--strech">
				<div class="checkbox">
					<input type="checkbox" id="privileges-guest" name="privileges[]" value="guest" class="checkbox-input">
					<label for="privileges-guest">Guest</label>
				</div>
				<div class="checkbox">
					<input type="checkbox" id="privileges-staff" name="privileges[]" value="staff" class="checkbox-input">
					<label for="privileges-staff">Staff</label>
				</div>
				<div class="checkbox">
					<input type="checkbox" id="privileges-supervisor" name="privileges[]" value="supervisor" class="checkbox-input">
					<label for="privileges-supervisor">Supervisor</label>
				</div>
			</div>

			<div class="button-group flex--strech">
				@if(Auth::user()->isSystemAdmin() || Auth::user()->isMastersAdmin())
					<div class="checkbox">
						<input type="checkbox" id="privileges-admin-masters" name="privileges[]" value="admin_masters" class="checkbox-input">
						<label for="privileges-admin-masters">Masters administrator</label>
					</div>
					<div class="checkbox">
						<input type="checkbox" id="privileges-student-masters" name="privileges[]" value="student_masters" class="checkbox-input">
						<label for="privileges-student-masters">Masters student</label>
					</div>
				@endif
			</div>

			<div class="button-group flex--strech">
				@if(Auth::user()->isSystemAdmin() || Auth::user()->isUgAdmin())
					<div class="checkbox">
						<input type="checkbox" id="privileges-admin-ug" name="privileges[]" value="admin_ug" class="checkbox-input">
						<label for="privileges-admin-ug">Undergraduate administrator</label>
					</div>
					<div class="checkbox">
						<input type="checkbox" id="privileges-student-ug" name="privileges[]" value="student_ug" class="checkbox-input">
						<label for="privileges-student-ug">Undergraduate student</label>
					</div>
				@endif
			</div>

			<div class="button-group flex--strech">
				@if(Auth::user()->isSystemAdmin())
					<div class="checkbox">
						<input type="checkbox" id="privileges-admin-system" name="privileges[]" value="admin_system" class="checkbox-input">
						<label for="privileges-admin-system">System administrator</label>
					</div>
				@endif
			</div>
		</div>
	</div>

	{{-- STUDENT FORM --}}
	<div id="student-form">

		<p>You are creating a @lang_sess("full_name") student.</p>

		<div class="form-field">
			<label for="programme" >Programme</label>
			<input id="programme" type="text" name="programme">
		</div>

		<div class="form-field">
			<label for="registration_number" >Registration Number</label>
			<input id="registration_number" type="text" name="registration_number">
		</div>
	</div>

	{{-- SUPERVISOR FORM --}}
	<div id="supervisor-form">
		<div class="form-field">
			<label for="title" >Title</label>
			<input id="title" type="text" name="title">
		</div>

		<div class="form-field">
			<label for="contact_type" >Contact Type</label>
			<input id="contact_type" type="text" name="contact_type">
		</div>

		<div class="form-field">
			<label for="project_load" >Project Load</label>
			<input id="project_load" type="number" name="project_load">
		</div>

		<div class="form-field">
			<label for="take_students" >Take Students</label>
			<input id="take_students" type="checkbox" name="take_students">
		</div>
	</div>

	<div class="form-field">
		<button type="submit" class="button button--raised button--accent">Register</button>
	</div>
</form>
</div>
@endsection
