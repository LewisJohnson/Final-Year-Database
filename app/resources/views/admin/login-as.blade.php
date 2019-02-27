@extends('layouts.app')
@section('content')

<div class="centered mw-1200">
	<h1>Login as Another User</h1>
	<div class="d-flex">
		<h5>Select a user to login as, this will bypassing authentication.</h5>
		<p class="ml-auto text-muted">Please use this feature responsibly.</p>
	</div>

	<div class="row mt-3">
		<div class="col-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Supervisors</h5>

					<ol class="order-list-js last-name-header-list-js list-unstyled" id="supervisorList">
						@foreach($supervisors as $supervisor)
							<li data-sort-name="{{ $supervisor->user->last_name }}">
								<a title="Log in as {{ $supervisor->user->getFullName() }}" href="{{ action('ProjectAdminController@loginAs', $supervisor->id) }}">{{ $supervisor->user->getFullName() }}</a>
							</li>
						@endforeach
					</ol>
				</div>
			</div>
		</div>


		<div class="col-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">{{ ucfirst(Session::get('education_level')["longName"]) }} Students</h5>
							
					<ol class="order-list-js last-name-header-list-js list-unstyled" id="studentList">
						@foreach($students as $student)
							<li data-sort-name="{{ $student->user->last_name }}">
								<a title="Log in as {{ $student->getName() }}" href="{{ action('ProjectAdminController@loginAs', $student->user->id) }}">{{ $student->getName() }}</a>
							</li>
						@endforeach
					</ol>
				</div>
			</div>
		</div>

		<div class="col-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Staff</h5>

					<ol class="order-list-js last-name-header-list-js list-unstyled" id="staffList">
						@foreach($staffUsers as $staff)
							<li data-sort-name="{{ $staff->last_name }}">
								<a title="Log in as {{ $staff->getFullName() }}" href="{{ action('ProjectAdminController@loginAs', $staff->id) }}">{{ $staff->getFullName() }}</a>
							</li>
						@endforeach
					</ol>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
