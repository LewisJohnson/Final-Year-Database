@extends('layouts.admin')
@section('content')
@php($user = Auth::user())
<h2>Undergraduate Administrator Hub</h2>
<ul>
	<li><a href="/admin/user/create">New User</a></li>
	<li><a href="/admin/students/import">Import Students</a></li>
	<hr>
	<li><a href="/admin/students">View/Edit Students</a></li>
	<li><a href="/admin/supervisors">View/Edit Supervisors</a></li>
	<li><a href="/admin/login-as">Log in as another user</a></li>
	<hr>
	<li><a href="/admin/topics">View/Edit Topics</a></li>
	<hr>
	<li><a href="/admin/parameters">Change global parameters</a></li>
</ul>
<div>
	<h2>Users</h2>
	<p>A list of all users on the system.</p>
	<ul>
		@foreach(App\User::all() as $user)
			<li><a href="{{ action('UserController@show', $user) }}">{{ $user->getFullName() }}</a></li>
		@endforeach
	</ul>
</div>

@endsection