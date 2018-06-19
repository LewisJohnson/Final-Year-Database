@extends('layouts.app')
@section('content')

<div class="centered width--1200">

	@if($view === "edit")
		<h1>Edit Users</h1>
		<p>Select a user to edit.</p>
	@endif
	
	<div class="section-container section-user-selector">
		<div class="section horizontal card">
			<h2>Supervisors</h2>
			<ol class="order-list-js last-name-header-list-js" id="supervisorList" sorted="false" style="list-style: none">
				@foreach($supervisors as $supervisor)
					<li>
						<a title="Edit {{ $supervisor->user->getFullName() }}" href="{{ action('UserController@edit', $supervisor->user) }}">{{ $supervisor->user->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>

		<div class="section horizontal card">
			<h2>{{ ucfirst(Session::get('education_level')["longName"]) }} Students</h2>

			<ol class="order-list-js last-name-header-list-js" id="studentList" sorted="false" style="list-style: none">
				@foreach($students as $student)
					<li>
						<a title="Edit {{ $student->user->getFullName() }}" href="{{ action('UserController@edit', $student->user) }}">{{ $student->user->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>

		<div class="section horizontal card">
			<h2>Staff</h2>
			<ol class="order-list-js last-name-header-list-js" id="staffList" sorted="false" style="list-style: none">
				@foreach($staff as $staffUser)
					<li>
						<a title="Edit {{ $staffUser->getFullName() }}" href="{{ action('UserController@edit', $staffUser) }}">{{ $staffUser->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>

		@if(Auth::user()->isSystemAdmin())
			<div class="section horizontal card">
				<h2>Administrators</h2>
				<ol class="order-list-js last-name-header-list-js" id="adminList" sorted="false" style="list-style: none">
					@foreach($admins as $admin)
						<li>
							<a title="Edit {{ $admin->getFullName() }}" href="{{ action('UserController@edit', $admin) }}">{{ $admin->getFullName() }}</a>
						</li>
					@endforeach
				</ol>
			</div>
		@endif
	</div>
</div>
@endsection
