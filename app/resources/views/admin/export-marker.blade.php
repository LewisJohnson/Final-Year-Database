@extends('layouts.app')
@section('content')
<div class="centered width--1200">
	<h1>Export Second Marker Data</h1>

	<form class="form form--flex" action="{{ action('ProjectAdminController@exportSecondMarkerData') }}" method="GET" accept-charset="utf-8">
		{{ csrf_field() }}
		<input type="hidden" name="type" value="csv">
		<div class="form-field">
			<button class="button button--raised">Download CSV</button>
		</div>
	</form>

	<form class="form form--flex" action="{{ action('ProjectAdminController@exportSecondMarkerData') }}" method="GET" accept-charset="utf-8">
		{{ csrf_field() }}
		<input type="hidden" name="type" value="json">
		<div class="form-field">
			<button class="button button--raised">Download JSON</button>
		</div>
	</form>
</div>
@endsection
