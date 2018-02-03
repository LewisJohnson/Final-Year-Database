<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
	@include ('partials.html-head')

	<body>
		<noscript>
			<style>.main-content, header, footer, nav{display:none !important;}</style>
			<div class="centered width-1000" style="padding: 1rem">
				<h1>Sorry.</h1>
				<p>We're sorry but @lang('messages.official_name') <b>requires</b> JavaScript to work properly. Follow the guide below or go to <a href="https://www.enable-javascript.com/">this website for more.</a></p>
				<iframe src="https://www.enable-javascript.com/" sandbox style="width: 100%; height: 600px"></iframe>
			</div>
		</noscript>
		
		@if(Auth::check())
			@include ('partials.header')
			<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
		@else
			@include ('partials.header-guest')
			@include ('auth.login')
		@endif

		@include ('auth.change-auth')

		<div class="main-content">
			@yield('content')
		</div>

		@include ('partials.message')
		<div class="mobile-nav-underlay"></div>
		<div class="underlay"></div>
	</body>

	@include ('partials.footer')
</html>
