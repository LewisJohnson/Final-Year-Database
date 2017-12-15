<head>
	<title>Final Year Project Database</title>
	
	<!-- Meta -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	
	<!-- Fonts -->
	@yield('fonts')
	
	<!-- Styles -->
	<link rel="stylesheet" href="{{ asset('css/app.css') }}">
	@yield('styles')
	
	<!-- Scripts -->
	<script src="{{ asset('js/jquery-3.2.1.min.js') }}"></script>
	<script src="{{ asset('js/jquery.floatThead.min.js') }}"></script>
	<script src="{{ asset('js/draggable.js') }}"></script>
	<script src="{{ asset('js/swappable.js') }}"></script>
	<script src="{{ asset('js/main.js') }}" async></script>
	
	@yield('scripts')

</head>