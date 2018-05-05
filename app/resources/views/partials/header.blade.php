<div class="flex flex--row" style="background: rgb(52, 61, 70); z-index: 9; position: relative;">
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
<div class="header-container">
	@include('partials.cookie-banner')

	@if(Auth::check())
	<header class="cd-morph-dropdown"  style="background: {{ get_config_json('header.background.value') }}">
		
		@if(Session::get('education_level') != null)
			<a href="{{ action('HomeController@index') }}" title="Home"><h1>{{ lang_sess('homepage_main_header') }}</h1></a>
		@else
			<a href="{{ action('HomeController@index') }}" title="Home"><h1>@lang('messages.homepage_main_header')</h1></a>
		@endif

		@if(Auth::check())
			<div class="mobile-menu-container" role="button" aria-label="Toggles the mobile navigation menu.">
				<ul class="mobile-menu">
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		@elseif(!empty(Session::get('department')) && Request::path() !== 'set-department')
			<div class="mobile-menu-container" style="max-width: 300px" role="button">
				<button class="button" style="margin-top: 5px; color: rgb(255, 255, 255);" data-activator="true" data-dialog="login">Login</button>
			</div>
		@endif

		<nav class="main-nav desktop">
			<ul>
				<li class="has-dropdown links" data-content="browse">
					<a href="#0">Browse</a>
				</li>

				<li class="has-dropdown links" data-content="supervisor">
					<a href="#0">Supervisor</a>
				</li>

				<li class="has-dropdown links" data-content="admin">
					<a href="#0">Admin</a>
				</li>

				<li class="has-dropdown links" data-content="student">
					<a href="#0">Student</a>
				</li>

				<li class="has-dropdown links" data-content="help">
					<a href="#0">Help</a>
				</li>

				<li class="ml-auto button">
					<button title="Log out" onclick="$('#logout-form').submit();">Logout</button>
				</li>
			</ul>
		</nav>
		<div class="morph-dropdown-wrapper">
			<div class="dropdown-list">
				<ul>
					<li id="browse" class="dropdown links">
						<a href="#0" class="label">Browse</a>
						<div class="content">
							<h3>Browse</h3>
							<ul>
								<li><a href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">Projects</a></li>
								<li><a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">Projects by Supervisor</a></li>
								<li><a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topics</a></li>
							</ul>
						</div>
					</li>

					<li id="supervisor" class="dropdown links">
						<a href="#0" class="label">Supervisor</a>
						<div class="content">
							<ul>
								<li>
									<h3>Projects</h3>
									<ul class="icon-list links-list">
										<li>
											<a class="icon" title="Show my projects" href="{{ action('UserController@projects', Auth::user()) }}">
												@include('svg.file')
												<p>My Projects</p>
											</a>
										</li>
										<li>
											<a class="icon" title="Create a new project" href="{{ action('ProjectController@create') }}">
												@include('svg.account-multiple-plus')
												<p>New Project</p>
											</a>
										</li>
									</ul>
								</li>

								<li>
									<h3>Reports</h3>
									<ul class="icon-list links-list">
										<li>
											<a class="icon" title="Show my projects" href="{{ action('SupervisorController@projectReport') }}">
												@include('svg.file')
												<p>Project Report</p>
											</a>
										</li>
										<li>
											<a class="icon" title="Create a new project" href="{{ action('SupervisorController@report') }}">
												@include('svg.account-multiple-plus')
												<p>Supervisor Report</p>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</li>

					<li id="admin" class="dropdown links">
						<a href="#0" class="label">Administrator</a>
						<div class="content">
							<ul>
								@if(Auth::user()->isProjectAdmin())
									<li>
										<a href="/admin" title="Administrator Options">Administrator</a>
										@include('svg.arrow-down')

										<div class="dropdown-content shadow-2dp">
											<a href="/admin">Admin Hub</a>
											@include('partials.header.admin-sub-dropdown', ['title' => 'Users', 'links' => 'user'])
											@include('partials.header.admin-sub-dropdown', ['title' => 'Reports', 'links' => 'report'])
											@include('partials.header.admin-sub-dropdown', ['title' => 'Transactions', 'links' => 'transaction'])
											@include('partials.header.admin-sub-dropdown', ['title' => 'Settings', 'links' => 'settings'])
										</div>
									</li>
								@endif

								@if(Auth::user()->isSystemAdmin())
									<li>
										<a href="/admin/dashboard" title="Administrator Options">System Administrator</a>
										<div>
											<a href="{{ action('AdminController@dashboard') }}">System Dashboard</a>
											<a href="{{ action('AdminController@userAgentView') }}">User Agent Strings</a>
											<a href="{{ action('AdminController@feedback') }}">User Feedback</a>
											
											<button class="sub-dropbtn">Users</button>
											<ul class="icon-list">
												<li>
													<a class="icon" href="/users/create">
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
										</div>
									</li>
								@endif

							</ul>
						</div>
					</li>

					<li id="student" class="dropdown links">
						<a href="#0" class="label">Student</a>
						<div class="content">
							<h3>Student</h3>
							<ul>
								<li><a href="{{ action('ProjectController@index') }}" title="Browse all on-offer projects">Projects</a></li>
								<li><a href="{{ action('ProjectController@showSupervisors') }}" title="Browse projects sorted by supervisor">Projects by Supervisor</a></li>
								<li><a href="{{ action('ProjectController@showTopics') }}" title="Browse projects sorted by topic">Projects by Topics</a></li>
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
									<h4>External Links</h4>
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

		<div class="logo-container">
			<a href="https://www.sussex.ac.uk" class="logo" style="background-image: url('{{ get_config_json("header.logo_url.value") }}')"></a>
		</div>
	</header>
	@else
		@if(!empty(Session::get('department')) && Request::path() !== 'set-department')
			<li class="nav-button" style="margin-left: auto;">
				<button data-activator="true" data-dialog="login">Login</button>
			</li>
		@endif
	@endif
</div>

@if(Auth::check())
	@include('partials.header.navigation', ['platform' => 'mobile'])
@endif
