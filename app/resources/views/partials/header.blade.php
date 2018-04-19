<div class="header-container">
	@include('partials.cookie-banner')

	<div class="flex flex--row" style="background: rgb(52, 61, 70);">
		<ul class="hl header-department-list">
			@foreach (get_departments() as $key => $department)
				<li>
					<form role="form" method="POST" action="{{ action('HomeController@setDepartment') }}">
							{{ csrf_field() }}
							<input type="hidden" name="department" value="{{ $department }}">
							<button type="submit" class="button--small hover--light @if(Session('department') == $department)button--accent @endif" >{{ ucfirst($department) }}</button>
					</form>
				</li>
			@endforeach
		</ul>

		@if(Auth::check())
			<ul class="hl ml-auto header-education-level-list">
				@foreach (Auth::user()->allowedEducationLevel() as $key => $level)
					<li>
						<a @if(count(Auth::user()->allowedEducationLevel()) > 1) href="?educationLevel={{ $level['shortName'] }}" @endif class="button--small hover--light td-none @if(count(Auth::user()->allowedEducationLevel()) > 1) @if(Session::get('education_level') == $level) button--accent @endif  @endif" >{{ ucfirst($level["longName"]) }}</a>
					</li>
				@endforeach
			</ul>
		@endif
	</div>

	<header style="background: {{ get_config_json('header.background.value') }}">
		<div class="logo-container">
			<a href="https://www.sussex.ac.uk" class="logo" style="background-image: url('{{ get_config_json("header.logo_url.value") }}')"></a>
		</div>


		@if(Auth::check())
			<div class="hamburger-container" role="button" aria-label="Toggles the mobile navigation menu.">
				<ul class="hamburger-list">
					<li class="hamburger-line hamburger-line--short"></li>
					<li class="hamburger-line"></li>
					<li class="hamburger-line hamburger-line--short"></li>
				</ul>
			</div>
		@else
			<div class="hamburger-container" style="max-width: 300px" role="button">
				<button class="button" style="margin-top: 5px; color: rgb(255, 255, 255);" data-activator="true" data-dialog="login">Login</button>
			</div>
		@endif
		

		@if(Session::get('education_level') != null)
			<a href="{{ action('HomeController@index') }}" title="Home"><h1>{{ lang_sess('homepage_main_header') }}</h1></a>
		@else
			<a href="{{ action('HomeController@index') }}" title="Home"><h1>@lang('messages.homepage_main_header')</h1></a>
		@endif
	</header>

	@include('partials.header.navigation', ['platform' => 'desktop'])
</div>

@if(Auth::check())
	@include('partials.header.navigation', ['platform' => 'mobile'])
@endif
