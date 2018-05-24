@extends('layouts.app')
@section('content')

<div class="centered card width--1000">
	<h1>Amend {{ ucfirst(Session::get('department')) }} Programmes</h1>
	<h3>Add Programme</h3>
	<div>
		<form id="new-programme-form" class="form form--flex form--flex-row" action="/programmes/" method="POST" accept-charset="utf-8">
			<input name="programme_name" id="programme_name" placeholder="Programme name" spellcheck="true" type="text"></input>
			<button class="add-programme button button--raised" type="submit">Add</button>
		</form>
	</div>

	<h3 style="margin-top: 3rem;">Edit Programmes</h3>
	<p>Deleting a programme will also remove it from any associated projects.</p>
	<ul class="edit-programme-list edit-list" sorted="false">
		@foreach($programmes as $programme)
			<li class="programme item" data-programme-id="{{ $programme->id }}" data-original-programme-name="{{ $programme->name }}">
				<input spellcheck="true" name="name" type="text" value="{{ $programme->name }}"></input>
				<button class="button edit-programme">Edit</button>
				<button class="button delete-programme button--danger-text">Delete</button>
			</li>
		@endforeach
	</ul>
</div>
@endsection
