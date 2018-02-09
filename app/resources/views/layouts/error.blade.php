<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
	@include ('partials.html-head')

	<style>
		header{ background: #bf0000 !important; }
		nav, footer{ background: #a70101 !important; }
		.svg-container{	min-width: 100px; max-width: 15%; max-height: none; display: block; margin: 0; margin-right: 15px; color: #4f4f4f;}
	</style>

	<body>
		<header class="error">
			<div class="logo-container">
				<a href="{{ action('HomeController@index') }}" class="logo" style="background-image: url('{{ config_json("header.logo_url.value") }}')"></a>
			</div>

			<a href="{{ action('HomeController@index') }}" title="Home"><h1>Error {{ $exception->getStatusCode() }} ({{ $exception->getMessage() }})</h1></a>
		</header>

		<div class="main-content">
			@yield('content')
		</div>
	</body>
</html>
