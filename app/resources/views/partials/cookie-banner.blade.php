@if(empty($_COOKIE['seen_cookie_banner']))
	<div id="cookie-banner">
		<div class="d-flex p-3 bg-dark">
			<div class="text-white w-3 svg-md">
				@include('svg.cookie')
			</div>
	
			<p class="text-white">
				By continuing to use this website you consent to the use of cookies.<br>
				We use cookies to remember your preferences and make the site more accessible.<br>
				<a href="{{ action('HomeController@help') }}">Click here for more.</a>
			</p>
	
			<button type="button" class="btn btn-light ml-auto">Close</button>
		</div>
	</div>
@endif
