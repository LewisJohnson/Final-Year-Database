@if(empty($_COOKIE['seen_cookie_banner']))
	<div class="cookie-banner flex flex--row">
		<div style="color: white; width: 30px;">
			@include('svg.cookie')
		</div>

		<a href="{{ action('HomeController@help') }}">We use cookies to remember your preferences and make the site more accessible.</a>
		<button>Close</button>
	</div>
@endif
