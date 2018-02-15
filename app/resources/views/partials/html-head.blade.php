<head>
	@if(isset($exception))
		<title>Error {{ $exception->getStatusCode() }} ({{ $exception->getMessage() }})</title>
	@else
		<title>@lang("messages.official_name") - @yield('title')</title>
	@endif

	<!-- Meta -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<link rel="icon" sizes="192x192" href="icon.png">

	<!-- Web App -->
	<meta name="theme-color" content="@lang('web-app.theme_color')">
	<link rel="manifest" href="/manifest.json">

	<!-- Apple -->
	<link rel="apple-touch-startup-image" href="icon.png">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<link rel="apple-touch-icon" href="touch-icon-iphone.png">
	<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
	<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
	<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">

	<!-- Microsoft -->
	<meta name="msapplication-square70x70logo" content="icon_smalltile.png">
	<meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
	<meta name="msapplication-square310x310logo" content="icon_largetile.png">
	<meta name="msapplication-wide310x150logo" content="icon_widetile.png">

	<!-- Fonts -->
	@yield('fonts')

	<!-- Styles -->
	<link rel="stylesheet" href="{{ asset('css/app.css') }}">
	<link rel="stylesheet" href="{{ asset('css/jquery-confirm.css') }}">

	<!-- Accessibility Style -->
	@if(Cookie::get('highContrast') === "true") <link rel="stylesheet" href="{{ asset('css/accessible-contrast.css') }}"> @endif
	@if(Cookie::get('largeFont') === "true") <link rel="stylesheet" href="{{ asset('css/accessible-font.css') }}"> @endif

	<!-- Scripts -->
	{{-- ONLY CHANGE THE ORDER IF YOU KNOW WHAT YOU'RE DOING --}}
	<script src="{{ asset('js/helpers.js') }}"></script>
	<script src="{{ asset('js/jquery-bundle.js') }}"></script>
	<script src="{{ asset('js/jquery-helpers.js') }}"></script>
	
	@yield('scripts')
	<script src="{{ asset('js/main.js') }}" async></script>

</head>
