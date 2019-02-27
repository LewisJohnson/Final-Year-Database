@extends('layouts.app')
@section('content')
<div class="centered mw-1000">
	<h1>Amend {{ ucfirst(Session::get('department')) }} Programmes</h1>
	<h5>Programmes are shared between undergraduate and postgraduate students.</h5>
	
	<div class="card mt-3">
		<div class="card-body">
			<h3 class="card-title">Add Programme</h3>
			<form id="new-programme-form" class="d-flex" action="{{ action('ProgrammeController@store') }}" method="POST" accept-charset="utf-8">
				<input name="programme_name" id="programme_name" placeholder="Programme name" spellcheck="true" type="text"></input>
				<button class="btn btn-primary ml-2" type="submit">Add</button>
			</form>

			<h3 class="card-title mt-5">Edit Programmes</h3>
			<p>Deleting a programme will also remove it from any associated projects.</p>
			<div id="edit-programme-list" class="row">
				@foreach($programmes as $programme)
					<div class="col-12 col-md-6 d-flex mt-2" data-programme-id="{{ $programme->id }}" data-original-programme-name="{{ $programme->name }}">
						<input class="flex-grow-1" spellcheck="true" name="name" type="text" value="{{ $programme->name }}"></input>
						<button class="btn border ml-1 border-primary edit-programme">Edit</button>
						<button class="btn border ml-1 border-danger delete-programme">Delete</button>
					</div>
				@endforeach
			</div>
		</div>
	</div>
</div>
@endsection
