@extends('layouts.app')
@section('content')

<div class="centered width--1200 fancy-page">
	<h1>Login As Another User</h1>
	<p style="text-align: center; margin-bottom: 0px;">Select a user to log in as, this will bypassing authentication.</p>
	<p style="text-align: center; margin-bottom: 25px; margin-top: 5px;"><ins>Please use this feature responsibly.</ins></p>

	<div class="section-container section-user-selector">
		<div class="section horizontal card">
			<h2>Supervisors</h2>
			<ol class="order-list-js last-name-header-list-js" id="supervisorList" sorted="false" style="list-style: none">
				@foreach($supervisors as $supervisor)
					<li>
						<a title="Log in as {{ $supervisor->user->getFullName() }}" href="{{ action('ProjectAdminController@loginAs', $supervisor->id) }}">{{ $supervisor->user->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>


		<div class="section horizontal card">
			<h2>{{ ucfirst(Session::get('education_level')["longName"]) }} Students</h2>

			<ol class="order-list-js last-name-header-list-js" id="studentList" sorted="false" style="list-style: none">
				@foreach($students as $student)
					<li>
						<a title="Log in as {{ $student->getName() }}" href="{{ action('ProjectAdminController@loginAs', $student->user->id) }}">{{ $student->getName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>

		<div class="section horizontal card">
			<h2>Staff</h2>
			<ol class="order-list-js last-name-header-list-js" id="staffList" sorted="false" style="list-style: none">
				@foreach($staff as $staffUser)
					<li>
						<a title="Log in as {{ $staffUser->getFullName() }}" href="{{ action('ProjectAdminController@loginAs', $staffUser->id) }}">{{ $staffUser->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>
	</div>
</div>
@endsection
