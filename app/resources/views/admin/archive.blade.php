@extends('layouts.app')

@section('scripts')
	<script src="{{ asset('js/views/admin.js') }}"></script>
@endsection

@section('content')
	<div class="centered card width--1000 eoya-container">
		<h1>End of Year Archive</h1>
		<p>The end of year archive will do the following in a single transaction;</p>

		<ul>
			<li>Add “This student was undertaken by [STUDENT NAME]” to project description.</li>
			<li>Set all projects status to archived.</li>
			<li>Empty the student tables.</li>
			<li>Empty the transaction tables.</li>
			<li>Remove all students from the user table.</li>
		</ul>

		<form id="endOfYearArchive" action="{{ action('AdminController@archive')}}" method="POST" accept-charset="utf-8">
			{{ csrf_field() }}
			<button title="Start archiving" type="submit" class="button button--raised button--danger">Archive</button>
		</form>
	</div>
@endsection
