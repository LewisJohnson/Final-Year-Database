@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1200">
	<h1>Edit Users</h1>
	<p>Select a user to edit or <a href="{{ action('UserController@edit', Auth::user()) }}">edit your account</a>.</p>

	<div class="section-container">
		<div class="section horizontal card">
			<h3>Supervisors</h3>
			<ol class="order-list-js last-name-header-list-js list--unstyled list-style--none margin-children--vertical" id="supervisorList" sorted="false" style="list-style: none">
				@foreach($supervisors as $supervisor)
					<li data-sort-name="{{ $supervisor->user->last_name }}">
						<a title="Edit {{ $supervisor->user->getFullName() }}" href="{{ action('UserController@edit', $supervisor->user) }}">{{ $supervisor->user->getFullName() }}</a>
						<a class="delete-user td-none" data-id="{{ $supervisor->id }}" data-name="{{ $supervisor->user->getFullName() }}" data-is-supervisor="true" href="{{ action('UserController@destroy', $supervisor->id) }}">X</a>
					</li>
				@endforeach
			</ol>
		</div>

		<div class="section horizontal card">
			<h3>{{ ucfirst(Session::get('education_level')["longName"]) }} Students</h3>

			<ol class="order-list-js last-name-header-list-js list--unstyled list-style--none margin-children--vertical" id="studentList" sorted="false" style="list-style: none">
				@foreach($students as $student)
					<li data-sort-name="{{ $student->user->last_name }}">
						<a title="Edit {{ $student->user->getFullName() }}" href="{{ action('UserController@edit', $student->user) }}">{{ $student->user->getFullName() }}</a>
						<a class="delete-user td-none" data-id="{{ $student->id }}" data-name="{{ $student->user->getFullName() }}" data-is-student="true" href="{{ action('UserController@destroy', $student->id) }}">X</a>
					</li>
				@endforeach
			</ol>
		</div>

		<div class="section horizontal card">
			<h3>Staff</h3>
			<ol class="order-list-js last-name-header-list-js list--unstyled list-style--none margin-children--vertical" id="staffList" sorted="false" style="list-style: none">
				@foreach($staffUsers as $staff)
					<li data-sort-name="{{ $staff->last_name }}">
						<a title="Edit {{ $staff->getFullName() }}" href="{{ action('UserController@edit', $staff) }}">{{ $staff->getFullName() }}</a>
						<a class="delete-user td-none" data-id="{{ $staff->id }}" data-name="{{ $staff->getFullName() }}" href="{{ action('UserController@destroy', $staff->id) }}">X</a>
					</li>
				@endforeach

				@if(count($noPrivilegesUsers) > 0)
					<li><hr></li>
					<li><h4>Users without privileges</h4></li>
					@foreach($noPrivilegesUsers as $user)
						<li data-sort-name="{{ $user->last_name }}">
							<a title="Edit {{ $user->getFullName() }}" href="{{ action('UserController@edit', $user) }}">{{ $user->getFullName() }}</a>
							<a class="delete-user td-none" data-id="{{ $user->id }}" data-name="{{ $user->getFullName() }}" href="{{ action('UserController@destroy', $user->id) }}">X</a>
						</li>
					@endforeach
				@endif
			</ol>
		</div>

		@if(Auth::user()->isSystemAdmin())
			<div class="section horizontal card">
				<h3>Administrators</h3>
				<ol class="order-list-js last-name-header-list-js list--unstyled list-style--none margin-children--vertical" id="adminList" sorted="false" style="list-style: none">
					@foreach($admins as $admin)
						<li data-sort-name="{{ $admin->last_name }}">
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
