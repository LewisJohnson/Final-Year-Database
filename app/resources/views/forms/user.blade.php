
@if($view === "new")
	<form class="form form--flex user-form" role="form" method="POST" action="{{ action('UserController@store') }}">
@elseif($view === "edit")
	<form class="form form--flex user-form" role="form" method="POST" action="{{ action('UserController@update', $user) }}">
	{{ method_field('PATCH') }}
@endif

{{ csrf_field() }}

<div class="form-field{{ $errors->has('username') ? ' has-error' : '' }}">
	<label for="username">Username</label>

	@if($view === "new")
		<input id="username" type="text" class="form-control" name="username" value="{{ old('username') }}" required autofocus>
	@elseif($view === "edit")
		<input id="username" type="text" class="form-control" name="username" value="{{ $user->username }}" autofocus>
	@endif

	@include('forms.partials.error-block', ['name' => 'username'])
</div>

@if($view === "new")
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

	@if($view === "new")
		<input id="first_name" type="text" class="form-control" name="first_name" value="{{ old('first_name') }}" required>
	@elseif($view === "edit")
		<input id="first_name" type="text" class="form-control" name="first_name" value="{{ $user->first_name }}">
	@endif
	@include('forms.partials.error-block', ['name' => 'first_name'])
</div>

<div class="form-field{{ $errors->has('last_name') ? ' has-error' : '' }}">
	<label for="last_name">Last Name</label>

	@if($view === "new")
		<input id="last_name" type="text" class="form-control" name="last_name" value="{{ old('last_name') }}" required>
	@elseif($view === "edit")
		<input id="last_name" type="text" class="form-control" name="last_name" value="{{ $user->last_name }}">
	@endif

	@include('forms.partials.error-block', ['name' => 'last_name'])
</div>

<div class="form-field{{ $errors->has('email') ? ' has-error' : '' }}">
	<label for="email">E-Mail Address</label>

	@if($view === "new")
		<input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required>
	@elseif($view === "edit")
		<input id="email" type="email" class="form-control" name="email" value="{{  $user->email }}">
	@endif

	@include('forms.partials.error-block', ['name' => 'email'])
</div>

<div class="form-field{{ $errors->has('programme') ? ' has-error' : '' }}">
	@if($view === "new")
		<div class="form-field">
			<label for="programme">Programme</label>
			<input id="programme" name="programme" type="text" value="{{ old('programme') }}" required>
		</div>
	@elseif($view === "edit")
		<label for="programme">Programme</label>
		<input id="programme" name="programme" type="text" value="{{$user->programme }}">
	@endif

	@include('forms.partials.error-block', ['name' => 'email'])
</div>



<div class="form-field{{ $errors->has('privileges') ? ' has-error' : '' }}">
	<label>Privileges</label>
	@include('forms.partials.error-block', ['name' => 'privileges'])

	<div>
		<div class="button-group flex--stretch-children">
			<div class="checkbox">
				<input type="checkbox" id="privileges-staff" name="privileges[]" value="staff" class="checkbox-input" @if($view === "edit") @if($user->isStaff()) checked @endif @endif>
				<label for="privileges-staff">Staff</label>
			</div>
			<div class="checkbox">
				<input type="checkbox" id="privileges-supervisor" name="privileges[]" value="supervisor" class="checkbox-input" @if($view === "edit") @if($user->isSupervisor()) checked @endif @endif>
				<label for="privileges-supervisor">Supervisor</label>
			</div>
		</div>

		@foreach (get_education_levels() as $educationLevel)
			<div class="button-group flex--stretch-children">
				@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
					<div class="checkbox">
						<input type="checkbox" id="privileges-guest" name="privileges[]" value="guest_{{ $educationLevel['shortName'] }}" class="checkbox-input" @if($view === "edit") @if($user->isGuest()) checked @endif @endif>
						<label for="privileges-guest">Guest</label>
					</div>

					<div class="checkbox">
						<input type="checkbox" id="privileges-admin-{{ $educationLevel['shortName'] }}" name="privileges[]" value="admin_{{ $educationLevel['shortName'] }}" class="checkbox-input" @if($view === "edit") @if($user->isAdminOfEducationLevel($educationLevel['shortName'])) checked @endif @endif>
						<label for="privileges-admin-{{ $educationLevel['shortName'] }}">{{ ucfirst($educationLevel['longName']) }} administrator</label>
					</div>
				@endif
			</div>
		@endforeach

		@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel(Session::get('education_level')['shortName']))
			<div class="checkbox">
				<input type="checkbox" id="privileges-student" name="privileges[]" value="student" class="checkbox-input" @if($view === "edit") @if($user->isStudent() && $user->studentType()['shortName'] == Session::get('education_level')['shortName']) checked @endif @endif>
				<label for="privileges-student">{{ ucfirst(Session::get('education_level')['longName']) }} student</label>
			</div>
		@endif

		<div class="button-group flex--stretch-children">
			@if(Auth::user()->isSystemAdmin())
				<div class="checkbox">
					<input type="checkbox" id="privileges-admin-system" name="privileges[]" value="admin_system" class="checkbox-input" @if($view === "edit") @if($user->isSystemAdmin()) checked @endif @endif>
					<label for="privileges-admin-system">System administrator</label>
				</div>
			@endif
		</div>
	</div>
</div>

{{-- STUDENT FORM --}}
@if($view === "new")
	<div id="student-form">
		<h3>Student</h3>
		<p>You are creating a {{ lang_sess('full_name') }} student.</p>
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
	<input id="title" type="text" name="title" maxlength="6" @if($view === "edit") @if($user->isSupervisor()) value="{{ $user->supervisor->title }}" @endif @endif>
	</div>

	<label>Email preference</label>
	<div class="button-group flex--stretch-children">
		@foreach (get_education_levels() as $educationLevel)
			@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
				<div class="checkbox">
					<input type="checkbox" id="email-{{ $educationLevel['shortName'] }}" name="accept_email_{{ $educationLevel['shortName'] }}" class="checkbox-input" @if($view === "edit") @if($user->isSupervisor() && $user->supervisor->getAcceptingEmails($educationLevel['shortName'])) checked @endif @endif>
					<label for="email-{{ $educationLevel['shortName'] }}">Accept {{ $educationLevel['longName'] }} emails</label>
				</div>
			@endif
		@endforeach
	</div>

	<hr>

	<label>Take students</label>
	<div class="button-group flex--stretch-children">
		@foreach (get_education_levels() as $educationLevel)
			@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
				<div class="checkbox">
					<input type="checkbox" id="take-students-{{ $educationLevel['shortName'] }}" name="take_students_{{ $educationLevel['shortName'] }}" class="checkbox-input" @if($view === "edit") @if($user->isSupervisor() && $user->supervisor->getTakingStudents($educationLevel['shortName'])) checked @endif @endif>
					<label for="take-students-{{ $educationLevel['shortName'] }}">Take {{ $educationLevel['longName'] }} students</label>
				</div>
			@endif
		@endforeach
	</div>

	<hr>

	<label>Project Load</label>
	<div class="button-group flex--stretch-children">
		@foreach (get_education_levels() as $educationLevel)
			@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
				<div class="form-field">
					<label for="project-load-{{ $educationLevel['shortName'] }}">Masters project load</label>
					<input id="project-load-{{ $educationLevel['shortName'] }}" type="number" name="project_load_{{ $educationLevel['shortName'] }}" min="0" max="255" @if($view === "edit") @if($user->isSupervisor()) value="{{ $user->supervisor->getProjectLoad($educationLevel['shortName']) }}" @endif @endif>
				</div>
			@endif
		@endforeach
		@include('forms.partials.error-block', ['name' => 'project_load'])
	</div>
	{{-- END SUPERVISOR FORM --}}
</div>

<div class="form-field">
	<button type="submit" class="button button--raised button--accent">{{ $view == "new" ? 'Register' : 'Update User'}}</button>
</div>

{{-- END USER FORM --}}
</form>
