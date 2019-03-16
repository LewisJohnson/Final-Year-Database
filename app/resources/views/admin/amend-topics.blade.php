@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1000">
	<h1>Amend {{ ucfirst(Session::get('department'))." ".ucfirst(Session::get('education_level')["longName"]) }} Topics</h1>
	<h5>Topics are unqiue to each department and education level.</h5>

	<div class="card mt-3">
		<div class="card-body">
			<h3 class="card-title">New Topic</h3>
			<form id="new-topic-form" action="{{ action('TopicController@store') }}" method="POST" accept-charset="utf-8">
				<div class="input-group w-30">
					<input class="form-control" name="topic_name" id="topic_name" placeholder="Topic name" spellcheck="true" type="text">
					<div class="input-group-append">
						<button class="btn btn-outline-primary" type="submit">Add</button>
					</div>
				</div>
			</form>
	
			<h3 class="card-title mt-5 mb-1">Exisiting Topics</h3>
			<p class="mt-0 text-muted">Deleting a topic will also remove it from any associated projects.</p>

			<div id="edit-topic-list" class="row">
				@foreach($topics as $topic)
					<div class="col-12 col-md-6 mt-2 js-topic">
						<div class="input-group" data-topic-id="{{ $topic->id }}" data-original-topic-name="{{ $topic->name }}">
							<input class="form-control" spellcheck="true" name="name" type="text" value="{{ $topic->name }}">
							<div class="input-group-append">
								<button class="js-edit btn btn-outline-secondary disabled">Edit</button>
								<button class="js-delete btn btn-outline-danger">Delete</button>
							</div>
						</div>
					</div>
				@endforeach
			</div>
		</div>
	</div>
</div>
@endsection
