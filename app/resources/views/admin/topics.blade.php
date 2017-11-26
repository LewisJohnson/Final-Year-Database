@extends('layouts.admin')
@section('content')
<div class="centered card width-1000">
<h1>Amend Topics</h1>
<h3>Add Topic</h3>
	<div style="display: flex;">
	<input style="margin-right: 1rem;" placeholder="Topic name" spellcheck="true" name="name" type="text"></input>
	<button class="add-topic button button--raised" type="submit">Add</button>
</div>

<h3 style="margin-top: 3rem;">Edit Topics</h3>
<p>Deleting a topic will also remove it from any associated projects.</p>
<ul class="edit-topic-list">
@if(Session::get('db_type') == 'ug')
	@foreach(SussexInformaticsProjects\TopicUg::get() as $topic)
		<li class="topic">
			<input spellcheck="true" name="name" type="text" value="{{ $topic->name }}"></input>
			<button class="button edit-topic" data-topic-id="{{ $topic->id }}" type="submit">Edit</button>
			<button class="button button--danger delete-topic" data-topic-id="{{ $topic->id }}">Delete</button>
		</li>
	@endforeach
@else
	@foreach(SussexInformaticsProjects\TopicMasters::get() as $topic)
		<li class="topic">
			<input spellcheck="true" name="name" type="text" value="{{ $topic->name }}"></input>
			<button class="button edit-topic" data-topic-id="{{ $topic->id }}" type="submit">Edit</button>
			<button class="button button--danger delete-topic" data-topic-id="{{ $topic->id }}">Delete</button>
		</li>
	@endforeach
@endif

</ul>
</div>
@endsection