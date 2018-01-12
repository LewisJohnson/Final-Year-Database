<header id="header" class="desktop">
	<img class="logo" src="/images/sussex-logo.jpg">
	<h1>@lang_sess("homepage_main_header")</h1>

	<button title="Log out" class="logout-button button button--raised" onclick="document.getElementById('logout-form').submit();">Logout</a>
	@if($user->isSupervisorOrSuperior())
		<button title="Change Authentication" class="change-auth-button button button--raised" data-activator="true" data-dialog="change-auth">Authentication</button>
	@endif
</header>

<nav class="desktop">
	<ul>
		{{-- <li class="nav-button"><img class="logo" src="/images/sussex-logo-no-text.png" style="width: 50px; height: 50px;"></li> --}}
		<li class="nav-button"><a href="/" title="">Home</a></li>
		<li class="nav-button dropdown" aria-expanded="false">
			<button>Browse</button>
			@include('svg.arrow-down')
			<div class="dropdown-content shadow-2dp" aria-hidden="true">
				<a href="/projects" title="Browse all projects">Projects</a>
				<a href="/projects/by-supervisor" title="Browse projects sorted by supervisor">Projects by Supervisor</a>
				<a href="/projects/by-topic" title="Browse projects sorted by topic">Projects by Topics</a>
			</div>
		</li>
		@if(strpos(Session::get("auth_type"), 'supervisor') !== false)
			<li class="nav-button"><a href="/supervisor" title="Supervisor options">Supervisor</a></li>
		@endif

		@include("partials.header.desktop-admin-dropdown")

		@if($user->isStudent())
			<li class="nav-button dropdown">
				<button >Student</button>
				@include('svg.arrow-down')
				<div class="dropdown-content shadow-2dp">
					<a href="/students/project-propose">Propose Project</a>
					<a href="/reports/supervisor">Report by Supervisor</a>
				</div>
			</li>
		@endif

		<li class="nav-button dropdown">
			<button>Help</button>
			@include('svg.arrow-down')

			<div class="dropdown-content shadow-2dp">
				@include('partials.header.help-links', ['platform' => 'desktop'])
				<a href="/help" title="System Help">System Help</a>
				<a href="/information" title="General Information">General Information</a>
				<a href="/about" title="About this software">About</a>
			</div>
		</li>
	</ul>
</nav>

<header id="header" class="mobile">
	<div class="hamburger-container" role="button">
		<ul class="hamburger-list">
			<li class="hamburger-line hamburger-line--short"></li>
			<li class="hamburger-line"></li>
			<li class="hamburger-line hamburger-line--short"></li>
		</ul>
	</div>
	<a href="/" title=""><h1>@lang_sess("homepage_main_header")</h1></a>
</header>

<nav class="mobile shadow-8dp" aria-hidden="true">
	<div>
		<ul>
			@if(strpos(Session::get("auth_type"), 'supervisor') !== false)
				<li class="nav-button">
					<a class="icon" href="/supervisor" title="Supervisor">
						@include('svg.shield')
						<p>Supervisor</p>
					</a>
				</li>
			@endif
			@if(strpos(Session::get("auth_type"), 'admin') !== false)
				<li class="nav-button">
					<a class="icon" href="/admin" title="Administrator">
						@include('svg.shield')
						<p>Administrator</p>
					</a>
				</li>
			@endif

			<h3>Browse</h3>
			<li class="nav-button">
				<a href="/projects" title="Browse all on-offer projects">All Projects</a>
			</li>

			<li class="nav-button">
				<a href="/projects/by-supervisor" title="Browse projects sorted by supervisor">By Supervisor</a>
			</li>

			<li class="nav-button">
				<a href="/projects/by-topic" title="Browse projects sorted by topic">By Topic</a>
			</li>

			@if($user->isStudent())
			<li class="nav-button dropdown">
				<h3>Student</h3>
				<div class="dropdown-content">
					<a href="/students/project-propose">Propose Project</a>
					<a href="/reports/supervisor">Report by Supervisor</a>
				</div>
			</li>
			@endif

			<li class="nav-button">
				<div class="sub-dropdown" tab-index="0">
					<h3>Help</h3>
					<div class="svg-container pointer">
						<svg class="transition--medium" viewBox="0 0 24 24">
							<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
						</svg>
					</div>
					<div class="dropdown-content">
						<a href="/help">System Help</a>
						<a href="/information">General Information</a>
						<a href="/about">About</a>
					</div>
				</div>
			</li>

			@include('partials.header.help-links', ['platform' => 'mobile'])

			<li class="footer">
				<button class="logout" title="Log out" onclick="document.getElementById('logout-form').submit();">
					@include('svg.logout')
				</a>
				@if($user->isSupervisorOrSuperior())
					<button title="Change Authenticaion" class="button button--raised button--accent" data-activator="true" data-dialog="change-auth">Authentication</button>
				@endif
			</li>
		</ul>
	</div>
</nav>

<div class="mobile-nav-underlay"></div>
<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">{{ csrf_field() }}</form>
