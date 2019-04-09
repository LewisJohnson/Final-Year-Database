@extends('layouts.error')
@section('content')

<div class="centered mw-600">
	<div class="d-flex">
		<div class="svg-md">
			@include('svg.spanner')
		</div>

		<h1 class="ml-2">Maintenance Mode</h1>
	</div>

	<p class="pt-3">
		The system is currently down for routine maintenance.<br>
		Maintenance generally takes less than an hour to complete, so check back soon.
	</p>
</div>
@endsection
