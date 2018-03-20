@if(lang_sess('help_link_1') != null)

	@section('help-links')
		@for ($i = 1; $i <= 20; $i++)
			@if(lang_sess('help_link_'.$i) != null)
					<a target="_blank" 
					href="{{ lang_sess('help_link_'.$i.'_url')}}" 
					title="{{ lang_sess('help_link_'.$i) }}">{{ lang_sess('help_link_'.$i) }}</a>
			@endif
		@endfor
	@endsection
	
	@if($platform === "mobile")
		{{-- MOBILE --}}
		<li class="nav-button">
			<div class="sub-dropdown" tab-index="0">
				<h3 class="sub-dropbtn">Links</h3>
				<div class="svg-container pointer" style="margin-left: auto;">
					<svg class="transition--medium" viewBox="0 0 24 24">
						<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
					</svg>
				</div>
				<div class="dropdown-content">
					@yield('help-links')
				</div>
			</div>
		</li>
	@elseif($platform == "desktop")
		{{-- DESKTOP --}}
		<div class="sub-dropdown">
			<button class="sub-dropbtn">Links</button>
			@include('svg.arrow-right')
			<div class="dropdown-content shadow-2dp">
				@yield('help-links')
			</div>
		</div>
	@elseif($platform == "email")
		{{-- EMAIL --}}
		@for ($i = 1; $i <= 20; $i++)
			@if(lang_sess('help_link_'.$i) != null)
				<li>
					<a target="_blank" 
					href="{{ lang_sess('help_link_'.$i.'_url')}}" 
					title="{{ lang_sess('help_link_'.$i) }}">{{ lang_sess('help_link_'.$i) }}</a>
				</li>
			@endif
		@endfor
	@endif
@endif
