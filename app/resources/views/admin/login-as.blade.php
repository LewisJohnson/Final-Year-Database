@extends('layouts.app')
@section('content')

<div class="centered mw-1200">
	
	<h2>Login <small class="text-muted">/ Login as Another User</small></h2>
	<div class="alert alert-info mt-3 d-flex">
		<span>&#128161;</span><span class="ml-2">Select a user to login as, this will bypassing authentication</span>
		<span class="ml-auto text-muted">Please use this feature responsibly.</span>
	</div>

	<div class="row mt-3">
		<div class="col-12 mt-2 mt-md-0 col-sm-6 col-md-4">
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


		<div class="col-12 mt-2 mt-md-0 col-sm-6 col-md-4">
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

		<div class="col-12 mt-2 mt-md-0 col-sm-6 col-md-4">
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

					@if(count($externalMarkers) > 0)
						<h5 class="card-title">External Markers</h5>
						<ol class="order-list-js last-name-header-list-js list-unstyled" id="externalList">
							@foreach($externalMarkers as $user)
								<li data-sort-name="{{ $user->last_name }}">
									<a title="Log in as {{ $user->getFullName() }}" href="{{ action('ProjectAdminController@loginAs', $user->id) }}">{{ $user->getFullName() }}</a>
								</li>
							@endforeach
						</ol>
					@endif

					@if(count($noPrivilegesUsers) > 0)
						<h5 class="card-title">Users without privileges</h5>
						<ol class="order-list-js last-name-header-list-js list-unstyled" id="sansPrivList">
							@foreach($noPrivilegesUsers as $user)
								<li data-sort-name="{{ $user->last_name }}">
									<a title="Log in as {{ $user->getFullName() }}" href="{{ action('ProjectAdminController@loginAs', $user->id) }}">{{ $user->getFullName() }}</a>
								</li>
							@endforeach
						</ol>
					@endif
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
