@extends('layouts.admin')
@section('content')
<div class="centered width-800 card">
<h2>Supervisors</h2>
<p>There are a total of {{ count(SussexInformaticsProjects\Supervisor::get()) }} supervisors.</p>
<ul style="list-style: none;">
@foreach(SussexInformaticsProjects\Supervisor::get() as $supervisor)
	<li>
		<a href="/admin/supervisors/arrangements/{{ $supervisor->user->id }}">{{ $supervisor->user->getFullName() }}<a>
		<p>{{ $supervisor->project_status }}</p>
	</li>
@endforeach
</ul>
</div>
@endsection