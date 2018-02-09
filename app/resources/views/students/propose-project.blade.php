@extends('layouts.app')
@section ('content')

<div class="centered width--800">
	
	<div class="card">
		<h1>Purpose Project</h1>
		@include('forms.new-project', ['user_type' => 'student'])
	</div>

	<div class="button-group button-group--horizontal">
		<a class="button button--raised" href="javascript:history.back()">Back</a>
	</div>
</div>
@endsection