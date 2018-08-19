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
	<link rel="shortcut icon" sizes="16x16" href="{{ asset('favicon.png') }}">

	<!-- Fonts -->
	@yield('fonts')

	<!-- Styles -->
	<link rel="stylesheet" href="{{ asset('css/app.css') }}">
	<link rel="stylesheet" href="{{ asset('css/jquery-confirm.css') }}">

	<!-- Accessibility Style -->
	@if(Cookie::get('accessibility-contrast') === "true") <link rel="stylesheet" href="{{ asset('css/accessible-contrast.css') }}"> @endif
	@if(Cookie::get('accessibility-font') === "true") <link rel="stylesheet" href="{{ asset('css/accessible-font.css') }}"> @endif

	<!-- Scripts -->
	{{-- ONLY CHANGE THE ORDER IF YOU KNOW WHAT YOU'RE DOING --}}
	<script src="{{ asset('js/helpers.js') }}"></script>
	<script src="{{ asset('js/jquery-bundle.js') }}"></script>
	<script src="{{ asset('js/jquery-helpers.js') }}"></script>
	
	@yield('scripts')
	<script src="{{ asset('js/main.js') }}" async></script>
</head>
