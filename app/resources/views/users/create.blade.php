@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
	<div class="centered mw-800">
		<div class="card">
			<div class="card-header">Create New User</div>
			@include('forms.user', ['view' => 'new'])
		</div>
		
		<div class="mt-3">
			<a class="btn btn-secondary" href="javascript:history.back()">Back</a>
		</div>
	</div>
@endsection
