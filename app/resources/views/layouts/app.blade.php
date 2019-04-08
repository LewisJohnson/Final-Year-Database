<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
	@include ('partials.html-head')

	<body>
		@include('partials.no-script')
		@include('partials.header')

		@if(Session::get("after_login") != null)
			<script>
				window["showLoginDialog"] = true;
				window["redirectUrl"] = "{{ Session::get('after_login') }}";
			</script>
		@endif

		@if(Auth::check())
			<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
		@else
			@include('auth.login')
		@endif

		<div class="main-content mt-5">
			<div class="container-fluid">
				<div class="row" style="min-height: calc(79vh - 31px);">
					<div class="col-12">
						@yield('content')
					</div>
				</div>

				@include('partials.footer')
			</div>
		</div>

		@include('partials.message')
		<div class="mobile-nav-underlay"></div>
		<div class="underlay"></div>
	</body>
</html>
