@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered width--1200">
	<h1>Edit Users</h1>
	<p>Select a user to edit or <a href="{{ action('UserController@edit', Auth::user()) }}">edit your account</a>.</p>

	<div class="section-container section-user-selector">
		<div class="section horizontal card">
			<h3>Supervisors</h3>
			<ol class="order-list-js last-name-header-list-js" id="supervisorList" sorted="false" style="list-style: none">
				@foreach($supervisors as $supervisor)
					<li>
						<a title="Edit {{ $supervisor->user->getFullName() }}" href="{{ action('UserController@edit', $supervisor->user) }}">{{ $supervisor->user->getFullName() }}</a>
						<a class="delete-user td-none" data-id="{{ $supervisor->id }}" data-name="{{ $supervisor->user->getFullName() }}" data-is-supervisor="true" href="{{ action('UserController@destroy', $supervisor->id) }}">X</a>
					</li>
				@endforeach
			</ol>
		</div>

		<div class="section horizontal card">
			<h3>{{ ucfirst(Session::get('education_level')["longName"]) }} Students</h3>

			<ol class="order-list-js last-name-header-list-js" id="studentList" sorted="false" style="list-style: none">
				@foreach($students as $student)
					<li>
						<a title="Edit {{ $student->user->getFullName() }}" href="{{ action('UserController@edit', $student->user) }}">{{ $student->user->getFullName() }}</a>
						<a class="delete-user td-none" data-id="{{ $student->id }}" data-name="{{ $student->user->getFullName() }}" data-is-student="true" href="{{ action('UserController@destroy', $student->id) }}">X</a>
					</li>
				@endforeach
			</ol>
		</div>

		<div class="section horizontal card">
			<h3>Staff</h3>
			<ol class="order-list-js last-name-header-list-js" id="staffList" sorted="false" style="list-style: none">
				@foreach($staff as $staffUser)
					<li>
						<a title="Edit {{ $staffUser->getFullName() }}" href="{{ action('UserController@edit', $staffUser) }}">{{ $staffUser->getFullName() }}</a>
						<a class="delete-user td-none" data-id="{{ $staffUser->id }}" data-name="{{ $staffUser->getFullName() }}" href="{{ action('UserController@destroy', $staffUser->id) }}">X</a>
					</li>
				@endforeach

				@if(count($noPrivilegesUsers) > 0)
					<li><hr></li>
					<li><h4>Users without privileges</h4></li>
					@foreach($user as $noPrivilegesUsers)
						<li>
							<a title="Edit {{ $user->getFullName() }}" href="{{ action('UserController@edit', $user) }}">{{ $user->getFullName() }}</a>
							<a class="delete-user td-none" data-id="{{ $noPrivilegesUsers->id }}" data-name="{{ $noPrivilegesUsers->getFullName() }}" href="{{ action('UserController@destroy', $noPrivilegesUsers->id) }}">X</a>
						</li>
					@endforeach
				@endif
			</ol>
		</div>

		@if(Auth::user()->isSystemAdmin())
			<div class="section horizontal card">
				<h3>Administrators</h3>
				<ol class="order-list-js last-name-header-list-js" id="adminList" sorted="false" style="list-style: none">
					@foreach($admins as $admin)
						<li>
							<a title="Edit {{ $admin->getFullName() }}" href="{{ action('UserController@edit', $admin) }}">{{ $admin->getFullName() }}</a>
							<a class="delete-user td-none" data-id="{{ $admin->id }}" data-name="{{ $admin->getFullName() }}" href="{{ action('UserController@destroy', $admin->id) }}">X</a>
						</li>
					@endforeach
				</ol>
			</div>
		@endif
	</div>
</div>
@endsection
