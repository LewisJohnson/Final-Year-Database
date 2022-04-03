<head>
	@if(isset($exception))
		<title>Error {{ $exception->getStatusCode() }} @if($exception->getMessage() != "")({{ $exception->getMessage() }})@endif - @lang("messages.official_name")</title>
	@else
		<title>@lang("messages.official_name")</title>
	@endif

	<!-- Meta -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<meta name="git-last-commit" content="{{ shell_exec('git log -1') }}">
	<link rel="shortcut icon" sizes="16x16" href="{{ asset('favicon.png') }}">

	<!-- Fonts -->
	@yield('fonts')

	<!-- Styles -->
	<link rel="stylesheet" href="{{ asset('css/app.css') }}">
	<link rel="stylesheet" href="{{ asset('css/jquery-confirm.css') }}">

	@if(preg_match('~MSIE|Internet Explorer~i', @$_SERVER['HTTP_USER_AGENT']) || (strpos(@$_SERVER['HTTP_USER_AGENT'], 'Trident/7.0; rv:11.0') !== false))
		<!-- IE only CSS -->
		<link rel="stylesheet" href="{{ asset('css/ie.css') }}">
	@endif


	<!-- Accessibility Style -->
	@if(Cookie::get('accessibility_contrast') === "true" || (!empty($enable_contrast) && $enable_contrast === "true")) <link rel="stylesheet" href="{{ asset('css/accessible-contrast.css') }}"> @endif
	@if(Cookie::get('accessibility_font') === "true" || (!empty($enable_font) && $enable_font === "true")) <link rel="stylesheet" href="{{ asset('css/accessible-font.css') }}"> @endif
    @if(Cookie::get('accessibility_dark_mode') === "true" || (!empty($enable_dark_mode) && $enable_dark_mode === "true")) <link rel="stylesheet" href="{{ asset('css/accessible-dark-mode.css') }}"> @endif

	<!-- Scripts -->
	{{-- ONLY CHANGE THE ORDER IF YOU KNOW WHAT YOU'RE DOING --}}
	<script src="{{ asset('js/helpers.js') }}"></script>
	<script src="{{ asset('js/jquery-bundle.js') }}"></script>
	<script src="{{ asset('js/jquery-helpers.js') }}"></script>
	<script src="{{ asset('js/main.js') }}"></script>
	
	@yield('scripts')

</head>
