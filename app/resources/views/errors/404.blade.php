@extends('layouts.error')
@section('content')

<div class="centered width--800 flex flex--row flex--wrap tea-error">
	@include('svg.help')
	<div>
		<h1>Error 404 - That’s an error.</h1>

		@if(empty($_SERVER['REQUEST_URI']))
			<p>We couldn't find this page.</p>
		@else
			<p>You wanted {{ $_SERVER['REQUEST_URI'] }}, we gave you nothing. <ins>Sorry about that.</ins></p>
		@endif
	</div>
</div>
@endsection
