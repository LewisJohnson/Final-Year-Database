<!doctype html>
<html lang="{{ app()->getLocale() }}">

@include ('partials.html-head')
<body>
	@include ('partials.header')
    @yield('content')
    @include ('partials.notification')
</body>
</html>
