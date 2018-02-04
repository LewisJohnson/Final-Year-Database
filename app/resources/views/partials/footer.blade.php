<footer>
	@if(config("app.footer_accessibilty_buttons"))
		<div class="footer-left">
			@if(Cookie::get('largeFont') == "true")
				<a href="{{ action('HomeController@index', 'largeFont=false')}}">Regular Font</a>
			@else
				<a href="{{ action('HomeController@index', 'largeFont=true')}}">Large Font</a>
			@endif
			<p class="seperator">|</p>
			@if(Cookie::get('highContrast') == "true")
				<a href="{{ action('HomeController@index', 'highContrast=false')}}">Standard Contast</a>
			@else
				<a href="{{ action('HomeController@index', 'highContrast=true')}}">High Contrast</a>
			@endif
		</div>
	@endif
	
	<div class="footer-right">
		<a href="@lang("messages.footer_link_url")">@lang("messages.footer_link_text")</a>
		<p class="seperator">|</p>
		<p>@lang_sess("footer_maintainer_text")</p>
	</div>

	@if(config_json("footer.rainbow.value"))
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
