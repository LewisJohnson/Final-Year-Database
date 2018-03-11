<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
	@include ('partials.html-head')

	<body>
		@include('partials.no-script')

		@include('partials.header')

		@if(Auth::check())
			<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
		@else
			@include('auth.login')
		@endif

		<div class="main-content">
			@yield('content')
		</div>

		@include('partials.message')
		<div class="mobile-nav-underlay"></div>
		<div class="underlay"></div>
	</body>

	@include('partials.footer')
</html>
