@extends('layouts.app')

@section('pageTitle', 'Propose Project')

@section ('content')
<div class="centered mw-800">

	@if(SussexProjects\Mode::getProjectSelectionDate()->gt(\Carbon\Carbon::now()))
		<div class="alert alert-danger" role="alert">
			You may not propose a project until {{ SussexProjects\Mode::getProjectSelectionDate(true) }}.
		</div>
		
		<script>
			$(function() {
				$('.form-field *').prop('disabled', true);
			});
		</script>
	@endif

	<div class="card">
		<h2 class="main-title">Projects <small class="text-muted">/ Propose</small></h2>
		@include('forms.new-project', ['user_type' => 'student'])
	</div>
</div>
@endsection
