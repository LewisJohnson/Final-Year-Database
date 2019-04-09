<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
	@include ('partials.html-head')

	<style>
		.logo-container { display: none }
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

		<div class="main-content mt-5">
			@yield('content')
			<div class="centered mw-800" style="text-align: center;">
				<a class="blue-link" href="{{ action('HomeController@index') }}" title="Home">Click here to go home</a>
			</div>
		</div>
	</body>
</html>
