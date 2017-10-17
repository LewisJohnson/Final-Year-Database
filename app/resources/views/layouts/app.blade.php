<!doctype html>
<html lang="{{ app()->getLocale() }}">
@include ('partials.html-head')
<body>
	@if (App::isLocal())
		@include ('partials.debug')
	@endif
	@include ('partials.header')
    @yield('content')
    @include ('partials.notification')
    <footer>

	</footer>
</body>

</html>
