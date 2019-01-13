@extends('layouts.app')
@section('content')

<div class="centered mw-1200 fancy-page">
	<h1>Login As Another User</h1>
	<p style="text-align: center; margin-bottom: 0px;">Select a user to log in as, this will bypassing authentication.</p>
	<p style="text-align: center; margin-bottom: 25px; margin-top: 5px;"><ins>Please use this feature responsibly.</ins></p>

	<div class="section-container">
		<div class="section horizontal card">
			<h2>Supervisors</h2>
			<ol class="order-list-js last-name-header-list-js list--unstyled list-style--none margin-children--vertical" id="supervisorList" sorted="false">
				@foreach($supervisors as $supervisor)
					<li data-sort-name="{{ $supervisor->user->last_name }}">
						<a title="Log in as {{ $supervisor->user->getFullName() }}" href="{{ action('ProjectAdminController@loginAs', $supervisor->id) }}">{{ $supervisor->user->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>


		<div class="section horizontal card">
			<h2>{{ ucfirst(Session::get('education_level')["longName"]) }} Students</h2>

			<ol class="order-list-js last-name-header-list-js list--unstyled list-style--none margin-children--vertical" id="studentList" sorted="false">
				@foreach($students as $student)
					<li data-sort-name="{{ $student->user->last_name }}">
						<a title="Log in as {{ $student->getName() }}" href="{{ action('ProjectAdminController@loginAs', $student->user->id) }}">{{ $student->getName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>

		<div class="section horizontal card">
			<h2>Staff</h2>
			<ol class="order-list-js last-name-header-list-js list--unstyled list-style--none margin-children--vertical" id="staffList" sorted="false">
				@foreach($staffUsers as $staff)
					<li data-sort-name="{{ $staff->last_name }}">
						<a title="Log in as {{ $staff->getFullName() }}" href="{{ action('ProjectAdminController@loginAs', $staff->id) }}">{{ $staff->getFullName() }}</a>
					</li>
				@endforeach
			</ol>
		</div>
	</div>
</div>
@endsection
