@extends('layouts.app')

@section('content')
<div class="centered width-800 card">
	<h1>Edit User</h1>
	<h3>You are editing {{ $editUser->getFullName() }}</h3>

	<form class="form form--flex" role="form" method="POST" action="{{ action('UserController@edit', $editUser->id)}}">

		{{ method_field('PATCH') }}
		{{ csrf_field() }}
		<div class="form-field{{ $errors->has('username') ? ' has-error' : '' }}">
			<label for="username" >Username</label>
				<input id="username" type="text" class="form-control" name="username" value="{{ $editUser->username }}" autofocus>
				@if ($errors->has('username'))
					<span class="help-block">
						<strong>{{ $errors->first('username') }}</strong>
					</span>
				@endif
		</div>

		<div class="form-field{{ $errors->has('first_name') ? ' has-error' : '' }}">
			<label for="first_name" >First Name</label>
				<input id="first_name" type="text" class="form-control" name="first_name" value="{{ $editUser->first_name }}">
				@if ($errors->has('first_name'))
					<span class="help-block">
						<strong>{{ $errors->first('first_name') }}</strong>
					</span>
				@endif
		</div>

		<div class="form-field{{ $errors->has('last_name') ? ' has-error' : '' }}">
			<label for="last_name" >Last Name</label>
				<input id="last_name" type="text" class="form-control" name="last_name" value="{{ $editUser->last_name }}">
				@if ($errors->has('last_name'))
					<span class="help-block">
						<strong>{{ $errors->first('last_name') }}</strong>
					</span>
				@endif
		</div>

		<div class="form-field{{ $errors->has('email') ? ' has-error' : '' }}">
			<label for="email" >E-Mail Address</label>
			<input id="email" type="email" class="form-control" name="email" value="{{ $editUser->email }}">
			@if ($errors->has('email'))
				<span class="help-block">
					<strong>{{ $errors->first('email') }}</strong>
				</span>
			@endif
		</div>

		<div class="form-field">
			<label for="access_type" >Access Type</label>
			<select id="create-form-access-select" size="4" class="vertical-select" name="access_type" name="access_type">
				<option id="student-option" selected="selected" value="student">Student</option>
				<option value="staff">Staff</option>
				<option id="supervisor-option" value="supervisor">Supervisor</option>
				<option id="admin-option" value="admin">Administrator</option>
			</select>
		</div>

		{{-- STUDENT FORM --}}
		<div id="student-form">
			@if(Session::get('db_type') == 'ug')
				<p>You are editing an undergraduate student.</p>
			@elseif(Session::get('db_type') == 'masters')
				<p>You are editing a masters student.</p>
			@endif
			<div class="form-field">
				<label for="programme" >Programme</label>
				<input id="programme" type="text" name="programme" value="{{ $editUser->student->programme }}">
			</div>

			<div class="form-field">
				<label for="registration_number" >Registration Number</label>
				<input id="registration_number" type="text" name="registration_number" value="{{ $editUser->student->registration_number }}">
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

		{{-- ADMIN FORM --}}
		<div id="admin-form">
			<h2>ARE YOU SURE YOU WANT TO CREATE ANOTHER ADMINISTRATOR?</h2>
		</div>

		<div class="form-field">
			<button type="submit" class="button button--raised button--accent">Register</button>
		</div>
	</form>
</div>
@endsection
