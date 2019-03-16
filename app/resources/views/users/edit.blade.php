@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-800">
	<div class="card">
		<div class="card-header">Edit User</div>
		@include('forms.user', ['view' => 'edit'])
	</div>
	
	<div class="mt-3">
		<a class="btn btn-secondary" href="javascript:history.back()">Back</a>
	</div>
</div>
@endsection

