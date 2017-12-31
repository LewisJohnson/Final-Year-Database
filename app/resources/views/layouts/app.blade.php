<!doctype html>

<html lang="{{ app()->getLocale() }}">

<noscript>
	<style>.main-content, header, footer, nav{display:none !important;}</style>
	{{-- <meta http-equiv="refresh" content="0.0;url=/no-js"> --}}
	<div class="centered width-1000" style="padding: 1rem">
		<h1>Sorry.</h1>
		<p>We're sorry but @lang('messages.official_name') <b>requires</b> JavaScript to work properly. Follow the guide below or go to <a href="https://www.enable-javascript.com/">this website for more.</a></p>

		<iframe src="https://www.enable-javascript.com/" sandbox style="width: 100%; height: 600px"></iframe>
	</div>
</noscript>

@include ('partials.html-head')
<body>
	@if($user = Auth::user())
		@include ('partials.header')
	@else
		@include ('partials.header-guest')
	@endif

	<div class="main-content">
		@yield('content')
	</div>

	@include ('partials.message')
	@include ('auth.login')
	@include ('auth.change-auth')
</body>
@include ('partials.footer')

@if (App::isLocal())
	@include ('partials.debug')
@endif
</html>
