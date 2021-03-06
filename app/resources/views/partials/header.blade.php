@include('partials.cookie-banner')

@if(preg_match('~MSIE|Internet Explorer~i', @$_SERVER['HTTP_USER_AGENT']) || (strpos(@$_SERVER['HTTP_USER_AGENT'], 'Trident/7.0; rv:11.0') !== false))
	@include('partials.ie-banner')
@endif

@if(env('APP_DEBUG'))
	@if(Auth::check() && Auth::user()->isSystemAdmin())
		@include('partials.debug-banner')
	@endif
@endif

@if(Session::get('department') != null)
	<nav class="navbar navbar-expand navbar-dark bg-dark p-0">
		<div class="collapse navbar-collapse">
			<ul class="navbar-nav d-flex w-100">
				<li class="nav-item dropright">
					<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{{ ucfirst(Session::get('department')) }}
					</a>
					<div class="dropdown-menu">
						@foreach(get_departments() as $key => $department)
							<form role="form" method="POST" action="{{ action('HomeController@setDepartment') }}">
								{{ csrf_field() }}
								<input type="hidden" name="department" value="{{ $department }}">
								<button type="submit" class="dropdown-item cursor--pointer @if(Session::get('department') == $department) active @endif" href="#">{{ ucfirst($department) }}</button>
							</form>
						@endforeach
					</div>
				</li>

				@if(Auth::check() || ldap_guest())
					<li class="nav-item dropleft ml-auto">
						<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							{{ ucfirst(Session::get('education_level')['longName']) }}
						</a>
						<div class="dropdown-menu">
							{{-- USER EDUCATION LEVEL LIST --}}
							@if(Auth::check())
								@foreach(Auth::user()->allowedEducationLevel() as $key => $level)
									<a class="dropdown-item @if(Session::get('education_level') == $level) active @endif" href="?educationLevel={{ $level['shortName'] }}">{{ ucfirst($level["longName"]) }}</a>
								@endforeach
							@endif
						
							{{-- GUEST EDUCATION LEVEL LIST --}}
							@if(ldap_guest())
								@foreach(SussexProjects\User::guestEducationLevel() as $key => $level)
									<a class="dropdown-item @if(Session::get('education_level') == $level) active @endif" href="?educationLevel={{ $level['shortName'] }}" >{{ ucfirst($level["longName"]) }}</a>
								@endforeach
							@endif
						</div>
					</li>
				@endif
			</ul>
		</div>
	</nav>
@endif

@if(Session::get('logged_in_as') != null)
	<p class="text-white m-0 p-2 text-center bg-danger d-print-none">You are logged in as another user.</p>
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

					@if(Auth::user()->isAdminOfEducationLevel())
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

					@if(Auth::user()->isStaff())
						<li class="has-dropdown links" data-content="staff">
							<a href="#0">Staff</a>
						</li>
					@endif

					@if(Auth::user()->isExternalMarker())
						<li class="has-dropdown links" data-content="external-marker">
							<a href="#0">Marker</a>
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
								<h5>Browse</h5>
								<ul>
									<li>
										<ul>
											<li><a class="btn text-primary" href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">Projects</a></li>
											<li><a class="btn text-primary" href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">Projects by Supervisor</a></li>
											<li><a class="btn text-primary" href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topic</a></li>
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
										<h5>Help</h5>
										<ul class="links-list">
											<li><a class="btn text-primary" href="{{ action('HomeController@help') }}" title="System Help">System Help</a><li>
											<li><a class="btn text-primary" href="{{ action('HomeController@about') }}" title="About this software">About</a><li>
										</ul>
									</li>

									<li>
										<div class="d-flex">
											<h5>External Links</h5>
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
											<li><a class="btn w-100 text-left text-primary" href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">Projects</a></li>
											<li><a class="btn w-100 text-left text-primary" href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">Projects by Supervisor</a></li>
											<li><a class="btn w-100 text-left text-primary" href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topic</a></li>
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
											<h5>Projects</h5>
											<ul class="list-unstyled">
												<li>
													<a class="btn w-100 text-left text-primary" title="Show my projects" href="{{ action('UserController@projects', Auth::user()) }}">
														<span>@include('svg.file-account')<span>My Projects</span></span>
													</a>
												</li>
												<li>
													<a class="btn w-100 text-left text-primary" title="Create a new project" href="{{ action('ProjectController@create') }}">
														<span>@include('svg.file-plus')<span>New Project</span></span>
													</a>
												</li>
											</ul>
										</li>

										<li>
											<h5>Reports</h5>
											<ul class="list-unstyled">
												<li>
													<a class="btn w-100 text-left text-primary" title="Create a new project" href="{{ action('SupervisorController@report') }}">
														<span>@include('svg.clipboard')<span>Supervisor Report</span></span>
													</a>
												</li>
												<li>
													<a class="btn w-100 text-left text-primary" title="Show my most popular projects" href="{{ action('SupervisorController@projectPopularity') }}">
														<span>@include('svg.fire')<span>Project Popularity</span></span>
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</li>
						@endif

						@if(Auth::user()->isAdminOfEducationLevel())
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
										<li>@include('partials.header.admin-sub-dropdown', ['title' => 'Project Evaluation', 'links' => 'evaluation'])</li>
										<li>@include('partials.header.admin-sub-dropdown', ['title' => 'Projects', 'links' => 'projects'])</li>
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
											<h5>System</h5>
											<ul>
												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('SystemAdminController@systemDashboardView') }}">
														<span>@include('svg.tune')<span>System Dashboard</span></span>
													</a>
												</li>

												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('SystemAdminController@userAgentView') }}">
														<span>@include('svg.monitor')<span>User Agent Strings</span></span>
													</a>
												</li>

												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('SystemAdminController@feedback') }}">
														<span>@include('svg.message-bulleted')<span>User Feedback</span></span>
													</a>
												</li>
											</ul>
										</li>
										<li>
											<h5>User</h5>
											<ul>
												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('UserController@create') }}">
														<span>@include('svg.account-plus')<span>Add User</span></span>
													</a>
												</li>
												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('UserController@index') }}">
														<span>@include('svg.account-edit')<span>Edit User</span></span>
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
											<h5>Project</h5>
											<ul>
												<li>
													{{-- THERE IS NO SWITCH, PLEASE DO NOT JUDGE ME --}}
													@if(Auth::user()->student->project_status == "none")
														<a class="btn w-100 text-left text-primary" title="Propose a project to a supervisor" href="{{ action('StudentController@proposeProjectView') }}">
															<span>@include('svg.pencil')<span>Propose Project</span></span>
														</a>
													@else
														<a class="btn w-100 text-left text-primary" title="See your selected project" href="{{ action('ProjectController@show', Auth::user()->student->project) }}">
															<span>@include('svg.creation')
																@if(Auth::user()->student->project_status == "proposed")
																	<span>Your Proposed Project</span>
																@elseif(Auth::user()->student->project_status == "selected")
																	<span>Your Selected Project</span>
																@elseif(Auth::user()->student->project_status == "accepted")
																	<span>Your Accepted Project</span>
																@endif
															</span>
														</a>
													@endif
												</li>
											</ul>
										</li>
										<li>
											<h5>Reports</h5>
											<ul class="list-unstyled">
												<li>
													<a class="btn w-100 text-left text-primary" title="Create a new project" href="{{ action('SupervisorController@report') }}">
														<span>@include('svg.clipboard')<span>Supervisor Report</span></span>
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</li>
						@endif

						@if(Auth::user()->isStaff())
							<li id="staff" class="dropdown wide links">
								<a href="#0" class="label">Staff</a>
								<div class="content">
									<h3>Staff</h3>
									<ul>
										<li>
											<ul>
												<h5>Second Marker</h5>
												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@manualSecondMarkerView') }}">
														<span>@include('svg.account-supervisor')<span>Manual Second Marker Assignment</span></span>
													</a>
												</li>
												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@swapSecondMarkerView') }}">
														<span>@include('svg.swap')<span>Swap Second Marker</span></span>
													</a>
												</li>
												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('ProjectAdminController@exportSecondMarkerDataView') }}">
														<span>@include('svg.database-export')<span>Export Second Marker Data</span></span>
													</a>
												</li>
											</ul>
										</li>
										<li>
											<ul>
												<h5>Projects</h5>
												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('StudentController@report') }}">
														<span>@include('svg.school')<span>Student Report</span></span>
													</a>
												</li>
												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('SupervisorController@report') }}">
														<span>@include('svg.clipboard')<span>Supervisor Report</span></span>
													</a>
												</li>
											</ul>
										</li>
										<li>
											<ul>
												<h5>Project Evaluations</h5>
												<li>
													<a class="btn w-100 text-left text-primary" href="{{ action('ProjectEvaluationController@amendCanvasUrlsView') }}">
														<span>@include('svg.canvas')<span>Amend Canvas URLs</span></span>
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</li>
						@endif

						@if(Auth::user()->isExternalMarker())
							<li id="external-marker" class="dropdown links">
								<a href="#0" class="label">Marker</a>
								<div class="content">
									<h3>External Marker</h3>
									<h6>Project Evaluation</h6>
									<ul>
										<li class="w-100">
											<a class="btn w-100 text-left text-primary" href="{{ action('ProjectEvaluationController@index') }}">
												<span>@include('svg.clipboard-check')<span>Project Evaluation Report</span></span>
											</a>
										</li>
										<li class="w-100">
											<a class="btn w-100 text-left text-primary" href="{{ action('ProjectEvaluationController@studentFeedback') }}">
												<span>@include('svg.bullhorn')<span>Project Evaluation Student Feedback</span></span>
											</a>
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
										<h5>Help</h5>
										<ul class="links-list">
											<li><a class="btn text-primary" href="{{ action('HomeController@help') }}" title="System Help">System Help</a><li>
											<li><a class="btn text-primary" href="{{ action('HomeController@about') }}" title="About this software">About</a><li>
										</ul>
									</li>

									<li>
										<div class="d-flex">
											<h5>External Links</h5>
											<span class="ml-2" style="height: 24px; width: 24px">@include('svg.external')</span>
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
