<!doctype html>
<html lang="{{ app()->getLocale() }}">
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

	@include ('partials.notification')
	@include ('auth.login')
	@include ('auth.change-auth')
</body>
@include ('partials.footer')

@if (App::isLocal())
	@include ('partials.debug')
@endif
</html>
