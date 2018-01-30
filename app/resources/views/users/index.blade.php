@extends('layouts.app')
@section('content')

<div class="centered width-1200">
	<h1>Login As Another User</h1>
	<p>Select a user, and you will log in as that user, bypassing authentication.</p>

	<div class="section-container section-user-selector">
		<div class="section horizontal card">
			<h2>Supervisors</h2>
			<ol class="order-list-js title-header-list-js" id="supervisorList" sorted="false" style="list-style: none">
				@foreach($supervisors as $supervisor)
					<li>
						<a title="Log in as {{ $supervisor->user->getFullName() }}" href="{{ action('UserController@edit', $supervisor->id) }}">{{ $supervisor->user->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>


		<div class="section horizontal card">
			@if(Session::get('db_type') == 'ug')
				<h2>Undergraduate Students</h2>
			@elseif(Session::get('db_type') == 'masters')
				<h2>Masters Students</h2>
			@endif

			<ol class="order-list-js alpha-header-list-js" id="studentList" sorted="false" style="list-style: none">
				@foreach($students as $student)
					<li>
						<a title="Log in as {{ $student->user->getFullName() }}" href="{{ action('UserController@edit', $student->user->id) }}">{{ $student->user->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>

		<div class="section horizontal card">
			<h2>Staff</h2>
			<ol class="order-list-js alpha-header-list-js" id="staffList" sorted="false" style="list-style: none">
				@foreach($staff as $staffUser)
					<li>
						<a title="Log in as {{ $staffUser->getFullName() }}" href="{{ action('UserController@edit', $staffUser->id) }}">{{ $staffUser->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>
	</div>
</div>
@endsection