<div class="header-container">
	<header style="background: {{ config_json('header.background.value') }}">
		<div class="logo-container">
			<img class="logo" src="{{ config_json('header.logo_url.value') }}">
		</div>
			
		<div class="hamburger-container" role="button">
			<ul class="hamburger-list">
				<li class="hamburger-line hamburger-line--short"></li>
				<li class="hamburger-line"></li>
				<li class="hamburger-line hamburger-line--short"></li>
			</ul>
		</div>

		<a href="{{ action('HomeController@index') }}" title="Home"><h1>@lang_sess("homepage_main_header")</h1></a>
	</header>

	@include('partials.header.navigation')
</div>