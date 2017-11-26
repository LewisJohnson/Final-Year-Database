@extends('layouts.admin')
@section('content')
<div class="centered width-800">
<h1>Supervisors</h1>
<h3>Select a supervisor to see their projects.</h3>

<ul class="table-list table-list--margined shadow-2dp">
	<li>
		<h3 style="flex-basis: 175px">Supervisor</h3>
		<h3 style="flex-basis: 300px; flex-grow: 1;">Available Projects</h3>
	</li>
	@foreach($supervisors as $supervisor)
		@if($supervisor->amountOfProjectsOnOffer() > 0)
		<li style="padding: 0;">
			<a style="display: flex; width: 100%; padding: 10px;" href="{{ action('ProjectController@bySupervisor', $supervisor->id)}}">
				<p>{{ $supervisor->user->getFullName() }}</p>
				<p style="margin: auto; margin-right: 0;">{{ $supervisor->amountOfProjectsOnOffer() }}</p>
			</a>
		</li>
		@endif
	@endforeach
</ul>
</div>
@endsection