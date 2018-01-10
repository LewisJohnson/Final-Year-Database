@extends('layouts.app')
@section('content')
<div class="centered width-800 card">
<h1>Edit Supervisor Arrangments</h1>
<h2><b>Supervisor:</b> {{ $supervisor->user->getFullName() }}</h2>
<form class="form form--flex" role="form" method="POST" action="/projects">
	{{ csrf_field() }}

	<div class="form-field">
		<label class="hover-label" for="title">Title</label>
		<input maxlength="255" type="text" name="title" id="title" value="{{ $supervisor->title }}" required>
	</div>

	@if(Session::get('db_type') == 'ug')
		<div class="form-field">
			<label class="hover-label" for="description" >Undergraduate Project Load</label>
			<input min="0" type="number" name="description" id="description" required value="{{ $supervisor->project_load_ug }}"></input>
		</div>
		<div class="form-field">
			<div class="checkbox">
				<input class="checkbox-input master-checkbox" id="take_students_ug" type="checkbox" checked="{{ $supervisor->take_students_ug }}">
				<label for="take_students_ug" >Take Undergraduate Students</label>
			</div>
		</div>
    @else
		<div class="form-field">
			<label class="hover-label" for="description" >Masters Project Load</label>
			<input min="0" type="number" name="description" id="description" required value="{{ $supervisor->project_load_masters }}"></input>
		</div>
		<div class="form-field">
			<div class="checkbox">
				<input class="checkbox-input master-checkbox" id="take_students_masters" type="checkbox" checked="{{ $supervisor->take_students_masters }}">
				<label for="take_students_masters" >Take Masters Students</label>
			</div>
		</div>
    @endif

	<div class="form-field">
		<button class="button button--raised button--accent" type="submit" value="Submit">Update</button>
	</div>

</form>

</div>
@endsection
