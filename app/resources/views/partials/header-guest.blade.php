<div class="header-container">
	@include('partials.cookie-banner')
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

		<a href="{{ action('HomeController@index') }}" title="Home"><h1>@lang("messages.homepage_main_header")</h1></a>
	</header>

	<nav class="desktop">
		<ul>
			<li class="nav-button"><a href="{{ action('HomeController@index') }}" title="Home">Home</a></li>
			<li class="nav-button dropdown">
				<button>Help</button>
				@include('svg.arrow-down')

				<div class="dropdown-content shadow-2dp">
					<a href="{{ action('HomeController@help') }}" title="System Help">System Help</a>
					<a href="{{ action('HomeController@information') }}" title="General Information">General Information</a>
					<a href="{{ action('HomeController@about') }}" title="About this software">About</a>
				</div>
			</li>
			<li class="nav-button" style="margin-left: auto;">
				<button data-activator="true" data-dialog="login">Login</button>
			</li>
		</ul>
	</nav>
</div>

<nav class="mobile" aria-hidden="true" aria-expanded="false">
	<div>
		<ul>
			<li class="nav-button">
				<div class="sub-dropdown" tab-index="0">
					<h3>Help</h3>
					<div class="svg-container pointer">
						<svg class="transition--medium" viewBox="0 0 24 24">
							<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
						</svg>
					</div>
					<div class="dropdown-content">
						<a href="{{ action('HomeController@help') }}" title="System Help">System Help</a>
						<a href="{{ action('HomeController@information') }}" title="General Information">General Information</a>
						<a href="{{ action('HomeController@about') }}" title="About this software">About</a>
					</div>
				</div>
			</li>

			</li>

			<li class="footer">
				<button class="button button--accent button--raised" data-activator="true" data-dialog="login">Login</button>
			</li>
		</ul>
	</div>
</nav>

<div class="mobile-nav-underlay">
</div>
