@extends('layouts.admin')
@section('content')
<div class="centered width-800">
<h1>Supervisors</h1>
<h3>Select a supervisor to amend their arrangements.</h3>

<ul class="table-list table-list--margined shadow-2dp">
@foreach(SussexInformaticsProjects\Supervisor::get() as $supervisor)
	<li style="padding: 0;">
		<a style="display: flex; width: 100%; padding: 10px;" href="{{ action('AdminController@supervisorArrangements', $supervisor->id)}}">
			<p>{{ $supervisor->user->getFullName() }}</p>
		<a>
	</li>
@endforeach
</ul>
</div>
@endsection