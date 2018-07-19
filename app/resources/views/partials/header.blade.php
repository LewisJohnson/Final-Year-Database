@include('partials.cookie-banner')

@if(Session::get('logged_in_as') != null)
	<div class="cookie-banner flex flex--row">
		<div style="color: white; width: 30px;">
			@include('svg.account')
		</div>

		<p>You are logged in as another user.</p>
	</div>
@endif
<div class="flex flex--row" style="background: rgb(52, 61, 70); z-index: 9; position: relative;">
	<ul class="hl header-department-list">
		@foreach(get_departments() as $key => $department)
		<li>
			<form role="form" method="POST" action="{{ action('HomeController@setDepartment') }}">
				{{ csrf_field() }}
				<input type="hidden" name="department" value="{{ $department }}">
				<button type="submit" class="button--small hover--light @if(Session::get('department') == $department)button--accent @endif" >{{ ucfirst($department) }}</button>
			</form>
		</li>
		@endforeach
	</ul>
	@if(Auth::check())
		<ul class="hl ml-auto header-education-level-list">
			@foreach(Auth::user()->allowedEducationLevel() as $key => $level)
				<li>
					<a @if(count(Auth::user()->allowedEducationLevel()) > 1) href="?educationLevel={{ $level['shortName'] }}" @endif class="button--small hover--light td-none @if(count(Auth::user()->allowedEducationLevel()) > 1) @if(Session::get('education_level') == $level) button--accent @endif  @endif" >{{ ucfirst($level["longName"]) }}</a>
				</li>
			@endforeach
		</ul>
	@endif

	@if(ldap_guest())
		<ul class="hl ml-auto header-education-level-list">
			@foreach(SussexProjects\User::guestEducationLevel() as $key => $level)
				<li>
					<a href="?educationLevel={{ $level['shortName'] }}" class="button--small hover--light td-none @if(Session::get('education_level') == $level) button--accent @endif" >{{ ucfirst($level["longName"]) }}</a>
				</li>
			@endforeach
		</ul>
	@endif
</div>
<div class="header-container">
	<header class="cd-morph-dropdown flex flex--row flex--wrap"  style="background: {{ get_config_json('header.background.value') }}">
		@if(Session::get('education_level') != null)
			<a href="{{ action('HomeController@index') }}" title="Home"><h1>{{ lang_sess('homepage_main_header') }}</h1></a>
		@else
			<a href="{{ action('HomeController@index') }}" title="Home"><h1>@lang('messages.homepage_main_header')</h1></a>
		@endif

		<div class="logo-container">
			<a href="https://www.sussex.ac.uk" class="logo" style="background-image: url('{{ get_config_json("header.logo_url.value") }}')"></a>
		</div>

		@if(Auth::check() || ldap_guest())
			<div class="mobile-menu-container" role="button" aria-label="Toggles the mobile navigation menu.">
				<ul class="mobile-menu">
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		@elseif(!empty(Session::get('department')) && Request::path() !== 'set-department')
			<div class="mobile-menu-container" role="button">
				<button class="button" style="margin-top: 5px; color: rgb(255, 255, 255);" data-activator="true" data-dialog="login">Login</button>
			</div>
		@endif

		<nav class="main-nav flex--full desktop">
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
								<h3>Browse</h3>
								<ul>
									<li>
										<ul>
											<li><a href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">Projects</a></li>
											<li><a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">Projects by Supervisor</a></li>
											<li><a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topics</a></li>
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
											<li><a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topics</a></li>
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
													<a class="icon" title="Show my projects" href="{{ action('SupervisorController@projectReport') }}">
														@include('svg.file-multiple')
														<p>Project Report</p>
													</a>
												</li>
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
													<a class="icon" href="{{ action('UserController@index', 'view=edit') }}">
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
											<ul>
												<li><a href="{{ action('ProjectAdminController@swapSecondMarkerView') }}" >Swap Second Markers</a></li>
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
