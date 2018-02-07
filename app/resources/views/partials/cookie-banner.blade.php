@if(Cookie::get('cookie-banner-seen') !== "true")
	<div class="cookie-banner flex flex--row">
		<a href="{{ action('HomeController@help') }}">We use cookies to remember your preferences and make the site more accessible.</a>

		<button>Close</button>
	</div>
@endif
