@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@php
	$usersWithYear1970 = \SussexProjects\User::where('active_year', '1970');
@endphp

@section('content')
<div class="centered animated-entrance mw-1000 eoya-container">
	<div class="text-center">
		<h1>End of Year Archive</h1>
		<p class="text-muted">The end of year archive will do the following in a single transaction</p>
	</div>

	<div class="row">
		<div class="col-12">
			<h5>Most Popular Project</h5>
			<div class="border border-warning p-2">
				<span class="svg-sm">@include('svg.fire')</span>
				<span>Be sure to congratulate <b>{{ $mostPopularProject->supervisor->user->getFullName() }}</b> on having the most popular project of the year <b><a href="{{ action('ProjectController@show', $mostPopularProject) }}">{{ $mostPopularProject->title }}</a></b> with <b>{{ $mostPopularProject->view_count }}</b> views!.</span>
			</div>
		</div>

		<div class="col-6 mt-4">
			<h5>Projects</h5>
			<div class="border border-primary p-2">
				<span class="svg-sm">@include('svg.playlist-edit')</span>
				<span>The text “In [PROJECT YEAR] this project was viewed [VIEW COUNT] times and undertaken by [STUDENT NAME]” will be added to the description of projects.</span>
			</div>

			<div class="border border-primary p-2 mt-2">
				<span class="svg-sm">@include('svg.archive')</span>
				<span>All projects will be set to archived.</span>
			</div>

			<h5 class="mt-3">Users</h5>
			<div class="border border-primary p-2 mt-2">
				<span class="svg-sm">@include('svg.account-remove')</span>
				<span>Students with un-finalised project evaluations will be kept.</span>
			</div>
		</div>

		<div class="col-6 mt-4">
			<h5>Projects</h5>
			<div class="border border-danger p-2 mt-2">
				<span class="svg-sm">@include('svg.delete-forever')</span>
				<span>Student proposed projects which we're not accepted will be deleted.</span>
			</div>

			<h5 class="mt-3">Users</h5>
			<div class="border border-danger p-2">
				<span class="svg-sm">@include('svg.account-remove')</span>
				<span>Students without projects will be deleted.</span>
			</div>

			<div class="border border-danger p-2 mt-2">
				<span class="svg-sm">@include('svg.account-remove')</span>
				<span>Students with finalised project evaluations will be deleted.</span>
			</div>

			<h5 class="mt-3">Transactions</h5>
			<div class="border border-danger p-2 mt-2">
				<span class="svg-sm">@include('svg.delete-forever')</span>
				<span>The transactions table will be emptied.</span>
			</div>
		</div>
	</div>

	<div class="text-right mt-3">
		<form id="endOfYearArchive" action="{{ action('ProjectAdminController@archive')}}" method="POST" accept-charset="utf-8">
			{{ csrf_field() }}
			<button title="Start archiving" type="submit" class="btn btn-danger">Archive</button>
		</form>
	</div>
</div>
@endsection
