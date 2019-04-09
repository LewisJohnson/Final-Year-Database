@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1600">
	<h1>Edit Users</h1>
	<h5>Select a user to edit or <a href="{{ action('UserController@edit', Auth::user()) }}">edit your account</a>.</h5>

	<div class="row mt-3">
		<div class="col-12 mt-3 mt-md-0 @if(Auth::user()->isSystemAdmin()) col-md-3 @else col-md-4 @endif">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Supervisors</h5>

					<ol class="order-list-js last-name-header-list-js list-unstyled" id="supervisorList">
						@foreach($supervisors as $supervisor)
							<li data-sort-name="{{ $supervisor->user->last_name }}">
								<a title="Edit {{ $supervisor->user->getFullName() }}" href="{{ action('UserController@edit', $supervisor->user) }}">{{ $supervisor->user->getFullName() }}</a>
								<a class="delete-user text-decoration-none" data-id="{{ $supervisor->id }}" data-name="{{ $supervisor->user->getFullName() }}" data-is-supervisor="true" href="{{ action('UserController@destroy', $supervisor->id) }}">X</a>
							</li>
						@endforeach
					</ol>
				</div>
			</div>
		</div>

		<div class="col-12 mt-3 mt-md-0 @if(Auth::user()->isSystemAdmin()) col-md-3 @else col-md-4 @endif">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">{{ ucfirst(Session::get('education_level')["longName"]) }} Students</h5>
							
					<ol class="order-list-js last-name-header-list-js list-unstyled" id="studentList">
						@foreach($students as $student)
							<li data-sort-name="{{ $student->user->last_name }}">
								<a title="Edit {{ $student->user->getFullName() }}" href="{{ action('UserController@edit', $student->user) }}">{{ $student->user->getFullName() }}</a>
								<a class="delete-user text-decoration-none" data-id="{{ $student->id }}" data-name="{{ $student->user->getFullName() }}" data-is-student="true" href="{{ action('UserController@destroy', $student->id) }}">X</a>
							</li>
						@endforeach
					</ol>
				</div>
			</div>
		</div>

		<div class="col-12 mt-3 mt-md-0 @if(Auth::user()->isSystemAdmin()) col-md-3 @else col-md-4 @endif">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Staff</h5>
					<ol class="order-list-js last-name-header-list-js list-unstyled" id="staffList">
						@foreach($staffUsers as $staff)
							<li data-sort-name="{{ $staff->last_name }}">
								<a title="Edit {{ $staff->getFullName() }}" href="{{ action('UserController@edit', $staff) }}">{{ $staff->getFullName() }}</a>
								<a class="delete-user text-decoration-none" data-id="{{ $staff->id }}" data-name="{{ $staff->getFullName() }}" href="{{ action('UserController@destroy', $staff->id) }}">X</a>
							</li>
						@endforeach
					</ol>

					@if(count($externalMarkers) > 0)
						<h5 class="card-title">External Markers</h5>
						<ol class="order-list-js last-name-header-list-js list-unstyled" id="externalList">
							@foreach($externalMarkers as $user)
								<li data-sort-name="{{ $user->last_name }}">
									<a title="Edit {{ $user->getFullName() }}" href="{{ action('UserController@edit', $user) }}">{{ $user->getFullName() }}</a>
									<a class="delete-user text-decoration-none" data-id="{{ $user->id }}" data-name="{{ $user->getFullName() }}" href="{{ action('UserController@destroy', $user->id) }}">X</a>
								</li>
							@endforeach
						</ol>
					@endif

					@if(count($noPrivilegesUsers) > 0)
						<h5 class="card-title">Users without privileges</h5>
						<ol class="order-list-js last-name-header-list-js list-unstyled" id="sansPrivList">
							@foreach($noPrivilegesUsers as $user)
								<li data-sort-name="{{ $user->last_name }}">
									<a title="Edit {{ $user->getFullName() }}" href="{{ action('UserController@edit', $user) }}">{{ $user->getFullName() }}</a>
									<a class="delete-user text-decoration-none" data-id="{{ $user->id }}" data-name="{{ $user->getFullName() }}" href="{{ action('UserController@destroy', $user->id) }}">X</a>
								</li>
							@endforeach
						</ol>
					@endif
				</div>
			</div>
		</div>

		@if(Auth::user()->isSystemAdmin())
			<div class="col-12 col-md-3 mt-3 mt-md-0">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Administrators</h5>
						<ol class="order-list-js last-name-header-list-js list-unstyled" id="adminList">
							@foreach($admins as $admin)
								<li data-sort-name="{{ $admin->last_name }}">
									<a title="Edit {{ $admin->getFullName() }}" href="{{ action('UserController@edit', $admin) }}">{{ $admin->getFullName() }}</a>
									<a class="delete-user text-decoration-none" data-id="{{ $admin->id }}" data-name="{{ $admin->getFullName() }}" href="{{ action('UserController@destroy', $admin->id) }}">X</a>
								</li>
							@endforeach
						</ol>
					</div>
				</div>
			</div>
		@endif
	</div>
</div>
@endsection
