{!! SussexProjects\Supervisor::getTitleDatalist() !!}

@if($view === "new")
	<form class="form user-form" role="form" method="POST" action="{{ action('UserController@store') }}">
@elseif($view === "edit")
	<form class="form user-form" role="form" method="POST" action="{{ action('UserController@update', $user) }}">
	{{ method_field('PATCH') }}
	<input type="hidden" name="id" value="{{ $user->id }}">
@endif

	{{ csrf_field() }}

	@include('forms.partials.form-field', [
		'label' => 'Username',
		'name' => 'username',
		'autofocus' => true
	])

	@include('forms.partials.form-field', [
		'label' => 'First Name', 
		'name' => 'first_name'
	])

	@include('forms.partials.form-field', [
		'label' => 'Last Name', 
		'name' => 'last_name'
	])

	@include('forms.partials.form-field', [
		'label' => 'E-Mail Address',
		'name' => 'email',
		'type' => 'email'
	])

	<div class="form-group {{ $errors->has('programme') ? 'has-error' : '' }}">
		<label for="programme">Programme</label>
		<br>
		@if($view === "new" || empty($user->programme))
			{!! SussexProjects\Programme::getSelectList(old('programme')) !!}
		@elseif($view === "edit")
			{!! SussexProjects\Programme::getSelectList($user->programme) !!}
		@endif

		@include('forms.partials.error-block', ['name' => 'programme'])
	</div>

	@if($view === "edit")
		<div class="form-group {{ $errors->has('active_year') ? 'has-error' : '' }}">
			<label for="active_year">Active Year</label>
			<br>
			<select class="form-control w-auto" id="active_year" name="active_year">
				@foreach(SussexProjects\Mode::all() as $mode)
					<option @if($mode->project_year == $user->active_year) selected @endif>{{ $mode->project_year }}</option>
				@endforeach
			</select>

			@include('forms.partials.error-block', ['name' => 'active_year'])
		</div>
	@endif

	<div class="form-group {{ $errors->has('privileges') ? 'has-error' : '' }}">
		<label>Privileges</label>

		@include('forms.partials.error-block', ['name' => 'privileges'])

		<div id="user-privileges-select">
			<div class="row">
				<div class="col-6 col-sm-2">
					<div class="checkbox">
						@php
							$checkStudentCheckbox = false;

							if (!empty(old('registration_number')))
							{
								$checkStudentCheckbox = true; 
							}
							else if ($view === "edit")
							{
								if ($user->isStudent() && $user->studentType()['shortName'] == Session::get('education_level')['shortName'])
								{ 
									$checkStudentCheckbox = true; 
								} 
							}

						@endphp
						<input type="checkbox" id="privileges-student" name="privileges[]" value="student" class="checkbox-input js-student" @if($checkStudentCheckbox) checked @endif>
						<label class="ml-1" for="privileges-student">Student</label>
					</div>
				</div>

				<div class="col-6 col-sm-2">
					<div class="checkbox">
						<input type="checkbox" id="privileges-supervisor" name="privileges[]" value="supervisor" class="checkbox-input js-supervisor" @if($view === "edit") @if($user->isSupervisor()) checked @endif @endif>
						<label class="ml-1" for="privileges-supervisor">Supervisor</label>
					</div>
				</div>

				<div class="col-6 col-sm-2">
					<div class="checkbox">
						<input type="checkbox" id="privileges-staff" name="privileges[]" value="staff" class="checkbox-input js-staff" @if($view === "edit") @if($user->isStaff()) checked @endif @endif>
						<label class="ml-1" for="privileges-staff">Staff</label>
					</div>
				</div>

				<div class="col-6 col-sm-3">
					<div class="checkbox">
						<input type="checkbox" id="privileges-external-marker" name="privileges[]" value="external_marker" class="checkbox-input js-staff" @if($view === "edit") @if($user->isExternalMarker()) checked @endif @endif>
						<label class="ml-1" for="privileges-external-marker">External Marker</label>
					</div>
				</div>
			</div>

			<hr>
			
			<div class="d-flex">
				@foreach(get_education_levels() as $educationLevel)
					<div class="checkbox @if($loop->iteration > 1) ml-4 @endif">
						<input type="checkbox" id="privileges-admin-{{ $educationLevel['shortName'] }}" name="privileges[]" value="admin_{{ $educationLevel['shortName'] }}" class="checkbox-input js-admin" @if($view === "edit") @if($user->isAdminOfEducationLevel($educationLevel['shortName'])) checked @endif @endif>
						<label class="ml-1" for="privileges-admin-{{ $educationLevel['shortName'] }}">{{ ucfirst($educationLevel['longName']) }} administrator</label>
					</div>
				@endforeach

				@if(Auth::user()->isSystemAdmin())
					<div class="checkbox ml-4">
						<input type="checkbox" id="privileges-admin-system" name="privileges[]" value="admin_system" class="checkbox-input js-admin" @if($view === "edit") @if($user->isSystemAdmin()) checked @endif @endif>
						<label class="ml-1" for="privileges-admin-system">System administrator</label>
					</div>
				@endif
			</div>
		</div>
	</div>

	{{-- STUDENT FORM --}}
	<div id="student-form" class="bg-light border shadow-sm p-2">
		<h3>Student</h3>
		@if($view == "new")
			<p>You are creating an {{ lang_sess('full_name') }} student.</p>
		@else
			<p>You are editing an {{ lang_sess('full_name') }} student.<br>Changing their active year will delete any Project Evaluation they may have.</p>
		@endif
		
		<div class="form-group {{ $errors->has('registration_number') ? 'has-error' : '' }}">
			<label for="registration_number">Candidate Number</label>
			<input class="form-control" id="registration_number" type="number" name="registration_number" @if($view === "edit") @if($user->isStudent()) value="{{ $user->student->registration_number }}" @endif @else value="{{ old('registration_number') }}" @endif>
			@include('forms.partials.error-block', ['name' => 'registration_number'])
		</div>
	</div>

	{{-- SUPERVISOR FORM --}}
	<div id="supervisor-form" class="bg-light border shadow-sm p-2">
		<h3>Supervisor</h3>
		<div class="form-group">
			<label for="title">Title</label>
			@include('forms.partials.error-block', ['name' => 'title'])
			<input class="form-control w-auto" list="titleDataList" id="title" type="text" name="title" maxlength="6" @if($view === "edit") @if($user->isSupervisor()) value="{{ $user->supervisor->title }}" @endif @else value="{{ old('title') }}" @endif>
		</div>

		<div class="row">
			<div class="col-12 col-sm-6">
				<label>Take students</label>
				@foreach(get_education_levels() as $educationLevel)
					@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
						<div class="checkbox mt-1">
							<input type="checkbox" id="take-students-{{ $educationLevel['shortName'] }}" name="take_students_{{ $educationLevel['shortName'] }}" class="checkbox-input" @if($view === "edit") @if($user->isSupervisor() && $user->supervisor->getTakingStudents($educationLevel['shortName'])) checked @endif @endif>
							<label class="ml-1" for="take-students-{{ $educationLevel['shortName'] }}">Take {{ $educationLevel['longName'] }} students</label>
						</div>
					@endif
				@endforeach
			</div>

			<div class="col-12 col-sm-6">
				<label>Email preference</label>
				@foreach(get_education_levels() as $educationLevel)
					@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
						<div class="checkbox mt-1">
							<input type="checkbox" id="email-{{ $educationLevel['shortName'] }}" name="accept_email_{{ $educationLevel['shortName'] }}" class="checkbox-input" @if($view === "edit") @if($user->isSupervisor() && $user->supervisor->getAcceptingEmails($educationLevel['shortName'])) checked @endif @endif>
							<label class="ml-1" for="email-{{ $educationLevel['shortName'] }}">Accept {{ $educationLevel['longName'] }} emails</label>
						</div>
					@endif
				@endforeach
			</div>
		</div>

		<hr>

		<label>Project load</label>
		<div class="row">
			@foreach(get_education_levels() as $educationLevel)
				@if(Auth::user()->isSystemAdmin() || Auth::user()->isAdminOfEducationLevel($educationLevel['shortName']))
					<div class="col-2">
						<div class="form-group">
							<label for="project-load-{{ $educationLevel['shortName'] }}">{{ ucfirst($educationLevel['longName']) }}</label>
							<br>
							<input class="form-control" id="project-load-{{ $educationLevel['shortName'] }}" type="number" name="project_load_{{ $educationLevel['shortName'] }}" min="0" max="255" @if($view === "edit") @if($user->isSupervisor()) value="{{ $user->supervisor->getProjectLoad($educationLevel['shortName']) }}" @endif value="0" @else value="0" @endif>
						</div>
					</div>
				@endif
			@endforeach
		</div>
		@include('forms.partials.error-block', ['name' => 'project_load'])
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
