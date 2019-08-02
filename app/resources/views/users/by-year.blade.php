@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-800">
	<h1>Students by Year</h1>

	<div class="row mt-3">
		@foreach(SussexProjects\Mode::all() as $mode)
			@php
				$userTable = (new SussexProjects\User())->getTable();
				$studentTable = (new SussexProjects\Student())->getTable();

				$studentsWithThisYear = SussexProjects\Student::join($userTable.' as user', 'user.id', '=', $studentTable.'.id')
						->select($studentTable.'.*')
						->where('user.active_year', $mode->project_year)
						->orderBy('user.last_name', 'asc')
						->get();
			@endphp
					
			<div class="col-6 mt-3 mt-md-0">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">{{ $mode->project_year }}</h5>
								
						<ol class="order-list-js last-name-header-list-js list-unstyled">
							@foreach($studentsWithThisYear as $student)
								<li>
									<a title="Edit {{ $student->user->getFullName() }}" href="{{ action('UserController@edit', $student->user) }}">{{ $student->user->getFullName() }}</a>
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
