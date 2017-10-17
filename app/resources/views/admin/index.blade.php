@extends('layouts.admin')
@section('content')
<h2>Administrator Hub</h2>
<ul>
	<li><a href="/admin/students">Edit Students</a></li>
	<li><a href="/admin/supervisors">Edit Supervisor</a></li>
	<li><a href="/admin/topics">Edit Topics</a></li>
	<li><a href="/admin/login-as">Log in as another user</a></li>
</ul>
@endsection