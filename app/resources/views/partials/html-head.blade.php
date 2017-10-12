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
    <script
    src="https://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" crossorigin="anonymous"></script>
    <script src="{{ asset('js/main.js') }}" type="text/javascript" charset="utf-8"></script>
    <script src="{{ asset('js/forms.js') }}" type="text/javascript" charset="utf-8" async defer></script>
    @yield('scripts')

</head>