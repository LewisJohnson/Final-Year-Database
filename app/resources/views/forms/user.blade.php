
@if($type === "new")
	<form class="form form--flex" role="form" method="POST" action="{{ action('UserController@create') }}">
@elseif($type === "edit")
	<form class="form form--flex" role="form" method="POST" action="{{ action('UserController@update', $user) }}">
	{{ method_field('PATCH') }}
@endif

{{ csrf_field() }}

<div class="form-field{{ $errors->has('username') ? ' has-error' : '' }}">
	<label for="username">Username</label>

	@if($type === "new")
		<input id="username" type="text" class="form-control" name="username" value="{{ old('username') }}" required autofocus>
	@elseif($type === "edit")
		<input id="username" type="text" class="form-control" name="username" value="{{ $user->username }}" autofocus>
	@endif

	@include('forms.partials.error-block', ['name' => 'username'])
</div>

@if($type === "new")
	<div class="form-field{{ $errors->has('password') ? ' has-error' : '' }}">
		<label for="password">Password</label>
		<input id="password" type="password" class="form-control" name="password" required>
		@include('forms.partials.error-block', ['name' => 'password'])
	</div>

	<div class="form-field">
		<label for="password-confirm">Confirm Password</label>
		<input id="password-confirm" type="password" name="password_confirmation" required>
	</div>
@endif

<div class="form-field{{ $errors->has('first_name') ? ' has-error' : '' }}">
	<label for="first_name">First Name</label>
	
	@if($type === "new")
		<input id="first_name" type="text" class="form-control" name="first_name" value="{{ old('first_name') }}" required>
	@elseif($type === "edit")
		<input id="first_name" type="text" class="form-control" name="first_name" value="{{ $user->first_name }}">
	@endif
	@include('forms.partials.error-block', ['name' => 'first_name'])
</div>

<div class="form-field{{ $errors->has('last_name') ? ' has-error' : '' }}">
	<label for="last_name">Last Name</label>

	@if($type === "new")
		<input id="last_name" type="text" class="form-control" name="last_name" value="{{ old('last_name') }}" required>
	@elseif($type === "edit")
		<input id="last_name" type="text" class="form-control" name="last_name" value="{{ $user->last_name }}">
	@endif

	@include('forms.partials.error-block', ['name' => 'last_name'])
</div>

<div class="form-field{{ $errors->has('email') ? ' has-error' : '' }}">
	<label for="email">E-Mail Address</label>

	@if($type === "new")
		<input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>
	@elseif($type === "edit")
		<input id="email" type="email" class="form-control" name="email" value="{{  $user->email }}">
	@endif

	@include('forms.partials.error-block', ['name' => 'email'])
</div>

<div class="form-field{{ $errors->has('privileges') ? ' has-error' : '' }}">
	<label>Privileges</label>
	@include('forms.partials.error-block', ['name' => 'privileges'])

	<div>
		<div class="button-group flex--stretch-children">
			<div class="checkbox">
				<input type="checkbox" id="privileges-guest" name="privileges[]" value="guest" class="checkbox-input" @if($user->isGuest()) checked @endif>
				<label for="privileges-guest">Guest</label>
			</div>
			<div class="checkbox">
				<input type="checkbox" id="privileges-staff" name="privileges[]" value="staff" class="checkbox-input" @if($user->isStaff()) checked @endif>
				<label for="privileges-staff">Staff</label>
			</div>
			<div class="checkbox">
				<input type="checkbox" id="privileges-supervisor" name="privileges[]" value="supervisor" class="checkbox-input" @if($user->isSupervisor()) checked @endif>
				<label for="privileges-supervisor">Supervisor</label>
			</div>
		</div>

		<div class="button-group flex--stretch-children">
			@if(Auth::user()->isSystemAdmin() || Auth::user()->isMastersAdmin())
				<div class="checkbox">
					<input type="checkbox" id="privileges-admin-masters" name="privileges[]" value="admin_masters" class="checkbox-input" @if($user->isMastersAdmin()) checked @endif>
					<label for="privileges-admin-masters">Masters administrator</label>
				</div>
				<div class="checkbox">
					<input type="checkbox" id="privileges-student-masters" name="privileges[]" value="student_masters" class="checkbox-input" @if($user->isStudent() && $user->studentType() == "masters") checked @endif>
					<label for="privileges-student-masters">Masters student</label>
				</div>
			@endif
		</div>

		<div class="button-group flex--stretch-children">
			@if(Auth::user()->isSystemAdmin() || Auth::user()->isUgAdmin())
				<div class="checkbox">
					<input type="checkbox" id="privileges-admin-ug" name="privileges[]" value="admin_ug" class="checkbox-input" @if($user->isUgAdmin()) checked @endif>
					<label for="privileges-admin-ug">Undergraduate administrator</label>
				</div>
				<div class="checkbox">
					<input type="checkbox" id="privileges-student-ug" name="privileges[]" value="student_ug" class="checkbox-input"  @if($user->isStudent() && $user->studentType() == "ug") checked @endif>
					<label for="privileges-student-ug">Undergraduate student</label>
				</div>
			@endif
		</div>

		<div class="button-group flex--stretch-children">
			@if(Auth::user()->isSystemAdmin())
				<div class="checkbox">
					<input type="checkbox" id="privileges-admin-system" name="privileges[]" value="admin_system" class="checkbox-input" @if($user->isSystemAdmin()) checked @endif>
					<label for="privileges-admin-system">System administrator</label>
				</div>
			@endif
		</div>
	</div>
</div>

{{-- STUDENT FORM --}}
@if($type === "new")
	<div id="student-form">
		<h3>Student</h3>
		<p>You are creating a @lang_sess("full_name") student.</p>
		<div class="form-field">
			<label for="programme">Programme</label>
			<input id="programme" type="text" name="programme">
		</div>
		<div class="form-field">
			<label for="registration_number">Registration Number</label>
			<input id="registration_number" type="text" name="registration_number">
		</div>
	</div>
{{-- END STUDENT FORM --}}
@endif

{{-- SUPERVISOR FORM --}}
<div id="supervisor-form">
	<h3>Supervisor</h3>
	<div class="form-field">
		<label for="title">Title</label>
		@include('forms.partials.error-block', ['name' => 'title'])
		<input id="title" type="text" name="title" maxlength="6" @if($user->isSupervisor()) value="{{ $user->supervisor->title }}" @endif>
	</div>

	<label>Emails</label>
	<div class="button-group flex--stretch-children">
		@if(Auth::user()->isSystemAdmin() || Auth::user()->isMastersAdmin())
			<div class="checkbox">
				<input type="checkbox" id="email-masters" name="accept_email_masters" class="checkbox-input" @if($user->isSupervisor() && $user->supervisor->accept_email_masters) checked @endif>
				<label for="email-masters">Accept masters emails</label>
			</div>
		@endif
		
		@if(Auth::user()->isSystemAdmin() || Auth::user()->isUgAdmin())
			<div class="checkbox">
				<input type="checkbox" id="email-ug" name="accept_email_masters" class="checkbox-input" @if($user->isSupervisor() && $user->supervisor->accept_email_ug) checked @endif>
				<label for="email-ug">Accept undergraduate emails</label>
			</div>
		@endif
	</div>

	<label>Take students</label>
	<div class="button-group flex--stretch-children">
		@if(Auth::user()->isSystemAdmin() || Auth::user()->isMastersAdmin())
			<div class="checkbox">
				<input type="checkbox" id="email-masters" name="take_students_masters" class="checkbox-input" @if($user->isSupervisor() && $user->supervisor->take_students_masters) checked @endif>
				<label for="email-masters">Take masters students</label>
			</div>
		@endif
		
		@if(Auth::user()->isSystemAdmin() || Auth::user()->isUgAdmin())
			<div class="checkbox">
				<input type="checkbox" id="email-ug" name="take_students_ug" class="checkbox-input" @if($user->isSupervisor() && $user->supervisor->take_students_ug) checked @endif>
				<label for="email-ug">Take undergraduate students</label>
			</div>
		@endif
	</div>

	<label>Project Load</label>
	<div class="button-group flex--stretch-children">
		@if(Auth::user()->isSystemAdmin() || Auth::user()->isMastersAdmin())
			<div class="form-field">
				<label for="project_load_masters">Masters project load</label>
				<input id="project_load_masters" type="number" name="project_load_masters" min="0" max="255"  @if($user->isSupervisor()) value="{{ $user->supervisor->project_load_masters }}" @endif>
			</div>
		@endif
		
		@if(Auth::user()->isSystemAdmin() || Auth::user()->isUgAdmin())
			<div class="form-field">
				<label for="project_load_ug">Undergraduate project load</label>
				<input id="project_load_ug" type="number" name="project_load_ug" min="0" max="255"  @if($user->isSupervisor()) value="{{ $user->supervisor->project_load_ug }}" @endif>
			</div>
		@endif

		@include('forms.partials.error-block', ['name' => 'project_load'])
	</div>
	{{-- END SUPERVISOR FORM --}}
</div>

<div class="form-field">
	@if($type === "new")
		<button type="submit" class="button button--raised button--accent">Register</button>
	@elseif($type === "edit")
		<button type="submit" class="button button--raised button--accent">Update User</button>
	@endif
</div>

{{-- END USER FORM --}}
</form>