@extends('layouts.app')
@section ('content')

<div class="centered width-800 card">
	<h1>Purpose Project</h1>
		@include('forms.new-project', ['user_type' => 'student'])
	</div>

	<a href="/projects" title="">Back</a>
@endsection