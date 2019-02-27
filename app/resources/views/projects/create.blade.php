@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@section ('content')
<div class="centered mw-800">
	<div class="card">
		<div class="card-header">Create New Project</div>
		@include('forms.new-project', ['user_type' => 'supervisor'])
	</div>
	
	<div class="mt-3">
		<a class="btn btn-secondary" href="javascript:history.back()">Back</a>
	</div>
</div>
@endsection
