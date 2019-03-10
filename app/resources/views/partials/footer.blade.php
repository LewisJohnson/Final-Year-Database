<footer class="footer mt-auto py-1 bg-dark w-100 d-print-none">
	<div class="container-fluid">
		<div id="levelSelector" class="row">
			<div class="col-6">
				<ul class="list-inline mb-0">
					{{-- DPERARTMENT LIST --}}
					@foreach(get_departments() as $key => $department)
						<li class="list-inline-item mr-0">
							<form role="form" method="POST" action="{{ action('HomeController@setDepartment') }}">
								{{ csrf_field() }}
								<input type="hidden" name="department" value="{{ $department }}">
								<button type="submit" class="btn btn-sm rounded-0 btn-link @if(Session::get('department') == $department) border-bottom text-white @endif" href="#">{{ ucfirst($department) }}</button>
							</form>
						</li>

						@if($loop->iteration != count(get_departments()))
							<span class="mx-2 text-muted d-none d-md-inline-block">|</span>
						@endif
					@endforeach
				</ul>
			</div>

			<div class="col-6 text-right">
				{{-- USER EDUCATION LEVEL LIST --}}
				@if(Auth::check())
					<ul class="list-inline mb-0">
						@foreach(Auth::user()->allowedEducationLevel() as $key => $level)
							<li class="list-inline-item">
								<a href="?educationLevel={{ $level['shortName'] }}" class="btn btn-sm rounded-0 btn-link @if(Session::get('education_level') == $level) border-bottom text-white @endif">{{ ucfirst($level["longName"]) }}</a>
							</li>

							@if($loop->iteration != count(Auth::user()->allowedEducationLevel()))
								<span class="mx-2 text-muted d-none d-md-inline-block">|</span>
							@endif
						@endforeach
					</ul>
				@endif
			
				{{-- GUEST EDUCATION LEVEL LIST --}}
				@if(ldap_guest())
					<ul class="list-inline mb-0">
						@foreach(SussexProjects\User::guestEducationLevel() as $key => $level)
							<li class="list-inline-item">
								<a href="?educationLevel={{ $level['shortName'] }}" class="btn btn-sm rounded-0 btn-link @if(Session::get('education_level') == $level) border-bottom text-white @endif" >{{ ucfirst($level["longName"]) }}</a>
							</li>

							@if($loop->iteration != count(SussexProjects\User::guestEducationLevel()))
								<span class="mx-2 text-muted d-none d-md-inline-block">|</span>
							@endif
						@endforeach
					</ul>
				@endif
			</div>
		</div>

		<div class="row">
			<div class="col-4">
				@if(get_config_json("footer.accessibility_buttons.value") == true)
					@if(Cookie::get('accessibility_font') == "true")
						<a class="btn btn-sm rounded-0 btn-link border-bottom text-white" href="?large_font=false">Standard Font</a>
					@else
						<a class="btn btn-sm rounded-0 btn-link" href="?large_font=true">Large Font</a>
					@endif
					
					<span class="mx-2 text-muted d-none d-md-inline-block">|</span>

					@if(Cookie::get('accessibility_contrast') == "true")
						<a class="btn btn-sm rounded-0 btn-link border-bottom text-white" href="?high_contrast=false">High Contrast</a>
					@else
						<a class="btn btn-sm rounded-0 btn-link" href="?high_contrast=true">High Contrast</a>
					@endif
				@endif

				@if(ldap_guest())
					<p class="hover--light">Guest Mode</p>
				@endif
			</div>
		
			<div class="col-8 text-right">
				<a id="leave-feedback-button" href="#" data-is-guest="{{ Auth::guest() ? 'true' : 'false' }}">Leave Feedback</a>

				<span class="mx-2 text-muted d-none d-md-inline-block">|</span>

				<a target="_blank" href="@lang("messages.footer_link_url")">@lang("messages.footer_link_text")</a>

				<span class="mx-2 text-muted d-none d-md-inline-block">|</span>

				@if(Session::get('education_level') != null)
					<span class="text-muted">{{ lang_sess("footer_maintainer_text") }}</span>
				@else
					<span class="text-muted">@lang("messages.footer_maintainer_text")</span>
				@endif
			</div>
		</div>
	</div>
</footer>
