<nav class="mobile" aria-hidden="true">
	<div>
		<button class="close-menu" type="button">X</button>
		<ul>
			@if(ldap_guest())
				<div class="left-links">
					<h4>Account</h4>
					<div>
						<li class="nav-button">
							<a href="#login" data-activator="true" data-dialog="login">Login</a>
						</li>
					</div>
				</div>

				<div class="centre-links">
					<h4>Browse</h4>
					<div class="flex flex--row flex--stretch-children flex--wrap">
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

				<div class="flex flex--row flex--stretch-children" style="padding: 1rem 1rem 0rem 1rem;">
					<div>
						<h4 style="padding-left: 0rem;">Help</h4>
						<div class="flex flex--col">
							<li class="nav-button">
								<a href="{{ action('HomeController@help') }}" title="System Help">System Help</a>
							</li>

							<li class="nav-button">
								<a href="{{ action('HomeController@about') }}" title="About this software">About</a>
							</li>
						</div>
					</div>

					<div>
						<h4 style="padding-left: 0">Links</h4>
						@include('partials.header.help-links', ['platform' => 'mobile'])
					</div>
				</div>
			@endif
			@if(Auth::check())
				@if(Auth::user()->isProjectAdmin())
					<div class="left-links">
						<h4>Project Administrator</h4>

						<li class="nav-button">
							<a href="{{ action('ProjectAdminController@index') }}" title="Administrator">Administrator Hub</a>
						</li>
					</div>
					<hr>
				@endif

				@if(Auth::user()->isSystemAdmin())
					<div class="left-links">
						<h4>System Administrator</h4>

						<li class="nav-button">
							<div class="sub-dropdown" tab-index="0">
								<h3>System</h3>
								<div class="svg-container pointer">
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
							<div class="sub-dropdown" tab-index="0">
								<h3>Users</h3>
								<div class="svg-container pointer">
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
					<div class="left-links">
						<h4>Supervisor</h4>

						<li class="nav-button">
							<div class="sub-dropdown" tab-index="0">
								<h3>Projects</h3>
								<div class="svg-container pointer">
									<svg viewBox="0 0 24 24">
										<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
									</svg>
								</div>
								<div class="dropdown-content">
									<a title="Show my projects" href="{{ action('UserController@projects', Auth::user()) }}">My Projects</a>
									<a title="Create a new project" href="{{ action('ProjectController@create') }}">New Project</a>
								</div>
							</div>
						</li>

						<li class="nav-button">
							<div class="sub-dropdown" tab-index="0">
								<h3>Reports</h3>
								<div class="svg-container pointer">
									<svg viewBox="0 0 24 24">
										<path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
									</svg>
								</div>
								<div class="dropdown-content">
									<a title="Show my projects" href="{{ action('SupervisorController@projectReport') }}">Project Report</a>
									<a title="Create a new project" href="{{ action('SupervisorController@report') }}">Supervisor Report</a>
									<a title="Show my most popular projects" href="{{ action('SupervisorController@projectPopularity') }}">Project Popularity</a>
								</div>
							</div>
						</li>
					</div>
					<hr>
				@endif

				@if(Auth::user()->isStudent())
					<div class="centre-links">
						<h4>Student</h4>
						<div style="padding: 0rem 1rem;" class="flex flex--row flex--stretch-children">
							<li class="nav-button">
								@if(Auth::user()->student->project_status == "none")
										<a href="{{ action('StudentController@proposeProjectView') }}" >Propose Project</a>
									@elseif(Auth::user()->student->project_status == "proposed")
										<a href="{{ action('ProjectController@show', Auth::user()->student->project) }}">Your Proposed Project</a>
									@elseif(Auth::user()->student->project_status == "selected")
										<a href="{{ action('ProjectController@show', Auth::user()->student->project) }}">Your Selected Project</a>
									@elseif(Auth::user()->student->project_status == "accepted")
										<a href="{{ action('ProjectController@show', Auth::user()->student->project) }}">Your Accepted Project</a>
									@endif
							</li>

							<li class="nav-button">
								<a href="{{ action('SupervisorController@report') }}">Supervisor Report</a>
							</li>
						</div>
					</div>
				@endif

				<div class="centre-links">
					<h4>Browse</h4>
					<div style="padding: 0rem 1rem;" class="flex flex--row flex--stretch-children flex--wrap">
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

				<div class="flex flex--row flex--stretch-children" style="padding: 1rem 1rem 0rem 1rem;">
					<div>
						<h4 style="padding-left: 0rem;">Help</h4>
						<div class="flex flex--col">
							<li class="nav-button">
								<a href="{{ action('HomeController@help') }}" title="System Help">System Help</a>
							</li>

							<li class="nav-button">
								<a href="{{ action('HomeController@about') }}" title="About this software">About</a>
							</li>
						</div>
					</div>

					<div>
						<h4 style="padding-left: 0">Links</h4>
						@include('partials.header.help-links', ['platform' => 'mobile'])
					</div>
				</div>
				<li class="footer">
					<button class="logout button" title="Log out" onclick="document.getElementById('logout-form').submit();">Logout</button>
				</li>
			</ul>
		@endif
	</div>
</nav>