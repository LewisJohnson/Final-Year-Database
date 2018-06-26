<footer>
	@if(get_config_json("footer.accessibility_buttons.value") == true)
		<div class="footer-left">
			<ul class="hl">
				<li>
					@if(Cookie::get('accessibility-font') == "true")
						<a class="button--small button--accent td-none" href="?largeFont=false">Large Font</a>
					@else
						<a class="button--small td-none hover--light" href="?largeFont=true">Large Font</a>
					@endif
				</li>
				
				<li>
					@if(Cookie::get('accessibility-contrast') == "true")
						<a class="button--small button--accent td-none" href="?highContrast=false">High Contrast</a>
					@else
						<a class="button--small td-none hover--light" href="?highContrast=true">High Contrast</a>
					@endif
				</li>

				@if(ldap_guest())
					<li class="ml-auto">
						<p class="hover--light">Guest Mode</p>
					</li>
				@endif
			</ul>
		</div>
	@endif

	<div class="footer-right">
		<ul class="hl">
			<li>
				<a id="leave-feedback-button" class="button--small td-none hover--light" href="#" data-is-guest="{{ Auth::guest() ? 'true' : 'false' }}">Leave Feedback</a>
			</li>
			<li><p class="seperator">|</p></li>
			<li>
				<a class="button--small td-none hover--light" target="_blank" href="@lang("messages.footer_link_url")">@lang("messages.footer_link_text")</a>
			</li>
			<li><p class="seperator">|</p></li>
			<li>
				@if(Session::get('education_level') != null)
					<p class="hover--light">{{ lang_sess("footer_maintainer_text") }}</p>
				@else
					<p class="hover--light">@lang("messages.footer_maintainer_text")</p>
				@endif
			</li>
		</ul>
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
