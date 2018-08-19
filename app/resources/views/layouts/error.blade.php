<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
	@include ('partials.html-head')

	<style>
		header{ background: #bf0000 !important; }
		nav, footer{ background: #a70101 !important; }
		.svg-container{	min-width: 100px; max-width: 15%; max-height: none; display: block; margin: 0; margin-right: 15px; color: #4f4f4f;}
	</style>

	<body>
		<div class="header-container">
			<header class="error flex flex--row flex--wrap">
				<a href="{{ action('HomeController@index') }}" title="Home"><h1>Error {{ $exception->getStatusCode() }} @if($exception->getMessage() != "")({{ $exception->getMessage() }})@endif</h1></a>

				<div class="logo-container">
					<a href="{{ action('HomeController@index') }}" class="logo" style="background-image: url('{{ get_config_json("header.logo_url.value") }}')"></a>
				</div>
			</header>
		</div>

		<div class="main-content">
			@yield('content')
			<div class="centered width--800" style="text-align: center;">
				<a class="blue-link" href="{{ action('HomeController@index') }}" title="Home">Click here to go home</a>
			</div>
		</div>
	</body>
</html>
