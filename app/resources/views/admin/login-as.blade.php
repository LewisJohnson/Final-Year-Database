@extends('layouts.admin')
@section('content')

<div class="centered width-1200">
<h1>Login As Another User</h1>

<div class="section-container">
<div class="section horizontal card">
	<h3>Supervisors</h3>
	<ul style="list-style: none">
		@foreach(App\User::Where('access_type', 'supervisor')->get() as $user)
			<li>
				<a href="{{ action('AdminController@loginAs', $user->id) }}">{{ $user->getFullName() }}</a>
			</li>
		@endforeach
	</ul>
</div>


<div class="section horizontal card">
	@if(Session::get('db_type') == 'ug')
		<h3>Undergraduate Students</h3>
	@else
		<h3>Masters Students</h3>
	@endif
	
	<ul style="list-style: none">
		@if(Session::get('db_type') == 'ug')
			@foreach(App\StudentUg::all() as $student)
				<li>
					<a href="{{ action('AdminController@loginAs', $student->user->id) }}">{{ $student->user->getFullName() }}</a>
				</li>
			@endforeach
		@else
			@foreach(App\StudentMasters::all() as $student)
				<li>
					<a href="{{ action('AdminController@loginAs', $student->user->id) }}">{{ $student->user->getFullName() }}</a>
				</li>
			@endforeach
		@endif

	</ul>
</div>

<div class="section horizontal card">
	<h3>Staff</h3>
	<ul style="list-style: none">
		@foreach(App\User::Where('access_type', 'staff')->get() as $user)
			<li>
				<a href="{{ action('AdminController@loginAs', $user->id) }}">{{ $user->getFullName() }}</a>
			</li>
		@endforeach
	</ul>
</div>
</div>
@endsection