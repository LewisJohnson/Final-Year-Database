@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1600">
	<h1>Users</h1>

	<div class="row mt-3">
		@foreach(SussexProjects\Mode::all() as $mode)
			@php
				$usersWithThisYear = SussexProjects\User::where('active_year', $mode->project_year)->get();
			@endphp
					
			<div class="col-3 mt-3 mt-md-0">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">{{ $mode->project_year }}</h5>
								
						<ol class="order-list-js last-name-header-list-js list-unstyled">
							@foreach($usersWithThisYear as $user)
								<li data-sort-name="{{ $user->last_name }}">
									<a title="Edit {{ $user->getFullName() }}" href="{{ action('UserController@edit', $user) }}">{{ $user->getFullName() }}</a>
								</li>
							@endforeach
						</ol>
					</div>
				</div>
			</div>
		@endforeach
	</div>
</div>
@endsection
