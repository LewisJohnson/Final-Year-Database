@include('partials.cookie-banner')

@if(preg_match('~MSIE|Internet Explorer~i', @$_SERVER['HTTP_USER_AGENT']) || (strpos(@$_SERVER['HTTP_USER_AGENT'], 'Trident/7.0; rv:11.0') !== false))
	@include('partials.ie-banner')
@endif

@if(Session::get('logged_in_as') != null)
	<div class="row bg-danger d-print-none">
		<div class="col-12 text-center">
			<p class="text-white m-0 p-2">You are logged in as another user.</p>
		</div>
	</div>
@endif

<div class="header-container d-print-none">
	<header class="cd-morph-dropdown" style="background: {{ get_config_json('header.background.value') }}">
		<div class="d-flex">
			<a class="text-white h4 font-weight-bolder p-3 m-0" href="{{ action('HomeController@index') }}" title="Home">
				@if(Session::get('education_level') != null)
					{{ lang_sess('homepage_main_header') }}
				@else
					@lang('messages.homepage_main_header')
				@endif
			</a>

			<a class="d-block ml-auto mr-2" href="https://www.sussex.ac.uk" title="Suusex University Logo" style="background-size: contain;width: 50px;height: 50px;background-image: url('{{ get_config_json("header.logo_url.value") }}')"></a>
		</div>

		@if(Auth::check() || ldap_guest())
			<div class="mobile-menu-container w-25 cursor--pointer mx-auto" role="button" aria-label="Toggles the mobile navigation menu.">
				<ul class="mobile-menu list-unstyled mb-0 p-3">
					<li class="mx-auto"></li>
					<li class="mx-auto"></li>
					<li class="mx-auto"></li>
				</ul>
			</div>
		@elseif(!empty(Session::get('department')) && Request::path() !== 'set-department')
			<div class="mobile-menu-container text-center" role="button">
				<button class="btn text-white" data-activator="true" data-dialog="login">Login</button>
			</div>
		@endif

		<nav class="main-nav flex--full flex--wrap flex--row desktop">
			<ul>
				@if(!empty(Session::get('department')) && Request::path() !== 'set-department')
					<li>
						<a href="{{ action('HomeController@index') }}">Home</a>
					</li>
				@endif

				@if(Auth::check() || ldap_guest())
					<li class="has-dropdown links" data-content="browse">
						<a href="#0">Browse</a>
					</li>
				@endif

				@if(ldap_guest())
					<li class="has-dropdown links" data-content="help">
						<a href="#0">Help</a>
					</li>
				@endif

				{{-- AUTH USER HEADER --}}
				@if(Auth::check())
					@if(Auth::user()->isSupervisor())
						<li class="has-dropdown links" data-content="supervisor">
							<a href="#0">Supervisor</a>
						</li>
					@endif

					@if(Auth::user()->isProjectAdmin())
						<li class="has-dropdown links" data-content="project-admin">
							<a href="#0">Admin</a>
						</li>
					@endif

					@if(Auth::user()->isSystemAdmin())
						<li class="has-dropdown links" data-content="system-admin">
							<a href="#0">System Admin</a>
						</li>
					@endif

					@if(Auth::user()->isStudent())
						<li class="has-dropdown links" data-content="student">
							<a href="#0">Student</a>
						</li>
					@endif

					@if(Auth::user()->isOnlyStaff())
						<li class="has-dropdown links" data-content="staff">
							<a href="#0">Staff</a>
						</li>
					@endif

					<li class="has-dropdown links" data-content="help">
						<a href="#0">Help</a>
					</li>

					<li>
						<a href="#0" title="Log out" onclick="$('#logout-form').submit();">Logout</a>
					</li>
				@endif

				@guest
					@if(!empty(Session::get('department')) && Request::path() !== 'set-department')
						<li>
							<a href="#login" title="Log in" data-activator="true" data-dialog="login">Login</a>
						</li>
					@endif
				@endguest

			</ul>
		</nav>

		@if(ldap_guest())
			<div class="morph-dropdown-wrapper">
				<div class="dropdown-list">
					<ul>
						<li id="browse" class="dropdown links">
							<a href="#0" class="label">Browse</a>
							<div class="content">
								<h4>Browse</h4>
								<ul>
									<li>
										<ul>
											<li><a href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">Projects</a></li>
											<li><a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">Projects by Supervisor</a></li>
											<li><a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topic</a></li>
										</ul>
									</li>
									<li>
										<ul>
											<li style="opactiy: 0"></li>
										</ul>
									</li>
								</ul>
							</div>
						</li>
						<li id="help" class="dropdown links">
							<a href="#0" class="label">Help</a>
							<div class="content">
								<ul>
									<li>
										<h4>Help</h4>
										<ul class="links-list">
											<li><a href="{{ action('HomeController@help') }}" title="System Help">System Help</a><li>
											<li><a href="{{ action('HomeController@about') }}" title="About this software">About</a><li>
										</ul>
									</li>

									<li>
										<div class="icon">
											<h4>External Links</h4>
											@include('svg.external')
										</div>
										<ul class="links-list">
											@include('partials.header.help-links', ['platform' => 'desktop'])
										</ul>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					<div class="bg-layer" aria-hidden="true" style="transform: scaleX(510) scaleY(213);"></div>
				</div>
			</div>
		@endif
		
		@if(Auth::check())
			<div class="morph-dropdown-wrapper">
				<div class="dropdown-list">
					<ul>
						<li id="browse" class="dropdown links">
							<a href="#0" class="label">Browse</a>
							<div class="content">
								<h3>Browse</h3>
								<ul>
									<li>
										<ul>
											<li><a href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">Projects</a></li>
											<li><a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">Projects by Supervisor</a></li>
											<li><a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topic</a></li>
										</ul>
									</li>
									<li>
										<ul>
											<li style="opactiy: 0"></li>
										</ul>
									</li>
								</ul>
							</div>
						</li>

						@if(Auth::user()->isSupervisor())
							<li id="supervisor" class="dropdown links">
								<a href="#0" class="label">Supervisor</a>
								<div class="content">
									<ul>
										<li>
											<h4>Projects</h4>
											<ul class="icon-list links-list">
												<li>
													<a class="icon" title="Show my projects" href="{{ action('UserController@projects', Auth::user()) }}">
														@include('svg.file-account')
														<p>My Projects</p>
													</a>
												</li>
												<li>
													<a class="icon" title="Create a new project" href="{{ action('ProjectController@create') }}">
														@include('svg.file-plus')
														<p>New Project</p>
													</a>
												</li>
											</ul>
										</li>

										<li>
											<h4>Reports</h4>
											<ul class="icon-list links-list">
												<li>
													<a class="icon" title="Create a new project" href="{{ action('SupervisorController@report') }}">
														@include('svg.clipboard')
														<p>Supervisor Report</p>
													</a>
												</li>
												<li>
													<a class="icon" title="Show my most popular projects" href="{{ action('SupervisorController@projectPopularity') }}">
														@include('svg.fire')
														<p>Project Popularity</p>
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</li>
						@endif
						@if(Auth::user()->isProjectAdmin())
							<li id="project-admin" class="dropdown links wide">
								<a href="#0" class="label">Administrator</a>
								<div class="content">
									<h3>Administrator</h3>
									<ul>
										<li>@include('partials.header.admin-sub-dropdown', ['title' => 'Users', 'links' => 'user'])</li>
										<li>@include('partials.header.admin-sub-dropdown', ['title' => 'Reports', 'links' => 'report'])</li>
										<li>@include('partials.header.admin-sub-dropdown', ['title' => 'Second Marker', 'links' => 'marker'])</li>
										<li>@include('partials.header.admin-sub-dropdown', ['title' => 'Settings', 'links' => 'settings'])</li>
										<li>@include('partials.header.admin-sub-dropdown', ['title' => 'Transactions', 'links' => 'transaction'])</li>
									</ul>
								</div>
							</li>
						@endif

						@if(Auth::user()->isSystemAdmin())
							<li id="system-admin" class="dropdown links wide-ish">
								<a href="#0" class="label">System Administrator</a>
								<div class="content">
									<h3>System Administrator</h3>
									<ul>
										<li>
											<h4>System</h4>
											<ul>
												<li>
													<a class="icon" href="{{ action('SystemAdminController@systemDashboardView') }}">
														@include('svg.tune')
														<p>System Dashboard</p>
													</a>
												</li>

												<li>
													<a class="icon" href="{{ action('SystemAdminController@userAgentView') }}">
														@include('svg.monitor')
														<p>User Agent Strings</p>
													</a>
												</li>

												<li>
													<a class="icon" href="{{ action('SystemAdminController@feedback') }}">
														@include('svg.message-bulleted')
														<p>User Feedback</p>
													</a>
												</li>
											</ul>
										</li>
										<li>
											<h4>User</h4>
											<ul>
												<li>
													<a class="icon" href="{{ action('UserController@create') }}">
														@include('svg.account-plus')
														<p>Add User</p>
													</a>
												</li>
												<li>
													<a class="icon" href="{{ action('UserController@index') }}">
														@include('svg.account-edit')
														<p>Edit User</p>
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</li>
						@endif

						@if(Auth::user()->isStudent())
							<li id="student" class="dropdown links wide-ish">
								<a href="#0" class="label">Student</a>
								<div class="content">
									<ul>
										<li>
											<h4>Project</h4>
											<ul>
												<li>
													{{-- THERE IS NO SWITCH, PLEASE DO NOT JUDGE ME --}}
													@if(Auth::user()->student->project_status == "none")
														<a class="icon" title="Propose a project to a supervisor" href="{{ action('StudentController@proposeProjectView') }}">
															@include('svg.pencil')
															<p>Propose Project</p>
														</a>
													@else
														<a class="icon" title="See your selected project" href="{{ action('ProjectController@show', Auth::user()->student->project) }}">
															@include('svg.creation')
															@if(Auth::user()->student->project_status == "proposed")
																<p>Your Proposed Project</p>
															@elseif(Auth::user()->student->project_status == "selected")
																<p>Your Selected Project</p>
															@elseif(Auth::user()->student->project_status == "accepted")
																<p>Your Accepted Project</p>
															@endif
														</a>
													@endif
												</li>
											</ul>
										</li>
										<li>
											<h4>Reports</h4>
											<ul class="icon-list links-list">
												<li>
													<a class="icon" title="Create a new project" href="{{ action('SupervisorController@report') }}">
														@include('svg.clipboard')
														<p>Supervisor Report</p>
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</li>
						@endif

						@if(Auth::user()->isOnlyStaff())
							<li id="staff" class="dropdown links">
								<a href="#0" class="label">Staff</a>
								<div class="content">
									<h3>Staff</h3>
									<ul>
										<li>
											<ul class="icon-list links-list">
												<h4>Second Marker</h4>
												<li>
													<a class="icon" href="{{ action('ProjectAdminController@swapSecondMarkerView') }}">
														@include('svg.swap')
														<p>Swap Second Markers</p>
													</a>
												</li>
											</ul>
										</li>
										<li>
											<ul class="icon-list links-list">
												<h4>Projects</h4>
												<li>
													<a class="icon" href="{{ action('StudentController@report') }}">
														@include('svg.school')
														<p>Student Report</p>
													</a>
												</li>
												<li>
													<a class="icon" href="{{ action('SupervisorController@report') }}">
														@include('svg.clipboard')
														<p>Supervisor Report</p>
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</li>
						@endif

						<li id="help" class="dropdown links">
							<a href="#0" class="label">Help</a>
							<div class="content">
								<ul>
									<li>
										<h4>Help</h4>
										<ul class="links-list">
											<li><a href="{{ action('HomeController@help') }}" title="System Help">System Help</a><li>
											<li><a href="{{ action('HomeController@about') }}" title="About this software">About</a><li>
										</ul>
									</li>

									<li>
										<div class="icon">
											<h4>External Links</h4>
											@include('svg.external')
										</div>
										<ul class="links-list">
											@include('partials.header.help-links', ['platform' => 'desktop'])
										</ul>
									</li>
								</ul>
							</div>
						</li>
					</ul>
					<div class="bg-layer" aria-hidden="true" style="transform: scaleX(510) scaleY(213);"></div>
				</div>
			</div>
		@endif
	</header>
</div>

@if(Auth::check() || ldap_guest())
	@include('partials.header.mobile-navigation')
@endif
