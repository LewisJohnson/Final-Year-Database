<header style="background: {{ config_json('header.background.value') }}">
	<div class="toolbar">
		<div class="right button-group--horizontal">
			<button title="Log out" class="logout-button button button--raised" onclick="$('#logout-form').submit();">Logout</button>
				
			@if(Auth::user()->isSupervisorOrSuperior())
				<button title="Change Authentication" class="button button--raised" data-activator="true" data-dialog="change-auth">Authentication</button>
			@endif
		</div>
	</div>

	<div class="main">
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

		@include('partials.header.navigation', ['platform' => 'desktop'])

		<a href="{{ action('HomeController@index') }}" title="Home"><h1>@lang_sess("homepage_main_header")</h1></a>
	</div>
</header>

@include('partials.header.navigation', ['platform' => 'mobile'])
