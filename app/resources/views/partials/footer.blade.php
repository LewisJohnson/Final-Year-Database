<footer>
	@if(get_config_json("footer.accessibility_buttons.value") == true)
		<div class="footer-left">
			<ul class="hl">
				<li>
					@if(Cookie::get('accessibility-font') == "true")
						<a class="button--small button--accent td-none" href="?largeFont=false">Large Font</a>
					@else
						<a class="button--small td-none" href="?largeFont=true">Large Font</a>
					@endif
				</li>

				<li>
					@if(Cookie::get('accessibility-contrast') == "true")
						<a class="button--small button--accent td-none" href="?highContrast=false">High Contrast</a>
					@else
						<a class="button--small td-none" href="?highContrast=true">High Contrast</a>
					@endif
				</li>
			</ul>
		</div>
	@endif

	<div class="footer-right">
		<a class="button--small td-none" href="@lang("messages.footer_link_url")">@lang("messages.footer_link_text")</a>
		<p class="seperator">|</p>
		@if(Session::get('educationLevel') != null)
			<p>{{ lang_sess("footer_maintainer_text") }}</p>
		@else
			<p>@lang("messages.footer_maintainer_text")</p>
		@endif
	</div>

	@if(get_config_json("footer.rainbow.value") == true)
		<div class="flex--full rainbow">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	@endif
</footer>
