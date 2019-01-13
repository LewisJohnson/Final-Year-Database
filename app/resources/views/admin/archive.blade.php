@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
<div class="centered animated-entrance fancy-page mw-1000 eoya-container">
	<h1>End of Year Archive</h1>
	<p class="subtitle">The end of year archive will do the following in a single transaction</p>

	<div>
		<ul class="flex flex--row flex--wrap archive-list">
			<li class="flex--full archive-blue">
				<div class="icon">
					@include('svg.playlist-edit')
					<p>The string “In [PROJECT YEAR] this project was viewed [VIEW COUNT] times and undertaken by [STUDENT NAME]” will be added to the description of undertaken projects.</p>
				</div>
			</li>

			<li class="archive-blue">
				<div class="icon">
					@include('svg.archive')
					<p>All projects will be set to archived.</p>
				</div>
			</li>

			<li class="archive-blue">
				<div class="icon">
					@include('svg.eye')
					<p>All projects will have their view count set to zero.</p>
				</div>
			</li>

			<li class="archive-red">
				<div class="icon">
					@include('svg.account-remove')
					<p>All students will be removed from the user table.</p>
				</div>
			</li>

			<li class="archive-red">
				<div class="icon">
					@include('svg.delete-forever')
					<p>Student proposed projects will be deleted.</p>
				</div>
			</li>

			<li class="archive-red">
				<div class="icon">
					@include('svg.delete-forever')
					<p>The student table will be emptied.</p>
				</div>
			</li>

			<li class="archive-red">
				<div class="icon">
					@include('svg.delete-forever')
					<p>The transactions table will be emptied.</p>
				</div>
			</li>

			<li class="flex--full">
				<div class="icon">
					@include('svg.fire')
					<p>Be sure to congratulate <b>{{ $mostPopularProject->supervisor->user->getFullName() }}</b> on having the most popular project of the year <b><a href="{{ action('ProjectController@show', $mostPopularProject) }}">{{ $mostPopularProject->title }}</a></b>.</p>
				</div>
			</li>
		</ul>
	</div>

	<div class="button-group margin-children--horizontal ">
		<a class="button button--raised" href="javascript:history.back()">Back</a>
		<form id="endOfYearArchive" action="{{ action('ProjectAdminController@archive')}}" method="POST" accept-charset="utf-8">
			{{ csrf_field() }}
			<button title="Start archiving" type="submit" class="button button--raised button--danger">Archive</button>
		</form>
	</div>
</div>
@endsection
