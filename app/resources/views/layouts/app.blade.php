<!doctype html>
<html lang="{{ app()->getLocale() }}">
@include ('partials.html-head')
<body>
	@if($user = Auth::user())
		@if($user->isUgAdmin() || $user->isUgStudent())
			@include ('partials.ug.header')
		@elseif($user->isMastersAdmin() || $user->isMastersStudent())
			@include ('partials.masters.header')
		@endif
	@else
		@include ('partials.header')
	@endif
	<div class="content">
		@yield('content')
	</div>

	@include ('partials.notification')
	@include ('auth.login')
</body>
@include ('partials.footer')

@if (App::isLocal())
	@include ('partials.debug')
@endif
</html>
