<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
	@include ('partials.html-head')

	<body>
		@include('partials.no-script')

		@if(Auth::check())
			@include('partials.header')
			<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
		@else
			@include('partials.header-guest')
			@include('auth.login')
		@endif

		@include('auth.change-auth')

		<div class="main-content">
			@yield('content')
		</div>

		@include('partials.message')
		<div class="mobile-nav-underlay"></div>
		<div class="underlay"></div>
	</body>

	@include('partials.footer')
</html>
