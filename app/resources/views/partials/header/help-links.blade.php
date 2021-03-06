@if(lang_sess('help_link_1') != null)
	@if($platform === "mobile")
		{{-- MOBILE --}}
		@for ($i = 1; $i <= 20; $i++)
			@if(lang_sess('help_link_'.$i) != null)
					<a target="_blank" href="{{ lang_sess('help_link_'.$i.'_url')}}" 
						title="{{ lang_sess('help_link_'.$i) }}">{{ lang_sess('help_link_'.$i) }}</a>
			@endif
		@endfor
	@elseif($platform == "desktop")
		{{-- DESKTOP --}}
		@for ($i = 1; $i <= 20; $i++)
			@if(lang_sess('help_link_'.$i) != null)
				<li>
					<a class="text-primary btn" target="_blank" href="{{ lang_sess('help_link_'.$i.'_url')}}" 
						title="{{ lang_sess('help_link_'.$i) }}">{{ lang_sess('help_link_'.$i) }}</a>
				</li>
			@endif
		@endfor
	@elseif($platform == "email")
		{{-- EMAIL --}}
		@for ($i = 1; $i <= 20; $i++)
			@if(lang_sess('help_link_'.$i) != null)
				<li>
					<a target="_blank" href="{{ lang_sess('help_link_'.$i.'_url')}}" 
					title="{{ lang_sess('help_link_'.$i) }}">{{ lang_sess('help_link_'.$i) }}</a>
				</li>
			@endif
		@endfor
	@endif
@endif
