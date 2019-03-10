{!! SussexProjects\Supervisor::getTitleDatalist() !!}

<div class="card-body">
	@if($view === "new")
		<form class="form user-form" role="form" method="POST" action="{{ action('UserController@store') }}">
	@elseif($view === "edit")
		<form class="form user-form" role="form" method="POST" action="{{ action('UserController@update', $user) }}">
		{{ method_field('PATCH') }}
	@endif

		{{ csrf_field() }}
		<div class="form-field{{ $errors->has('username') ? ' has-error' : '' }}">
			<label for="username">Username</label>

			@if($view === "new")
				<input id="username" type="text" name="username" value="{{ old('username') }}" required autofocus>
			@elseif($view === "edit")
				<input id="username" type="text" name="username" value="{{ $user->username }}" autofocus>
			@endif

			@include('forms.partials.error-block', ['name' => 'username'])
		</div>

		<div class="form-field{{ $errors->has('first_name') ? ' has-error' : '' }}">
			<label for="first_name">First Name</label>

			@if($view === "new")
				<input id="first_name" type="text" name="first_name" value="{{ old('first_name') }}" required>
			@elseif($view === "edit")
				<input id="first_name" type="text" name="first_name" value="{{ $user->first_name }}">
			@endif
			@include('forms.partials.error-block', ['name' => 'first_name'])
		</div>

		<div class="form-field{{ $errors->has('last_name') ? ' has-error' : '' }}">
			<label for="last_name">Last Name</label>

			@if($view === "new")
				<input id="last_name" type="text" name="last_name" value="{{ old('last_name') }}" required>
			@elseif($view === "edit")
				<input id="last_name" type="text" name="last_name" value="{{ $user->last_name }}">
			@endif

			@include('forms.partials.error-block', ['name' => 'last_name'])
		</div>

		<div class="form-field{{ $errors->has('email') ? ' has-error' : '' }}">
			<label for="email">E-Mail Address</label>

			@if($view === "new")
				<input id="email" type="email" name="email" value="{{ old('email') }}" required>
			@elseif($view === "edit")
				<input id="email" type="email" name="email" value="{{ $user->email }}">
			@endif

			@include('forms.partials.error-block', ['name' => 'email'])
		</div>

		<div class="form-field{{ $errors->has('programme') ? ' has-error' : '' }}">
			<label for="programme">Programme</label>
			@if($view === "new" || empty($user->programme))
				{!! SussexProjects\Programme::getSelectList() !!}
			@elseif($view === "edit")
				{!! SussexProjects\Programme::getSelectList($user->programme) !!}
			@endif

			@include('forms.partials.error-block', ['name' => 'programme'])
		</div>

		<div class="form-field{{ $errors->has('privileges') ? ' has-error' : '' }}">
			<label>Privileges</label>

			@include('forms.partials.error-block', ['name' => 'privileges'])

			<div id="user-privileges-select">
				<div class="d-flex">
					@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel(Session::get('education_level')['shortName']))
						<div class="checkbox">
							<input type="checkbox" id="privileges-student" name="privileges[]" value="student" class="checkbox-input user-form-student" @if($view === "edit") @if($user->isStudent() && $user->studentType()['shortName'] == Session::get('education_level')['shortName']) checked @endif @endif>
							<label class="ml-1" for="privileges-student">Student</label>
						</div>
					@endif
					<div class="checkbox ml-4">
						<input type="checkbox" id="privileges-supervisor" name="privileges[]" value="supervisor" class="checkbox-input user-form-supervisor" @if($view === "edit") @if($user->isSupervisor()) checked @endif @endif>
						<label class="ml-1" for="privileges-supervisor">Supervisor</label>
					</div>
				</div>

				<hr>

				<div class="button-group flex--stretch-children">
					<div class="checkbox">
						<input type="checkbox" id="privileges-staff" name="privileges[]" value="staff" class="checkbox-input" @if($view === "edit") @if($user->isStaff()) checked @endif @endif>
						<label class="ml-1" for="privileges-staff">Staff</label>
					</div>
				</div>
				
				<hr>
				
				<div class="d-flex">
					@foreach(get_education_levels() as $educationLevel)
						@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
							<div class="checkbox @if($loop->iteration > 1) ml-4 @endif">
								<input type="checkbox" id="privileges-admin-{{ $educationLevel['shortName'] }}" name="privileges[]" value="admin_{{ $educationLevel['shortName'] }}" class="checkbox-input" @if($view === "edit") @if($user->isAdminOfEducationLevel($educationLevel['shortName'])) checked @endif @endif>
								<label class="ml-1" for="privileges-admin-{{ $educationLevel['shortName'] }}">{{ ucfirst($educationLevel['longName']) }} administrator</label>
							</div>
						@endif
					@endforeach
					@if(Auth::user()->isSystemAdmin())
						<div class="checkbox ml-4">
							<input type="checkbox" id="privileges-admin-system" name="privileges[]" value="admin_system" class="checkbox-input" @if($view === "edit") @if($user->isSystemAdmin()) checked @endif @endif>
							<label class="ml-1" for="privileges-admin-system">System administrator</label>
						</div>
					@endif
				</div>
			</div>
		</div>

		{{-- STUDENT FORM --}}
		<div id="student-form">
			<h5>Student</h5>
			<p>You are creating an {{ lang_sess('full_name') }} student.</p>
			<div class="form-field">
				<label for="registration_number">Registration Number</label>
				<input id="registration_number" type="text" name="registration_number" @if($view === "edit") @if($user->isStudent()) value="{{ $user->student->registration_number }}" @endif @endif>
			</div>
		</div>

		{{-- SUPERVISOR FORM --}}
		<div id="supervisor-form">
			<h5>Supervisor</h5>
			<div class="form-field">
				<label for="title">Title</label>
				@include('forms.partials.error-block', ['name' => 'title'])
				<input list="titleDataList" id="title" type="text" name="title" maxlength="6" @if($view === "edit") @if($user->isSupervisor()) value="{{ $user->supervisor->title }}" @endif @endif>
			</div>

			<label>Email preference</label>
			<div class="button-group flex--stretch-children">
				@foreach(get_education_levels() as $educationLevel)
					@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
						<div class="checkbox mt-1">
							<input type="checkbox" id="email-{{ $educationLevel['shortName'] }}" name="accept_email_{{ $educationLevel['shortName'] }}" class="checkbox-input" @if($view === "edit") @if($user->isSupervisor() && $user->supervisor->getAcceptingEmails($educationLevel['shortName'])) checked @endif @endif>
							<label class="ml-1" for="email-{{ $educationLevel['shortName'] }}">Accept {{ $educationLevel['longName'] }} emails</label>
						</div>
					@endif
				@endforeach
			</div>

			<hr>

			<label>Take students</label>
			<div class="button-group flex--stretch-children">
				@foreach(get_education_levels() as $educationLevel)
					@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
						<div class="checkbox mt-1">
							<input type="checkbox" id="take-students-{{ $educationLevel['shortName'] }}" name="take_students_{{ $educationLevel['shortName'] }}" class="checkbox-input" @if($view === "edit") @if($user->isSupervisor() && $user->supervisor->getTakingStudents($educationLevel['shortName'])) checked @endif @endif>
							<label class="ml-1" for="take-students-{{ $educationLevel['shortName'] }}">Take {{ $educationLevel['longName'] }} students</label>
						</div>
					@endif
				@endforeach
			</div>

			<hr>

			<label>Project Load</label>
			<div class="button-group flex--stretch-children">
				@foreach(get_education_levels() as $educationLevel)
					@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
						<div class="form-field">
							<label for="project-load-{{ $educationLevel['shortName'] }}">{{ ucfirst($educationLevel['longName']) }} project load</label>
							<input id="project-load-{{ $educationLevel['shortName'] }}" type="number" name="project_load_{{ $educationLevel['shortName'] }}" min="0" max="255" @if($view === "edit") @if($user->isSupervisor()) value="{{ $user->supervisor->getProjectLoad($educationLevel['shortName']) }}" @endif @else value="0" @endif>
						</div>
					@endif
				@endforeach
				@include('forms.partials.error-block', ['name' => 'project_load'])
			</div>
			{{-- END SUPERVISOR FORM --}}
		</div>

		@if($view == "new")
			<div class="text-right mt-3">
				<button type="submit" class="btn btn-primary">Register</button>
			</div>
		@else
			<div class="text-right mt-3">
				<button type="submit" class="btn btn-primary">Update</button>
			</div>
		@endif
	{{-- END USER FORM --}}
	</form>
</div>