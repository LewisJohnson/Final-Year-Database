@extends('layouts.app')
@section('pageTitle', 'Create Project')

@section('scripts')
	<script src="{{ asset('js/views/supervisor.js') }}"></script>
@endsection

@section ('content')
<div class="centered mw-800">
	<div class="card">
		<h2 class="main-title">Projects <small class="text-muted">/ Create</small></h2>
		@include('forms.new-project', ['user_type' => 'supervisor'])
	</div>
</div>
@endsection
