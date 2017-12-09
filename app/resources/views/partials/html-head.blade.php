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
	<script src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
	<script src="{{ asset('js/main.js') }}"></script>
	<script src="{{ asset('js/forms.js') }}" async></script>
	<script src="{{ asset('js/data-table.js') }}" async></script>
	<script src="{{ asset('js/dialog.js') }}" async></script>
	
	@yield('scripts')

</head>