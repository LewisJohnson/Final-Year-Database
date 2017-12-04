@extends('layouts.supervisor')
@section ('content')

<div class="centered width-800 card">
	<h1>Create New Project</h1>
		@include('forms.new-project', ['user_type' => 'supervisor'])
	</div>

	<a href="/projects" title="">Back</a>
@endsection