@extends('layouts.app')
@section('content')

<div class="centered card width-1000">
<h1>Amend Topics</h1>
<h3>Add Topic</h3>
<div>
	<form id="new-topic-form" class="form form--flex form--flex-row" action="/topics/" method="POST" accept-charset="utf-8">
		<input name="topic_name" id="topic_name" placeholder="Topic name" spellcheck="true" type="text"></input>
		<button class="add-topic button button--raised" type="submit">Add</button>
	</form>
</div>

<h3 style="margin-top: 3rem;">Edit Topics</h3>
<p>Deleting a topic will also remove it from any associated projects.</p>
<ul class="edit-topic-list" id="supervisorList" sorted="false">
	@foreach($topics as $topic)
		<li class="topic" data-topic-id="{{ $topic->id }}" data-original-topic-name="{{ $topic->name }}">
			<input spellcheck="true" name="name" type="text" value="{{ $topic->name }}"></input>
			<button class="button edit-topic">Edit</button>
			<button class="button delete-topic button--danger">Delete</button>
		</li>
	@endforeach
</ul>
</div>
@endsection
