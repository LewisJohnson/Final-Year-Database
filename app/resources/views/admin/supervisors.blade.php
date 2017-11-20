@extends('layouts.admin')
@section('content')
<h2>Supervisors</h2>
<p>There are a total of {{ count(App\Supervisor::get()) }} supervisors.</p>
<ul>
@foreach(App\Supervisor::get() as $supervisor)
	<li>
		<a href="mailto:{{ $supervisor->user->email }}">{{ $supervisor->user->first_name }} {{ $supervisor->user->last_name }}</a>
		<p>{{ $supervisor->project_status }}</p>
	</li>
@endforeach
</ul>
@endsection