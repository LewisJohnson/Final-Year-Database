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
</div>
@endsection

