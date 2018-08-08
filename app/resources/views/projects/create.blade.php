@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@section ('content')
<div class="centered width--800">
	<div class="card">
		<h1>Create New Project</h1>
		@include('forms.new-project', ['user_type' => 'supervisor'])
	</div>
	<div class="button-group button-group--horizontal" >
		<a class="button button--raised" href="javascript:history.back()">Back</a>
	</div>
</div>
@endsection
