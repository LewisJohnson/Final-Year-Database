@if(empty($_COOKIE['seen_cookie_banner']))
	<div class="cookie-banner flex flex--row">
		<div style="color: white; width: 30px;">
			@include('svg.cookie')
		</div>

		<p>
			By continuing to use this website you consent to the use of cookies.<br>
			We use cookies to remember your preferences and make the site more accessible.<br>
			<a href="{{ action('HomeController@help') }}">Click here for more.</a>
		</p>

		<button>Close</button>
	</div>
@endif
