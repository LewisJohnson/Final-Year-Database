@extends('layouts.app')
@section('content')
<div class="centered mw-1000">
	<h1>Amend {{ ucfirst(Session::get('department'))." ".ucfirst(Session::get('education_level')["longName"]) }} Topics</h1>

	<div class="card mt-3">
		<div class="card-body">
			<h3 class="card-title">Add Topic</h3>
			<form id="new-topic-form" class="dt-flex" action="{{ action('TopicController@store') }}" method="POST" accept-charset="utf-8">
				<input name="topic_name" id="topic_name" placeholder="Topic name" spellcheck="true" type="text"></input>
				<button class="btn btn-primary ml-2" type="submit">Add</button>
			</form>
	
			<h3 class="card-title mt-5">Edit Topics</h3>
			<p>Deleting a topic will also remove it from any associated projects.</p>
			<div id="edit-topic-list" class="row">
				@foreach($topics as $topic)
					<div class="col-12 col-md-6 d-flex mt-2" data-topic-id="{{ $topic->id }}" data-original-topic-name="{{ $topic->name }}">
						<input class="flex-grow-1" spellcheck="true" name="name" type="text" value="{{ $topic->name }}"></input>
						<button class="btn border ml-1 border-primary edit-topic">Edit</button>
						<button class="btn border ml-1 border-danger delete-topic">Delete</button>
					</div>
				@endforeach
			</div>
		</div>
	</div>
</div>
@endsection
