<div class="header-container">
	@include('partials.cookie-banner')
	<header style="background: {{ config_json('header.background.value') }}">
		<div class="logo-container">
			<a href="https://www.sussex.ac.uk" class="logo" style="background-image: url('{{ config_json("header.logo_url.value") }}')"></a>
		</div>

		<div class="hamburger-container" role="button" aria-label="Toggles the mobile navigation menu.">
			<ul class="hamburger-list">
				<li class="hamburger-line hamburger-line--short"></li>
				<li class="hamburger-line"></li>
				<li class="hamburger-line hamburger-line--short"></li>
			</ul>
		</div>

		<a href="{{ action('HomeController@index') }}" title="Home"><h1>@lang_sess("homepage_main_header")</h1></a>
	</header>

	@include('partials.header.navigation', ['platform' => 'desktop'])
</div>

@include('partials.header.navigation', ['platform' => 'mobile'])
