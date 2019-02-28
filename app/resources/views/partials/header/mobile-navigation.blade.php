<nav class="mobile" aria-hidden="true">
	<button class="close-menu" type="button">X</button>
	<div class="row px-4">
		@if(ldap_guest())
			<div class="left-links">
				<h5 class="text-uppercase mt-3">Account</h5>
				<div>
					<li class="nav-button">
						<a href="#login" data-activator="true" data-dialog="login">Login</a>
					</li>
				</div>
			</div>

			<div class="col-6">
				<h5 class="text-uppercase mt-3">Browse</h5>
				<div class="list-group">
					<li class="nav-button">
						<a center" href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">All Projects</a>
					</li>

					<li class="nav-button">
						<a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">By Supervisor</a>
					</li>

					<li class="nav-button">
						<a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">By Topic</a>
					</li>
				</div>
			</div>

			<div>
				<h5 class="text-uppercase mt-3">Help</h5>
				<div class="list-group">
					<a class="list-group-item list-group-item-action" href="{{ action('HomeController@help') }}" title="System Help">System Help</a>
					<a class="list-group-item list-group-item-action" href="{{ action('HomeController@about') }}" title="About this software">About</a>
				</div>

				<div class="list-group">
					<h5 class="text-uppercase mt-3">Links</h5>
					@include('partials.header.help-links', ['platform' => 'mobile'])
				</div>
			</div>
		@endif
		@if(Auth::check())
			@if(Auth::user()->isProjectAdmin())
				<div class="left-links">
					<h5 class="text-uppercase mt-3">Project Administrator</h5>

					<li class="nav-button">
						<a href="{{ action('ProjectAdminController@index') }}" title="Administrator">Administrator Hub</a>
					</li>
				</div>
				<hr>
			@endif

			@if(Auth::user()->isSystemAdmin())
				<div class="left-links">
					<h5 class="text-uppercase mt-3">System Administrator</h5>

					<li class="nav-button">
						<div class="sub-dropdown" >
							<h3>System</h3>
							<div class="svg-container cursor--pointer">
								<svg viewBox="0 0 24 24">
									<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
								</svg>
							</div>
							<div class="dropdown-content">
								<a href="{{ action('SystemAdminController@systemDashboardView') }}">System Dashboard</a>
								<a href="{{ action('SystemAdminController@userAgentView') }}">User Agent Strings</a>
								<a href="{{ action('SystemAdminController@feedback') }}">User Feedback</a>
							</div>
						</div>
					</li>

					<li class="nav-button">
						<div class="sub-dropdown" >
							<h3>Users</h3>
							<div class="svg-container cursor--pointer">
								<svg class="transition--medium" viewBox="0 0 24 24">
									<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
								</svg>
							</div>
							<div class="dropdown-content">
								<a href="{{ action('UserController@index') }}">Edit User</a>
								<a href="{{ action('UserController@create') }}">Add User</a>
							</div>
						</div>
					</li>
				</div>
				<hr>
			@endif
		
			@if(Auth::user()->isSupervisor())
				<div class="col-12">
					<h5 class="text-uppercase mt-3">Supervisor</h5>
					<div class="row">
						<div class="col-6">
							<h6 class="text-uppercase">Projects</h6>
							<div class="list-group">
								<a title="Show my projects" href="{{ action('UserController@projects', Auth::user()) }}">My Projects</a>
								<a title="Create a new project" href="{{ action('ProjectController@create') }}">New Project</a>
							</div>
						</div>
						<div class="col-6">
							<h6 class="text-uppercase">Reports</h6>
							<div class="list-group">
								<a title="Create a new project" href="{{ action('SupervisorController@report') }}">Supervisor Report</a>
								<a title="Show my most popular projects" href="{{ action('SupervisorController@projectPopularity') }}">Project Popularity</a>
							</div>
						</div>
					</div>
					<hr class="w-100">
				</div>
			@endif

			@if(Auth::user()->isStudent())
				<div class="col-6">
					<h5 class="text-uppercase mt-3">Student</h5>
					<div class="list-group">
						@if(Auth::user()->student->project_status == "none")
							<a href="{{ action('StudentController@proposeProjectView') }}" >Propose Project</a>
						@elseif(Auth::user()->student->project_status == "proposed")
							<a href="{{ action('ProjectController@show', Auth::user()->student->project) }}">Your Proposed Project</a>
						@elseif(Auth::user()->student->project_status == "selected")
							<a href="{{ action('ProjectController@show', Auth::user()->student->project) }}">Your Selected Project</a>
						@elseif(Auth::user()->student->project_status == "accepted")
							<a href="{{ action('ProjectController@show', Auth::user()->student->project) }}">Your Accepted Project</a>
						@endif

						<a href="{{ action('SupervisorController@report') }}">Supervisor Report</a>
					</div>
				</div>
			@endif

			<div class="col-6">
				<h5 class="text-uppercase mt-3">Browse</h5>
				<div class="list-group">
					<a href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">All Projects</a>
					<a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">By Supervisor</a>
					<a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">By Topic</a>
				</div>
			</div>

			<div class="col-6">
				<h5 class="text-uppercase mt-3">Help</h5>
				<div class="list-group">
					<a href="{{ action('HomeController@help') }}" title="System Help">System Help</a>
					<a href="{{ action('HomeController@about') }}" title="About this software">About</a>
				</div>

				<h5 class="text-uppercase mt-3">Links</h5>

				<div class="list-group">
					@include('partials.header.help-links', ['platform' => 'mobile'])
				</div>
			</div>

		</div>

		<div class="row mt-6">
			<div class="col-12 bg-light border-top">
				<div class="p-2">
					<button class="btn" title="Log out" onclick="document.getElementById('logout-form').submit();">Logout</button>
				</div>
			</div>
		</div>
	@endif
</nav>