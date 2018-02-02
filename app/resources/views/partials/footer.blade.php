<footer>
	<div class="footer-left">
		@if(Cookie::get('largeFont') == "true")
			<a href="{{ action('HomeController@index', 'largeFont=false')}}">Regular Font</a>
		@else
			<a href="{{ action('HomeController@index', 'largeFont=true')}}">Large Font</a>
		@endif

		<p class="seperator">|</p>

		@if(config("app.footer_accessibilty_buttons"))
			@if(Cookie::get('highContrast') == "true")
				<a href="{{ action('HomeController@index', 'highContrast=false')}}">Standard Contast</a>
			@else
				<a href="{{ action('HomeController@index', 'highContrast=true')}}">High Contrast</a>
			@endif
		@endif
	</div>
	
	<div class="footer-right">
		<a href="@lang("messages.footer_link_url")">@lang("messages.footer_link_text")</a>
		<p class="seperator">|</p>
		<p>@lang_sess("footer_maintainer_text")</p>
	</div>

	@if(config("app.footer_rainbow"))
		<div class="rainbow">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	@endif
</footer>
