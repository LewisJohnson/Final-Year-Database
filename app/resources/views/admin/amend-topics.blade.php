@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1000">
	
	<h2>Topics <small class="text-muted">/ Amend {{ ucfirst(Session::get('department'))." ".ucfirst(get_el_long_name()) }} Topics</small></h2>

	<div class="alert alert-info mt-3">
		<span>&#128161;</span><span class="ml-2">Topics are unique to each department and education level</span>
	</div>
	
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
	
			<h3 class="card-title mt-5 mb-1">Existing Topics</h3>
			<p class="mt-0 text-muted">Deleting a topic will also remove it from any associated projects.</p>

			<div id="edit-topic-list" class="row">
				@foreach($topics as $topic)
					<div class="col-12 col-md-6 mt-2 js-topic">
						<div class="input-group" data-topic-id="{{ $topic->id }}" data-original-topic-name="{{ $topic->name }}">
							<input class="form-control" spellcheck="true" name="name" type="text" value="{{ $topic->name }}">
							<div class="input-group-append">
								<button class="js-edit btn btn-outline-secondary disabled" title="Modify Topic name to edit">Edit</button>
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
