@extends('layouts.error')
@section('content')

<style>
	header{ background: #bf0000 !important; }
	nav, footer{ background: #a70101 !important; }
</style>

<div class="centered mw-800">
	<div>
		<div class="d-flex">
			<div class="svg-md">
				@include('svg.help')
			</div>

			<h1 class="ml-2">Error 404 - That’s an error.</h1>
		</div>

		@if(empty($_SERVER['REQUEST_URI']))
			<p class="pt-3">We couldn't find this page.</p>
		@else
			<p class="pt-3">You wanted {{ substr($_SERVER['REQUEST_URI'], 40, 100) }}..., but we couldn't find it. <ins>Sorry about that.</ins></p>
		@endif
	</div>
</div>
@endsection
