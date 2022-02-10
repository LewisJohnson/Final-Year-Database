@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered mw-800 bg-white shadow-sm rounded p-4">
	<h2 class="main-title">Users <small class="text-muted">/ Edit</small></h2>
	@include('forms.user', ['view' => 'edit'])
</div>
@endsection

