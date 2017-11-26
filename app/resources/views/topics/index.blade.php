@extends('layouts.app')
@section ('content')
<div class="centered width-800">
<h1>Topics</h1>
<h3>Select a topic to browse projects.</h3>
<ul class="table-list table-list--margined shadow-2dp">
	<li>
		<h3>Topic</h3>
		<h3>Available Projects</h3>
	</li>
	@foreach($topics as $topic)
	@if($topic->amountOfProjectsOnOffer() > 0)
		<li style="padding: 0;">
			<a style="display: flex; width: 100%; padding: 10px;" href="{{ action('ProjectController@byTopic', $topic->id)}}">
				<p>{{ $topic->name }}</p>
				<p style="margin: auto; margin-right: 0;">{{ $topic->amountOfProjectsOnOffer() }}</p>
			</a>
		</li>
	@endif
	@endforeach
</ul>
</div>
@endsection