@extends('layouts.app')
@section ('content')

<div class="centered mw-800">

	<div class="card">
		<h1>Propose Project</h1>
		@include('forms.new-project', ['user_type' => 'student'])
	</div>

	<div class="button-group margin-children--horizontal">
		<a class="button button--raised" href="javascript:history.back()">Back</a>
	</div>
</div>
@endsection
