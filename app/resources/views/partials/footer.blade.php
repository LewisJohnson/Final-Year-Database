<footer class="py-1 row d-print-none mt-5" style="background-color: rgba(0, 0, 0, 0.03)">
	<div class="col-4">
		@if(SussexProjects\SystemSettings::get('footer_accessibility_buttons')->value == "true")
			@if(Cookie::get('accessibility_font') == "true" || (!empty($enable_font) && $enable_font === "true"))
				<a href="?large_font=false">Standard Font</a>
			@else
				<a href="?large_font=true">Large Font</a>
			@endif
			
			<span class="mx-2 text-muted d-none d-md-inline-block">|</span>

			@if(Cookie::get('accessibility_contrast') == "true" || (!empty($enable_contrast) && $enable_contrast === "true"))
				<a href="?high_contrast=false">Standard Contrast</a>
			@else
				<a href="?high_contrast=true">High Contrast</a>
			@endif

			<span class="mx-2 text-muted d-none d-md-inline-block">|</span>

			@if(Cookie::get('accessibility_dark_mode') == "true" || (!empty($enable_dark_mode) && $enable_dark_mode === "true"))
				<a href="?dark_mode=false">Light Mode</a>
			@else
				<a href="?dark_mode=true">Dark Mode</a>
			@endif
		@endif

		@if(ldap_guest())
			<p>Guest Mode</p>
		@endif
	</div>
	

	<div class="col-8 text-right">
		<a id="leave-feedback-button" href="#" data-is-guest="{{ Auth::guest() ? 'true' : 'false' }}">Leave Feedback</a>

		<span class="mx-2 text-muted d-none d-md-inline-block">|</span>

		<a target="_blank" href="@lang("messages.footer_link_url")">@lang("messages.footer_link_text")</a>
	</div>

	@if(SussexProjects\SystemSettings::get('footer_rainbow')->value == "true")
		<div class="col-12">
			<div class="flex--full rainbow">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	@endif
</footer>
