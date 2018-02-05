<nav class="mobile shadow-8dp" aria-hidden="true">
	<div>
		<ul>
			@if(Session::get('auth_level') === 'supervisor' && Session::get('auth_type') !== 'system')
			<li class="nav-button">
				<a class="icon" href="/supervisor" title="Supervisor">
					@include('svg.shield')
					<p>Supervisor</p>
				</a>
			</li>
			@endif

			@if(Session::get('auth_level') === 'admin' && Session::get('auth_type') !== 'system')
			<li class="nav-button">
				<a class="icon" href="/admin" title="Administrator">
					@include('svg.shield')
					<p>Administrator</p>
				</a>
			</li>
			@endif

			<h3>Browse</h3>
			<li class="nav-button">
				<a href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">All Projects</a>
			</li>

			<li class="nav-button">
				<a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">By Supervisor</a>
			</li>

			<li class="nav-button">
				<a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">By Topic</a>
			</li>

			@if(Auth::user()->isStudent())
			<li class="dropdown">
				<h3>Student</h3>
				<div class="svg-container pointer">
					<svg class="transition--medium" viewBox="0 0 24 24">
						<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
					</svg>
				</div>
				<div class="dropdown-content">
					<a href="{{ action('StudentController@showProposeProject') }}">Propose Project</a>
					<a href="{{ action('SupervisorController@report') }}">Report by Supervisor</a>
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
						<a href="{{ action('HomeController@help') }}" title="System Help">System Help</a>
						<a href="{{ action('HomeController@information') }}" title="General Information">General Information</a>
						<a href="{{ action('HomeController@about') }}" title="About this software">About</a>
					</div>
				</div>
			</li>

			@include('partials.header.help-links', ['platform' => 'mobile'])

			<li class="footer">
				<button class="logout" title="Log out" onclick="document.getElementById('logout-form').submit();">
					@include('svg.logout')
				</button>

				@if(Auth::user()->isSupervisorOrSuperior())
				<button title="Change Authentication" class="button button--raised button--accent" data-activator="true" data-dialog="change-auth">Authentication</button>
				@endif
			</li>
		</ul>
	</div>
</nav>

<nav class="desktop">
	<ul>
		<li class="nav-button">
			<a href="{{ action('HomeController@index') }}" title="Home">Home</a>
		</li>

		<li class="nav-button dropdown">
			<button>Browse</button>
			@include('svg.arrow-down')
			<div class="dropdown-content shadow-2dp">
				<a href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">Projects</a>
				<a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">Projects by Supervisor</a>
				<a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topics</a>
			</div>
		</li>
		<li class="nav-button dropdown">
			<button>Help</button>
			@include('svg.arrow-down')
			<div class="dropdown-content shadow-2dp">
				<a href="{{ action('HomeController@information') }}" title="General Information">General Information</a>
				<a href="{{ action('HomeController@help') }}" title="System Help">System Help</a>
				<a href="{{ action('HomeController@about') }}" title="About this software">About</a>
				@include('partials.header.help-links', ['platform' => 'desktop'])
			</div>
		</li>
		@if(Session::get('auth_level') == 'supervisor')
		<li class="nav-button dropdown">
			<a href="{{ action('SupervisorController@index') }}" title="Supervisor options">Supervisor</a>
			@include('svg.arrow-down')
			<div class="dropdown-content shadow-2dp">
				<a title="Create new project" href="{{ action('ProjectController@create') }}">New Project</a>
				<a title="Browse all transactions for your projects" href="{{ action('SupervisorController@transactions') }}">Transactions</a>
				<a href="{{ action('SupervisorController@report') }}">Report by Supervisor</a>
			</div>
		</li>
		@endif

		@include("partials.header.admin-dropdown")

		@if(Auth::user()->isStudent())
		<li class="nav-button dropdown">
			<button>Student</button>
			@include('svg.arrow-down')
			<div class="dropdown-content shadow-2dp">
				<a href="{{ action('StudentController@showProposeProject') }}">Propose Project</a>
				<a href="{{ action('SupervisorController@report') }}">Report by Supervisor</a>
			</div>
		</li>
		@endif


		@if(Auth::user()->isSupervisorOrSuperior())
		<li class="nav-button" style="margin-left: auto;">
			<button title="Change Authentication" data-activator="true" data-dialog="change-auth">Authentication</button>
		</li>
		@endif

		<li class="nav-button">
			<button title="Log out" onclick="$('#logout-form').submit();">Logout</button>
		</li>

	</ul>
</nav>
