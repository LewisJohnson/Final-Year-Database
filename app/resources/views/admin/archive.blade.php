@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered animated-entrance mw-1000 eoya-container">
	<div class="text-center">
		<h1>End of Year Archive</h1>
		<p class="text-muted">The end of year archive will do the following in a single transaction</p>
	</div>

	<div class="row">
		<div class="col-12 mt-2">
			<div class="bg-primary text-white p-2">
				<span>@include('svg.playlist-edit')</span>
				<span>The string “In [PROJECT YEAR] this project was viewed [VIEW COUNT] times and undertaken by [STUDENT NAME]” will be added to the description of undertaken projects.</span>
			</div>
		</div>

		<div class="col-6 mt-2">
			<div class="bg-primary text-white p-2">
				<span>@include('svg.archive')</span>
				<span>All projects will be set to archived.</span>
			</div>
		</div>

		<div class="col-6 mt-2">
			<div class="bg-danger text-white p-2">
				<span>@include('svg.account-remove')</span>
				<span>All students will be removed from the user table.</span>
			</div>
		</div>

		<div class="col-6 mt-2">
			<div class="bg-danger text-white p-2">
				<span>@include('svg.delete-forever')</span>
				<span>Student proposed projects which we're not accepted will be deleted.</span>
			</div>
		</div>

		<div class="col-6 mt-2">
			<div class="bg-danger text-white p-2">
				<span>@include('svg.delete-forever')</span>
				<span>The student table will be emptied.</span>
			</div>
		</div>

		<div class="col-6 mt-2">
			<div class="bg-danger text-white p-2">
				<span>@include('svg.delete-forever')</span>
				<span>The transactions table will be emptied.</span>
			</div>
		</div>

		<div class="col-12 mt-4">
			<div class="bg-warning p-2">
				<span>@include('svg.fire')</span>
				<span>Be sure to congratulate <b>{{ $mostPopularProject->supervisor->user->getFullName() }}</b> on having the most popular project of the year <b><a href="{{ action('ProjectController@show', $mostPopularProject) }}">{{ $mostPopularProject->title }}</a></b>.</span>
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
