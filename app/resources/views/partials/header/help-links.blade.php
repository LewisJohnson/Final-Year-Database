@php($localePrefix = Session::get('db_type') == 'ug' ?  "messages_ug" : "messages_masters")

@if(Lang::has($localePrefix.".help_link_1"))
	@if($platform = "mobile")
		{{-- MOBILE --}}
		<li class="nav-button nav-button--mobile">
			<div class="sub-dropdown" tab-index="0">
				<h3 class="sub-dropbtn">Links</h3>
				<div class="svg-container pointer" style="margin-left: auto;">
					<svg class="transition--medium" viewBox="0 0 24 24">
						<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
					</svg>
				</div>
				<div class="dropdown-content">
					@for ($i = 1; $i <= 20; $i++)
						@if(Lang::has($localePrefix.".help_link_".$i))
							<a href="@lang($localePrefix.".help_link_".$i."_url")" title="@lang($localePrefix.".help_link_".$i)">@lang($localePrefix.".help_link_".$i)</a>
						@endif
					@endfor
				</div>
			</div>
		</li>
	@elseif($platform = "desktop")
		{{-- DESKTOP --}}
		<div class="sub-dropdown">
			<button class="sub-dropbtn">Links</button>
			@include('svg.arrow-right')
			<div class="dropdown-content shadow-2dp">
				@for ($i = 1; $i <= 20; $i++)
					@if(Lang::has("messages_masters.help_link_".$i))
						<a href="@lang("messages_masters.help_link_".$i."_url")" title="@lang("messages_ug.help_link_".$i)">@lang("messages_ug.help_link_".$i)</a>
					@endif
				@endfor
			</div>
		</div>
	@endif
@endif
