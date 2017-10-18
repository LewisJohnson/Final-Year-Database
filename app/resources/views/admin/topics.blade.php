@extends('layouts.admin')
@section('content')
<h2>Amend Topics</h2>
<p>There are a total of {{ count(App\Topic::all()) }} topics.</p>
<ul class="edit-topic-list">
<li><h4>Add Topic</h4></li>
<li>
	<input spellcheck="true" name="name" type="text"></input>
	<button class="add-topic" type="submit">Add</button>
</li>

<li><h4>Edit Topics</h4></li>

@foreach(App\Topic::get() as $topic)
	<li>
		<input spellcheck="true" name="name" type="text" value="{{ $topic->name }}"></input>
		<button class="edit-topic" data-topic_name="{{ $topic->name }}" type="submit"><p>Edit</p><div class="loader"></div></button>
		<button class="delete-topic" data-topic_name="{{ $topic->name }}">Delete</button>
	</li>
@endforeach
</ul>
@endsection