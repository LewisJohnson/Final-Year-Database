@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-1000">
	<h2>Programmes <small class="text-muted">/ Amend {{ ucfirst(Session::get('department')) }} Programmes</small></h2>
	
	<div class="alert alert-info mt-3">
		<span>&#128161;</span><span class="ml-2">Programmes are shared between educations levels but are unique to each department</span>
	</div>
	
	<div class="card mt-3">
		<div class="card-body">
			<h3 class="card-title">New Programme</h3>
			<form id="new-programme-form" action="{{ action('ProgrammeController@store') }}" method="POST" accept-charset="utf-8">
				<div class="input-group w-30">
					<input class="form-control" name="programme_name" id="programme_name" placeholder="Programme name" spellcheck="true" type="text">
					<div class="input-group-append">
						<button class="btn btn-outline-primary" type="submit">Add</button>
					</div>
				</div>
			</form>

			<h3 class="card-title mt-5 mb-1">Exisiting Programmes</h3>
			<p class="mt-0 text-muted">Deleting a programme will also remove it from any associated projects.</p>

			<div id="edit-programme-list" class="row">
				@foreach($programmes as $programme)
					<div class="col-12 col-md-6 mt-2 js-programme">
						<div class="input-group" data-programme-id="{{ $programme->id }}" data-original-programme-name="{{ $programme->name }}">
							<input class="form-control" spellcheck="true" name="name" type="text" value="{{ $programme->name }}">
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
